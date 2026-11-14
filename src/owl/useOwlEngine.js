// Owl motion engine — continuous, input-driven motion only.
//
// The critique this is built to survive: binding React state to onScroll /
// onMouseMove causes a render per event, and reading layout inside the handler
// forces synchronous style+layout. On a low-end phone that is jank and battery
// drain. None of it happens here:
//
//   * Pointer events only assign to a mutable ref. They never render.
//   * One rAF loop integrates the springs and writes to one element.
//   * The loop performs no layout reads. The only DOM read per frame is
//     window.scrollY, which does not flush style or layout.
//   * Only `transform` and custom properties that feed `transform` are written,
//     so frames stay on the compositor path.
//   * The loop stops as soon as every spring is at rest. An idle page runs no
//     animation work at all and costs no battery.
//   * Pointer tracking is skipped entirely on touch-only devices, so the
//     "parent on an old phone" case never executes this code.
//
// Discrete state changes (peekaboo, pointer wing, celebration) are NOT handled
// here — they are React state plus CSS transitions on the compositor, because
// they change a handful of times per session rather than 120 times per second.

import { useEffect, useRef } from 'react'
import {
  createSpring,
  stepSpring,
  clamp,
  SPRINGS,
  MAX_FRAME,
} from './springs.js'

/** Maximum pupil travel, in viewBox units, from the centre of the eye. */
const PUPIL_RANGE = 5.5
/** Maximum head tilt, in degrees. */
const HEAD_RANGE = 6
/** Gap in px at which the owl hands over from the hero anchor to the nav slot. */
const DOCK_GAP = 4
/** Pointer distance at which the pupils reach full deflection. */
const POINTER_FALLOFF = 380

