import { forwardRef } from 'react'

// The owl rig.
//
// Geometry is hand-authored rather than traced from a raster: a rig needs
// semantic, individually addressable parts (a circle for each pupil, its own
// group for the head, a rotatable wing) which is exactly what a diffusion model
// plus a vectoriser cannot produce. Every part below is a named hook for the
// engine or a state class.
//
// Palette is fixed by colour_pallete.md — Ink body, Blush belly and eye sockets,
// Pine beak, Mauve wings, Blush for the active/pointing wing. No other fill is
// used, and no text ever sits on Mauve.
//
// Motion is composed in owl.css from CSS custom properties written by
// useOwlEngine (pupils, head) and from state classes (peekaboo, pointing,
// celebrate), so this component never re-renders while the pointer or the page
// moves.

const Owl = forwardRef(function Owl(
  { pointing = false, peekaboo = false, celebrating = false, wingAngle = 0 },
  ref,
) {
  const className = [
    'owl',
    pointing && 'owl--pointing',
    peekaboo && 'owl--peekaboo',
    celebrating && 'owl--celebrate',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 140 152"
      aria-hidden="true"
      focusable="false"
      style={{ '--owl-wing-rot': `${wingAngle}deg` }}
    >
      <ellipse className="owl__body" cx="70" cy="84" rx="45" ry="52" />
      <ellipse className="owl__belly" cx="70" cy="100" rx="29" ry="33" />

      {/* No separate feet: the peekaboo hands rest at the base of the body and
          fully occlude the feet they used to sit beside, so that geometry was
          invisible in every state. */}

      {/* Wings tucked into the body silhouette: at cx 27/113 they sat entirely
          outside the body edge and read as detached earmuffs. Moved inward so
          they overlap the silhouette like folded wings. */}
      {/* Wings: small tapered leaves at the shoulder. Long lobes hanging past the
          body read as grey hair. */}
      <path
        className="owl__wing owl__wing--left"
        d="M33 68 C20 82 19 104 30 116 C38 104 40 82 33 68 Z"
      />
      <path
        className="owl__wing owl__wing--right"
        d="M107 68 C120 82 121 104 110 116 C102 104 100 82 107 68 Z"
      />

      {/* Head group: tufts, eyes and beak tilt together around the neck. The
          body and belly stay put, which is what reads as a head tilt rather
          than the whole mascot leaning. */}
      <g className="owl__head">
        <path className="owl__tuft" d="M48 42 L38 12 L64 30 Z" />
        <path className="owl__tuft" d="M92 42 L102 12 L76 30 Z" />

        {/* Eye sockets: pearl sclera with a slate outline, so the eyes read as
            eyes against a slate body without introducing a fifth hue. */}
        <circle className="owl__socket" cx="53" cy="70" r="18" />
        <circle className="owl__socket" cx="87" cy="70" r="18" />

        <g className="owl__pupil">
          <circle className="owl__pupil-core" cx="53" cy="70" r="8" />
          {/* Catchlight: without it the eyes read as flat holes. */}
          <circle className="owl__pupil-glint" cx="50" cy="67" r="2.6" />
        </g>
        <g className="owl__pupil">
          <circle className="owl__pupil-core" cx="87" cy="70" r="8" />
          <circle className="owl__pupil-glint" cx="84" cy="67" r="2.6" />
        </g>

        <path className="owl__beak" d="M70 102 L62 87 Q70 83 78 87 Z" />
      </g>

      {/* Peekaboo paws. They must sit on the Ink part of the body — resting on the
          Blush belly made two dark circles that read as extra eyes. At the base
          they read as paws, and rise over the eyes for a sensitive field. */}
      <ellipse className="owl__hand" cx="53" cy="131" rx="12" ry="10" />
      <ellipse className="owl__hand" cx="87" cy="131" rx="12" ry="10" />
    </svg>
  )
})

export default Owl
