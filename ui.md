# UI contract

Single reference for typography, spacing, motion and component behaviour.
**Colour is defined in [`colour_pallete.md`](./colour_pallete.md)** — this file
does not redefine it.

## Typography — four families, fixed roles

```css
--font-display: "Fredoka", ui-rounded, system-ui, sans-serif;      /* headings */
--font-body: "Nunito Sans", system-ui, sans-serif;                  /* body */
--font-ui: "Nunito", system-ui, sans-serif;                         /* chrome */
--font-devanagari: "Baloo 2", system-ui, sans-serif;                /* Hindi only */
```

Fredoka carries every heading (storybook-rounded, weights 300–700 — no thin
weights). Nunito Sans is body. Nunito is buttons, labels, eyebrows, nav. Baloo 2
exists only because Fredoka has no Devanagari subset — `[lang="hi"]` must
resolve to it.

Hierarchy (all clamps in `tokens.css`, never hand-rolled):

| Token | Range | Use |
|---|---|---|
| `--step-hero` | 44 → 76px | hero heading |
| `--step-section` | 34 → 48px | section headings |
| `--step-card` | 22 → 28px | card headings |
| `--step-0` | 16 → 18px | body |
| `--step--1` | 13 → 14px | labels, buttons, captions |

Line height 1.65 body / 1.06 headings; `text-wrap: balance` on headings.

## Spacing and shape

8px base stepped through Fibonacci: 8 / 13 / 21 / 34 / 55 / 89 / 144
(`--s-1`…`--s-7`) — neighbouring ratios sit near 1.618, used where composition
benefits, never forced. Content width 1180–1280px (`--shell-max: 78.75rem`).
Hero split ≈ 62:38 with the illustration near 45%. Section spacing
`--section-y` = 32–48px mobile, 72–112px desktop. Radii 20–32px for surfaces,
organic compound radii for illustration frames.

## Motion

Two tiers, chosen by how often the target changes:

- **Continuous / input-driven** (pupils, head tilt, dock) — damped springs, one
  rAF loop, transform-only writes. Presets in `src/owl/springs.js`:
  `soft` (170 / 26 / 1) for tracking, `snappy` (420 / 30 / 0.7) for UI response.
- **Discrete / authored** (hover, focus, confetti, spin) — CSS transitions and
  keyframes on the compositor. `--ease-out: cubic-bezier(.16,1,.3,1)`,
  `--dur-fast: 160ms`, `--dur-dock: 520ms`.

Hard performance rules:

1. Animate **`transform` and `opacity` only**. Never `width`, `height`, `top`,
   `left`, `box-shadow`, or `filter` in a loop.
2. Never animate SVG by recalculating paths. Rig discrete parts (pupils, wings,
   lids) and move them with `transform`.
3. No `scroll` listener for animation. Use `IntersectionObserver`, or native
   scroll-driven CSS (`animation-timeline: view()`, guarded by
   `@supports ((animation-timeline: view()) and (animation-range: entry))`) —
   decorative only, no JS fallback.
4. No `getBoundingClientRect()` in a per-frame path. Measure on mount, resize,
   and focus; cache.
5. The rAF loop must stop when every spring is at rest. Idle page = zero
   per-frame JS.
6. Skip cursor tracking on coarse pointers (`pointer: coarse`) — there is no
   cursor on touch.
7. All spatial motion is gated on `prefers-reduced-motion: no-preference`.
   Under `reduce`: no springs, no spin, no confetti, no tracking; elements
   render in their final state. Colour transitions stay enabled.

## Interaction and accessibility

- Focus ring: 2px Ink, 3px offset, `:focus-visible` only.
- Any moving content >5s needs a visible pause control (WCAG 2.2.2). The nav
  carries a motion toggle.
- Nothing flashes more than 3×/second, with or without reduced motion.
- The mascot is `aria-hidden` — every state it shows is also stated in text.
- Form feedback is tied to the field via label/`aria-describedby`, not by
  colour alone.

## Surfaces and bands

White is the canvas. Colour enters through bounded bands, so the page has rhythm
without being washed by any single hue:

| Surface | Where | Scope class |
|---|---|---|
| White | hero, offer, enrol, cards | — |
| Blush | `From the feed` band, hero disc behind the owl | `.band--tint` + `.on-blush` |
| Ink | marquee, contact band, footer | `.on-slate` |

The scope classes re-point the semantic tokens (`--text-muted`, `--line`,
`--ring-color`) rather than restyling every child, so a component dropped into a
band inverts correctly by itself. Muted text is Slate on white and Pine on Blush;
that mapping is enforced by the scopes, not by memory.

## Components

- **Buttons:** `.btn` = Pine fill + white label. `.btn--quiet` = transparent with
  mauve border + Ink label. One primary action per view.
- **Cards:** white surface, 1px mauve border at low alpha, `--r-lg`,
  `--shadow-lift`. Unpublished data is marked (dashed border + muted body), never
  filled with invented copy.
- **Inputs:** white, 2px mauve border, Pine border on focus-visible. Labels
  always visible — no placeholder-as-label.
