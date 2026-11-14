import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createSpring, stepSpring, clamp, MAX_FRAME, SPRINGS } from "../owl/springs";
import "./owl.css";

const PUPIL_TRAVEL = 8;
const TILT_MAX = 7;

/**
 * The mascot. A hand-authored, rigged SVG rather than a Lottie file: every
 * state in the brief is *procedural* (pupils track a moving cursor, the head
 * tilts toward whatever is focused), and Lottie keyframes cannot express a
 * target that changes 60 times a second. Fixed authored flourishes could be
 * Lottie later; those are the only parts Lottie is good at.
 *
 * Performance contract:
 * - one rAF loop that tears itself down the moment every spring is at rest, so
 *   an idle page costs zero main-thread work;
 * - transform-only writes (`style.transform`), which never trigger layout;
 * - the bounding box is cached and re-measured only on resize or after the dock
 *   transition — no `getBoundingClientRect()` in a per-frame path;
 * - pointer work is one passive listener writing a target, nothing more.
 *
 * aria-hidden: every state it conveys is also stated in text (focused field,
 * success message, errors), so nothing depends on seeing the mascot.
 */
export default function Owl({ mode = "idle", focusPoint = null, coverEyes = false }) {
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const wingLeftRef = useRef(null);
  const wingRightRef = useRef(null);

  const springs = useRef(null);
  if (springs.current === null) {
    springs.current = {
      lookX: createSpring(0),
      lookY: createSpring(0),
      tilt: createSpring(0),
      cover: createSpring(0, SPRINGS.snappy),
      point: createSpring(0, SPRINGS.snappy),
    };
  }

  const centerRef = useRef(null);
  const reducedRef = useRef(false);
  const focusSideRef = useRef(1);
  /** Bumped by any input; keeps the loop alive while motion is in flight. */
  const [animating, setAnimating] = useState(false);

  const apply = useCallback(() => {
    const s = springs.current;

    if (tiltRef.current) {
      tiltRef.current.style.transform = `rotate(${s.tilt.value.toFixed(2)}deg)`;
    }

    const pupil = `translate(${(s.lookX.value * PUPIL_TRAVEL).toFixed(2)}px, ${(
      s.lookY.value * PUPIL_TRAVEL
    ).toFixed(2)}px)`;
    if (pupilLeftRef.current) pupilLeftRef.current.style.transform = pupil;
    if (pupilRightRef.current) pupilRightRef.current.style.transform = pupil;

    // Wings do double duty: a full rotation covers the eyes (peekaboo), a
    // partial lift on one side points at the focused field.
    const cover = s.cover.value;
    const point = s.point.value;
    const side = focusSideRef.current;
    const dx = cover * 12;
    const dy = cover * 7;
    const left = -(cover * 68 + (side < 0 ? point * 26 : 0));
    const right = cover * 68 + (side > 0 ? point * 26 : 0);

    if (wingLeftRef.current) {
      wingLeftRef.current.style.transform =
        `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${left.toFixed(2)}deg)`;
    }
    if (wingRightRef.current) {
      wingRightRef.current.style.transform =
        `translate(${(-dx).toFixed(2)}px, ${dy.toFixed(2)}px) rotate(${right.toFixed(2)}deg)`;
    }
  }, []);

  const settle = useCallback(() => {
    const s = springs.current;
    for (const key of Object.keys(s)) {
      s[key].value = s[key].target;
      s[key].velocity = 0;
    }
    apply();
  }, [apply]);

  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      w: rect.width,
      h: rect.height,
    };
  }, []);

  // Geometry changes only on first paint, resize, and the end of the dock
  // transition. Never measured per frame.
  useLayoutEffect(() => {
    measure();

    const el = rootRef.current;
    const observer = new ResizeObserver(measure);
    if (el) observer.observe(el);
    window.addEventListener("resize", measure, { passive: true });
    const onTransitionEnd = (event) => {
      if (event.propertyName === "transform") measure();
    };
    el?.addEventListener("transitionend", onTransitionEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      el?.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [measure]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = query.matches;
    const onChange = (event) => {
      reducedRef.current = event.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // The single animation loop. Exits as soon as nothing is moving, so a static
  // page runs no per-frame JS at all.
  useEffect(() => {
    if (!animating) return undefined;

    let raf = 0;
    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, MAX_FRAME);
      last = now;

      const s = springs.current;
      let moving = false;
      for (const key of Object.keys(s)) {
        if (stepSpring(s[key], dt)) moving = true;
      }
      apply();

      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        setAnimating(false);
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [animating, apply]);

  // Cursor tracking. Coarse pointers (touch) get no tracking at all: there is
  // no cursor to track, and the brief's mobile target would only burn battery.
  useEffect(() => {
    if (mode !== "idle") return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const onMove = (event) => {
      const c = centerRef.current;
      if (!c || reducedRef.current) return;
      const s = springs.current;
      s.lookX.target = clamp(((event.clientX - c.x) / (c.w * 0.75)) * 1.1, -1, 1);
      s.lookY.target = clamp(((event.clientY - c.y) / (c.h * 0.75)) * 1.1, -1, 1);
      s.tilt.target = s.lookX.target * TILT_MAX;
      // No-op re-render guard: React bails out when already true.
      setAnimating(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  // Map UI state → spring targets.
  useEffect(() => {
    const s = springs.current;

    if (mode === "docked") {
      s.lookX.target = 0;
      s.lookY.target = 0;
      s.tilt.target = 0;
      s.cover.target = 0;
      s.point.target = 0;
    } else if (mode === "focus" && focusPoint) {
      const c = centerRef.current;
      if (c) {
        const dx = focusPoint.x - c.x;
        s.lookX.target = clamp(dx / 320, -1, 1);
        s.lookY.target = clamp((focusPoint.y - c.y) / 240, -1, 1);
        s.tilt.target = clamp(dx / 320, -1, 1) * TILT_MAX;
        focusSideRef.current = dx >= 0 ? 1 : -1;
      }
      s.cover.target = coverEyes ? 1 : 0;
      s.point.target = coverEyes ? 0 : 1;
    } else if (mode === "success") {
      s.lookX.target = 0;
      s.lookY.target = 0;
      s.tilt.target = -3;
      s.cover.target = 0;
      s.point.target = 0.6;
    } else {
      s.cover.target = 0;
      s.point.target = 0;
    }

    if (reducedRef.current) {
      settle();
    } else {
      setAnimating(true);
    }
  }, [mode, focusPoint, coverEyes, settle]);

  return (
    <div
      ref={rootRef}
      className={`owl${mode === "success" ? " owl--success" : ""}`}
      aria-hidden="true"
    >
      <div className="owl-spin">
        <svg viewBox="0 0 220 240" className="owl-svg" focusable="false">
          <g ref={tiltRef} className="owl-tilt">
            {/* ear tufts */}
            <path d="M62 44 L72 6 L92 38 Z" fill="var(--slate)" />
            <path d="M158 44 L148 6 L128 38 Z" fill="var(--slate)" />

            {/* body */}
            <path
              d="M110 26 C160 26 190 70 190 122 C190 180 156 214 110 214 C64 214 30 180 30 122 C30 70 60 26 110 26 Z"
              fill="var(--slate)"
            />

            {/* belly */}
            <ellipse cx="110" cy="163" rx="46" ry="43" fill="var(--pearl)" />

            {/* feet */}
            <ellipse cx="90" cy="214" rx="13" ry="8" fill="var(--tangerine)" />
            <ellipse cx="130" cy="214" rx="13" ry="8" fill="var(--tangerine)" />

            {/* wings — rigged, rotate about the shoulder */}
            <g ref={wingLeftRef} className="owl-wing">
              <path
                d="M48 106 C22 128 24 176 48 190 C62 172 62 126 48 106 Z"
                fill="var(--slate)"
                stroke="var(--pearl)"
                strokeWidth="2"
              />
            </g>
            <g ref={wingRightRef} className="owl-wing">
              <path
                d="M172 106 C198 128 196 176 172 190 C158 172 158 126 172 106 Z"
                fill="var(--slate)"
                stroke="var(--pearl)"
                strokeWidth="2"
              />
            </g>

            {/* eyes */}
            <g transform="translate(78 108)">
              <circle r="28" fill="var(--pearl)" />
              <g ref={pupilLeftRef} className="owl-pupil">
                <circle r="13" fill="var(--slate)" />
                <circle cx="-4.5" cy="-4.5" r="4.2" fill="var(--pearl)" />
              </g>
              <g className="owl-lid">
                <circle r="28" fill="var(--pearl)" />
                <path
                  d="M-17 4 Q0 13 17 4"
                  fill="none"
                  stroke="var(--slate)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
            </g>
            <g transform="translate(142 108)">
              <circle r="28" fill="var(--pearl)" />
              <g ref={pupilRightRef} className="owl-pupil">
                <circle r="13" fill="var(--slate)" />
                <circle cx="-4.5" cy="-4.5" r="4.2" fill="var(--pearl)" />
              </g>
              <g className="owl-lid">
                <circle r="28" fill="var(--pearl)" />
                <path
                  d="M-17 4 Q0 13 17 4"
                  fill="none"
                  stroke="var(--slate)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* beak */}
            <path d="M96 142 L124 142 L110 168 Z" fill="var(--tangerine)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