export function useOwlEngine({ rootRef, anchorRef, dockRef, paused }) {
  const rig = useRef(null)

  if (rig.current === null) {
    rig.current = {
      x: createSpring(0, SPRINGS.dock),
      y: createSpring(0, SPRINGS.dock),
      scale: createSpring(1, SPRINGS.dock),
      pupilX: createSpring(0, SPRINGS.soft),
      pupilY: createSpring(0, SPRINGS.soft),
      head: createSpring(0, SPRINGS.soft),
      pointerX: 0,
      pointerY: 0,
      hasPointer: false,
      width: 240,
      height: 260,
      /** Scale that makes the owl exactly fill the hero slot. */
      heroScale: 1,
      /** Scale that makes the owl exactly fill the nav slot. */
      dockScale: 0.21,
      heroDocX: 0,
      heroDocY: 0,
      dockX: 0,
      dockY: 0,
      raf: 0,
      last: 0,
      still: false,
      /** True when the owl has no hero slot (narrow viewport) and lives in the nav. */
      pinned: false,
      /** Snap springs to their targets on the next frame instead of easing. */
      snap: true,
    }
  }

  // `paused` is read inside the frame loop, so it lives in a ref rather than in
  // the loop's dependency list — otherwise every toggle would tear the loop
  // down and rebuild it. It is synchronised in an effect, never during render.
  const pausedRef = useRef(paused)
  // Lets the paused effect wake the loop after the main effect has set it up.
  const wakeRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const anchor = anchorRef.current
    const dock = dockRef.current
    if (!root || !anchor || !dock) return undefined

    const r = rig.current
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const applyStill = () => {
      r.still = motionQuery.matches || pausedRef.current
      if (r.still) {
        // Under reduce / pause the owl renders in its resting pose, immediately.
        r.x.value = r.x.target
        r.y.value = r.y.target
        r.scale.value = r.scale.target
        r.pupilX.value = r.pupilX.target = 0
        r.pupilY.value = r.pupilY.target = 0
        r.head.value = r.head.target = 0
      }
    }

    const write = () => {
      const x = r.x.value
      const y = r.y.value
      const s = r.scale.value
      // Position via top-left so that the scale stays centred on (x, y).
      root.style.transform = `translate3d(${x - (r.width * s) / 2}px, ${
        y - (r.height * s) / 2
      }px, 0) scale(${s})`
      root.style.setProperty('--owl-pupil-x', `${r.pupilX.value}px`)
      root.style.setProperty('--owl-pupil-y', `${r.pupilY.value}px`)
      root.style.setProperty('--owl-head-rot', `${r.head.value}deg`)
    }

    const frame = (now) => {
      const dt = r.last === 0 ? 1 / 60 : Math.min((now - r.last) / 1000, MAX_FRAME)
      r.last = now

      const heroY = r.heroDocY - window.scrollY
      // `pinned` is sticky, not scroll-dependent: on a narrow viewport there is
      // no hero slot at all, so the owl belongs in the nav at every scroll
      // position. Deriving that from scroll offsets would only hold at the one
      // offset that happened to be active when we measured.
      const docked = r.pinned || heroY <= r.dockY + DOCK_GAP
      const targetX = docked ? r.dockX : r.heroDocX
      const targetY = docked ? r.dockY : heroY
      // Both scales are measured from their slot rather than hardcoded, so the
      // rig fills the hero slot at every breakpoint (page.css shrinks it to
      // 10.5rem on mobile) and matches the nav dock exactly.
      const targetScale = docked ? r.dockScale : r.heroScale

      let pupilTargetX = 0
      let pupilTargetY = 0
      let headTarget = 0

      if (r.hasPointer) {
        const dx = r.pointerX - targetX
        const dy = r.pointerY - targetY
        const dist = Math.hypot(dx, dy)
        if (dist > 1) {
          // Pupils deflect by direction, scaled by distance: a pointer resting
          // on the owl keeps the gaze centred instead of staring cross-eyed.
          const pull = clamp(dist / POINTER_FALLOFF, 0, 1)
          pupilTargetX = (dx / dist) * PUPIL_RANGE * pull
          pupilTargetY = (dy / dist) * PUPIL_RANGE * pull * 0.8
          headTarget = clamp(
            (dx / POINTER_FALLOFF) * HEAD_RANGE,
            -HEAD_RANGE,
            HEAD_RANGE,
          )
        }
      }

      r.x.target = targetX
      r.y.target = targetY
      r.scale.target = targetScale
      r.pupilX.target = pupilTargetX
      r.pupilY.target = pupilTargetY
      r.head.target = headTarget

      let moving = false
      if (r.still || r.snap) {
        // First paint, resize, reduced motion or pause: land on the target
        // instead of easing there, so the owl never flies in from the corner.
        r.x.value = targetX
        r.y.value = targetY
        r.scale.value = targetScale
        r.pupilX.value = pupilTargetX
        r.pupilY.value = pupilTargetY
        r.head.value = headTarget
        r.snap = false
      } else {
        // Call all six unconditionally — `stepSpring(a) || stepSpring(b)`
        // would short-circuit and leave later springs unstepped.
        const mx = stepSpring(r.x, dt)
        const my = stepSpring(r.y, dt)
        const ms = stepSpring(r.scale, dt)
        const mpx = stepSpring(r.pupilX, dt)
        const mpy = stepSpring(r.pupilY, dt)
        const mh = stepSpring(r.head, dt)
        moving = mx || my || ms || mpx || mpy || mh
      }

      write()
      r.raf = moving ? requestAnimationFrame(frame) : 0
      if (!moving) r.last = 0
    }

    const wake = () => {
      if (r.raf === 0) {
        r.last = 0
        r.raf = requestAnimationFrame(frame)
      }
    }

    wakeRef.current = () => {
      applyStill()
      wake()
    }

    const measure = () => {
      const a = anchor.getBoundingClientRect()
      const d = dock.getBoundingClientRect()
      r.dockX = d.left + d.width / 2
      r.dockY = d.top + d.height / 2

      if (a.width === 0) {
        // Narrow viewports hide the hero slot (`display: none`), so there is
        // nowhere to fly from. Pin the owl to the nav instead of letting it
        // collapse onto the top-left corner.
        r.pinned = true
        r.heroDocX = r.dockX
        r.heroDocY = r.dockY
      } else {
        r.pinned = false
        r.heroDocX = a.left + a.width / 2
        r.heroDocY = a.top + a.height / 2 + window.scrollY
      }

      // The SVG has no offsetWidth, and its bounding rect is polluted by the
      // transform we are writing. The computed `width`/`height` are layout
      // values, unaffected by `transform`, so they are exact and cost one
      // style resolution on a path that only runs on mount and resize.
      const computed = getComputedStyle(root)
      r.width = Number.parseFloat(computed.width) || r.width
      r.height = Number.parseFloat(computed.height) || r.height

      // Scale the rig to fill each slot exactly, at whatever size CSS gives it.
      r.heroScale = a.width > 0 ? a.width / r.width : 1
      r.dockScale = d.width > 0 ? d.width / r.width : r.dockScale

      r.snap = true
      wake()
    }

    const onPointerMove = (event) => {
      // Gate on the event's own pointer type rather than on a media query.
      // A laptop with a touchscreen reports `pointer: fine`, so a media query
      // would still track finger drags there; `pointerType` cannot lie. Touch
      // devices therefore never run the tracking path at all, which is the
      // "parent's low-end phone" case the whole design is built to protect.
      if (event.pointerType === 'touch') return
      r.pointerX = event.clientX
      r.pointerY = event.clientY
      r.hasPointer = true
      wake()
    }

    const onScroll = () => wake()

    const onMotionChange = () => {
      applyStill()
      wake()
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(anchor)
    resizeObserver.observe(dock)
    resizeObserver.observe(document.documentElement)

    applyStill()
    measure()

    // Passive: this listener never reads layout and never blocks scrolling.
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      motionQuery.removeEventListener('change', onMotionChange)
      resizeObserver.disconnect()
      if (r.raf) cancelAnimationFrame(r.raf)
      r.raf = 0
      r.last = 0
      wakeRef.current = null
    }
  }, [rootRef, anchorRef, dockRef])

  // Pausing re-evaluates through the existing loop rather than restarting it.
  useEffect(() => {
    pausedRef.current = paused
    wakeRef.current?.()
  }, [paused])
}
