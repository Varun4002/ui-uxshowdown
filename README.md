# Gyanhouz Learning Hub — UI/UX demo

Single-page site for **Gyanhouz Learning Hub**, a preschool in Wakad,
Pimpri-Chinchwad — a storybook-styled UI/UX build. The identity is a cast of
five hand-built SVG characters (Benny the Bear, Mimi the Bunny, Oliver the Fox,
Pip the Penguin, Tilly the Turtle) who share one skeleton, plus an illustrated
hero scene of them walking to school.

## Stack

- React 19 + Vite 8 (JavaScript, no TypeScript)
- oxlint for linting; no test runner
- Motion: CSS scroll-driven reveals and scene animation (clouds, trees,
  butterflies, bus) — transform-only, gated on `prefers-reduced-motion`. The
  retired owl's spring engine (`src/owl/`) is on disk and slated for phase 2.
- Fonts self-hosted from Google Fonts (OFL) in `public/fonts/`

## Develop

```sh
npm install
npm run dev      # check the port — 5173/5174 are often taken on this machine
npm run lint
npm run build
```

## Design contract

| File | Contents |
|---|---|
| [`ui.md`](./ui.md) | Typography (Fredoka / Nunito Sans / Nunito), type scale, spacing, motion rules |
| [`colour_pallete.md`](./colour_pallete.md) | The nine storybook hues, measured contrast, role rules |
| [`metadata_preschool.md`](./metadata_preschool.md) | School facts, and what is still unknown |
| [`AGENTS.md`](./AGENTS.md) | Working notes for AI agents in this repo |

## Content status

Verified and on the site: name, category, 4.7/60 rating, address, plus code,
"opens 9:00 am Monday", phone **+91 92720 99011**, and the Instagram profile
(@gyanhouz — bio, 2,116 followers, 139 posts, three recurring series).

Program names come from the design brief; their **age ranges are not published
yet** and are marked "to be confirmed". Fees, weekly hours, teacher names and
testimonials do not exist in any verified source and are therefore absent —
never invented. The enquiry form is front-end only: it posts nowhere and stores
nothing.
