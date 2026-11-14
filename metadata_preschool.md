# Metadata — Preschool (Google Maps listing capture)

Source: Google Maps place listing, pasted by owner 2026-11-15.
Status: **partial** — only the fields below were captured. Everything not
listed is unknown; see [Gaps](#gaps--needs-verification) before building UI.

## Canonical record

> **Confirmed by the school directly (2026-11-15):** phone **+91 92720 99011**
> (`tel:+919272099011`) and Instagram **@gyanhouz**. These came from the owner,
> not from the listing.

### Instagram profile (snapshot, November 2026)

| Field | Value |
|---|---|
| Handle | [@gyanhouz](https://www.instagram.com/gyanhouz/) |
| Followers | 2,116 |
| Posts | 139 |
| Bio | "Educational Games and toys" |
| Series | Growth Mondays · Factusdays · Discovery Thursday |

The bio describes Growth Mondays as *"child physiologist tips"* — almost
certainly a typo for *psychologist*. The site does not repeat that phrase until
it is confirmed. All numbers are a snapshot and any UI showing them must carry
an "as of" label.


| Field | Value |
|---|---|
| Name (en) | GYANHOUZ (GYANOOZ) LEARNING HUB |
| Name (Devanagari) | ज्ञान उज् लर्निंग हब |
| Slug (suggested) | `gyanhouz-learning-hub` |
| Category | Preschool |
| Rating | 4.7 / 5 |
| Review count | 60 |
| Locality | Wakad, Pimpri-Chinchwad, Maharashtra |
| Postal code | 411057 |
| Plus code | JQ45+6J Pimpri-Chinchwad, Maharashtra |
| Hours (known) | Opens 09:00 Monday |
| Coordinates | unknown |

## Address

```
behind Murari Petrolpump, Choudhary Park, Shankar Kalat Nagar,
Wakad, Pimpri-Chinchwad, Maharashtra 411057
```

Components: landmark `behind Murari Petrolpump` · sub-locality
`Choudhary Park, Shankar Kalat Nagar` · locality `Wakad` · city
`Pimpri-Chinchwad` · state `Maharashtra` · PIN `411057`.

## Hours

Only one data point was captured:

| Day | Status | Opens |
|---|---|---|
| Monday | — | 09:00 |
| Tue–Sun | unknown | unknown |

The listing read `Closed · Opens 9 am Mon`, i.e. the place was closed at
capture time and the next opening was Monday 09:00. That says nothing about
weekday/weekend hours, lunch closures, or holiday schedules. A full
`opening_hours` table is required before rendering any schedule UI.

## Source capture (verbatim)

Kept unedited so nothing is silently "cleaned up":

```
GYANHOUZ (GYANOOZ) LEARNING HUB
ज्ञान उज् लर्निंग हब
4.7
(60)
Preschool
...
behind Murari Petrolpump, Choudhary Park, Shankar Kalat Nagar, Wakad, Pimpri-Chinchwad, Maharashtra 411057
Closed · Opens 9 am Mon
JQ45+6J Pimpri-Chinchwad, Maharashtra
```

The `Overview · Reviews · Directions · Save · Nearby · Send to phone · Share`
lines in the paste are **Google Maps UI affordances**, not school data or
site features. Do not treat them as content sections.

## Flags on the captured data

- **Devanagari name is suspect.** `ज्ञान उज् लर्निंग हब` reads as
  *gyān uj larning hab*, which does not match `GYANHOUZ` (gyan + house); a
  plausible rendering is `ज्ञानहाउज़ लर्निंग हब`. Preserved verbatim above —
  confirm the official spelling with the school before publishing it.
- **Two romanizations.** `GYANHOUZ` and `GYANOOZ` appear in one name. Treat
  `GYANHOUZ` as primary until confirmed; do not invent a third spelling.
- **Rating is a snapshot.** 4.7 / 60 reviews was true at capture time and
  will drift. Label any UI with an "as of" date or fetch it live.
- **Plus code is local, not global.** `JQ45+6J` is a short code that only
  resolves with the `Pimpri-Chinchwad, Maharashtra` locality. It is not
  enough to derive coordinates reliably — capture `lat`/`lng` from Maps
  instead of decoding the code.

## Gaps — needs verification

Everything here is missing and must not be invented for the UI:

- Phone number, email, website, social handles
- Full weekly opening hours, holiday closures
- Coordinates, Google Place ID
- Fees, admissions process, age groups, teacher/student ratio
- Programs, curriculum, timings per batch
- Photos, logo, brand colors, testimonials (review text not captured)
- Official English and Devanagari name spellings

## Usage note

This file is a data source for the UI/UX demo in this repo, not a spec. When
wiring it into React, keep the values in one typed fixture (e.g.
`src/data/school.js`) and leave unknown fields `null` so missing data surfaces
in the UI instead of being papered over with placeholder text.

## Presentation rules

- Colour and type are governed by [`colour_pallete.md`](./colour_pallete.md) and
  [`ui.md`](./ui.md). This file says *what is true*, they say *how it looks*.
- The rating is a snapshot (`4.7`, `60` reviews, November 2026). Any UI showing
  it needs an "as of" label or must fetch it live.
- The Devanagari name is retained verbatim and rendered with
  `spelling unconfirmed` until the school confirms it — do not silently correct
  it, and do not render a guessed "better" version.
- The enquiry form is front-end only. If a real backend is added, this file's
  missing contact details become a blocker, not a nice-to-have.

## Status of the ambiguity above

An earlier request asked to "fill the website with revant info". That was not
resolved: it may mean *relevant* (school) info, which is this file, or a person
named Revant, for whom no details exist. Nothing was invented either way.

