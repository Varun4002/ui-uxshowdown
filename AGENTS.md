# AGENTS.md — uiux_example

Preschool site for **Gyanhouz Learning Hub** (real business: Wakad,
Pimpri-Chinchwad). "Little Wonder" is the creative theme, not the school's name
— the brand decision was made explicitly: keep Gyanhouz and its real contact
details, never publish a fictional name with real phone numbers.

Global rules in `~/AGENTS.md`, `~/USER.md`, `~/WORKFLOW.md` apply; this file is
repo-specific.

## Read before touching UI

| File | Authority |
|---|---|
| `colour_pallete.md` | The nine storybook hues, measured contrast, role rules |
| `ui.md` | Typography, spacing, motion, components |
| `metadata_preschool.md` | Verified school facts, and what is still unknown |

**Non-negotiables**

- Nine colours, four fonts, fixed roles. No tenth hue, no fifth family.
- **Never invent school data.** Phone (+91 92720 99011) and Instagram
  (@gyanhouz) are confirmed; fees, age ranges, weekly hours, teacher names,
  testimonials and accreditations are not — render them "to be confirmed" or
  omit them. The day-schedule timeline (next phase) is demo content until real
  timings arrive.
- Cream is the page base. Pure white appears only inside card plates and the
  footer logo chip.
- Coral is a fill colour; as text on cream it fails contrast (1.99:1).
- Brown is secondary text on white plates only (4.80:1), never body text on
  cream (4.45:1).

## Commands

```sh
npm install
npm run dev      # port varies; 5173/5174 are often taken on this machine
npm run lint     # oxlint
npm run build    # -> dist/
npm run preview
```

There is **no test runner**. Linting is **oxlint**, not ESLint.

## Verifying UI work

Build + lint say nothing about looks. Chrome is installed — screenshot and look:

```sh
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1440,1200 --virtual-time-budget=5000 \
  --screenshot=/tmp/shot.png http://localhost:PORT/
```

For interaction states and console errors, drive CDP (Node 22 has global
`fetch` + `WebSocket`; no puppeteer needed) — scripts live in `/tmp/opencode/`.
Check 1440 **and** 390 px, plus `prefers-reduced-motion`.

⚠️ This Vite dev server has repeatedly served **stale modules after file
writes** — verify what is actually served (`curl localhost:PORT/src/...`) before
debugging a "fix that didn't work", and restart (`rm -rf node_modules/.vite`)
when in doubt.

## Architecture

```
src/
  characters/Characters.jsx   five friends from ONE shared skeleton
  characters/cast.js          character metadata (kept out of the component file
                              for fast-refresh; carries Component refs)
  components/HeroScene.jsx    illustrated school scene (SVG, animated groups)
  components/                 Nav, Hero, Welcome, Programs, Community, Enrol,
                              Contact, Footer, Marquee, Confetti
  data/school.js              every verified fact + client-provided copy
  styles/                     tokens.css, base.css, page.css, fonts.css (generated)
  hooks/useReducedMotion.js
```

- **Characters are the identity.** All five build from one skeleton in
  `Characters.jsx` (same head/body ratio, face placement, outline). New
  characters and poses extend that skeleton — never freehand a new SVG.
- **Colours come only from `tokens.css`.** Illustration shading uses alpha
  tints of palette hues.
- **Retired, still on disk:** the owl system (`components/Owl.jsx`,
  `owl/*`, `components/owl.css`, dead `EnrollmentForm.jsx`, `Visit.jsx`,
  `Highlights.jsx`, `index.css`, `App.css`, unused `motion` dep). The owl was
  Gyanhouz's first mascot; the character universe replaced it. Phase 2 ports the
  owl engine's good behaviours (dock-into-nav, peekaboo-on-sensitive-field) to
  Benny before any of those files are deleted.
- Fonts are self-hosted in `public/fonts/` via the generator in
  `/tmp/opencode/fetch-fonts.mjs` (Google Fonts, OFL). Inter is retired.

## Phase plan (agreed with the owner)

1. ✅ Design system (palette, type, spacing, character skeleton), nav, hero
   scene, welcome, programs.
2. ⬜ "Our Little Day" timeline (demo timings), "Explore Our Little World"
   activity drawer, "Meet Our Friends" interactions, parent corner (only real
   content), visit CTA; port the owl engine's dock/peekaboo to Benny; then
   delete retired files.

## modern-web-guidance skill (installed)

`.agents/skills/modern-web-guidance/` + `skills-lock.json`. Consult before
writing HTML/CSS/client-side JS. The copy has no CLI; queries run via npm:

```sh
npx -y modern-web-guidance@latest search "<2-5 word query>"
npx -y modern-web-guidance@latest retrieve "<id>[,<id>...]"
```

Browser-support policy: Baseline Widely available; decorative scroll-driven
animations ship as progressive enhancement with no JS fallback, and a print
guard so nothing is hidden on paper.
