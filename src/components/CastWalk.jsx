import { Benny, Mimi, Oliver } from '../characters/Characters.jsx'

/**
 * Three friends on a dashed ground line: a light transition that keeps the
 * character system present between content blocks without inventing a section.
 * Decorative — the friends are named in the Welcome and footer sections.
 */
export default function CastWalk() {
  return (
    <div className="shell" aria-hidden="true">
      <div className="walk-band">
        <Benny focusable="false" />
        <Mimi focusable="false" />
        <Oliver focusable="false" />
      </div>
    </div>
  )
}
