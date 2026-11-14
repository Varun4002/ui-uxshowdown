# Colour palette

The "Little Wonder" storybook palette — nine hues, measured, with fixed roles.
Hex is the source of truth; names are internal identifiers only.

| Token | Hex | Name | Role |
|---|---|---|---|
| `--cream` | `#FFF5E6` | Cream | **Page base** — never pure white anywhere |
| `--peach` | `#FFD6B8` | Peach | Illustration (school walls, path), surfaces |
| `--butter` | `#FFE89A` | Butter | Highlights, bus, Benny's bag, labels on Ink |
| `--sage` | `#B9D7B0` | Sage | Ground/trees, program cards, Tilly |
| `--sky` | `#B8DDF5` | Sky | Scene sky, windows, feed band, Pip's bag |
| `--coral` | `#F49A83` | Coral | CTA fill, roof, cheeks — **fill only, 1.99:1 as text on cream** |
| `--lavender` | `#D9C9F2` | Lavender | Pillar cards, Tilly's bag, butterflies |
| `--cocoa` | `#49382F` | Cocoa | Text everywhere, dark bands, outlines, Benny/Pip bodies |
| `--brown` | `#806F64` | Brown | Secondary text **on white plates only**; tree trunks, Benny |

## Measured contrast (WCAG 2.1)

Rows are text, columns are background. `*` passes AA body text (≥4.5), `~` is
large-text only (≥3.0), `x` fails.

| text ↓ / bg → | cream | peach | butter | sage | sky | coral | lavender | cocoa | white |
|---|---|---|---|---|---|---|---|---|---|
| **cocoa** | **10.29\*** | **8.23\*** | **9.13\*** | **7.10\*** | **7.78\*** | **5.18\*** | **7.19\*** | — | **11.11\*** |
| **brown** | 4.45~ | 3.56~ | 3.94~ | 3.06~ | 3.36~ | 2.24x | 3.11~ | 2.32x | **4.80\*** |
| **cream** | — | 1.25x | 1.13x | 1.45x | 1.32x | 1.99x | 1.43x | **10.29\*** | 1.08x |
| **butter** | 1.13x | 1.11x | — | 1.29x | 1.17x | 1.76x | 1.27x | **9.13\*** | 1.22x |
| **coral** | 1.99x | 1.59x | 1.76x | 1.37x | 1.50x | — | 1.39x | **5.18\*** | 2.14x |

## Rules that follow from the numbers

1. **Cocoa text works on every pastel** — that is why all body copy is cocoa.
2. **Brown is never body text on cream** (4.45:1). It is secondary text on white
   plates (4.80:1) — form labels, card notes — and large text on cream.
3. **Coral is a fill, never text on light backgrounds** (1.99:1). Coral fill
   takes cocoa text (5.18:1). CTA primary is cocoa fill + cream label (10.29:1);
   coral is the playful secondary.
4. **Dark bands are cocoa**, with cream (10.29:1) or butter (9.13:1) text.
5. **State is never colour alone** — underlines, borders, and weight changes
   accompany every colour change.
6. **Focus ring** is 2px cocoa on light surfaces; cream/butter on dark.

## Surfaces and bands

White is gone as a base; cream is the canvas, and colour enters through bounded
bands so the page has rhythm:

| Surface | Where |
|---|---|
| Cream | hero, welcome, programs, enrol |
| Butter / Sage / Sky / Lavender | pillar and program cards |
| Sky | "From the feed" band |
| Cocoa | marquee, contact band, footer |

Scope classes (`.band--sky`, `.contact`) re-point text roles per surface —
components never hard-code a colour for contrast reasons.

## Typography

| Family | Weights | Used for |
|---|---|---|
| **Fredoka** | 300–700 | All headings, display type (storybook-rounded, no thin weights) |
| **Nunito Sans** | 400–800 | Body text |
| **Nunito** | 400–800 | Buttons, labels, eyebrows, nav |
| **Baloo 2** | 400–800 | **Devanagari only** — Fredoka has no Devanagari subset |

Hierarchy: hero 44–76px, section 34–48px, card 22–28px, body 16–18px, labels
13–14px. Everything is a clamp in `tokens.css`; never hand-roll a `font-size`.

## Spacing

8px base stepped through Fibonacci — 8 / 13 / 21 / 34 / 55 / 89 / 144 — which
sits near the golden ratio without forcing it into every component. Radii:
20–32px for surfaces, larger organic radii for illustration frames.

## Character palette

The five friends reuse UI hues so illustrations and interface never clash:
Benny brown + butter bag, Mimi cream + coral bag, Oliver coral + sage bag, Pip
cocoa + sky bag, Tilly sage shell + lavender bag. Shading uses alpha tints of
palette hues only.
