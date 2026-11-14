import { useEffect, useRef, useState } from 'react'
import { CAST } from '../characters/cast.js'
import { welcomeCopy } from '../data/school.js'

const byKey = Object.fromEntries(CAST.map((c) => [c.animal, c]))
const TONES = { sage: 'var(--sage)', butter: 'var(--butter)', lavender: 'var(--lavender)' }

export default function Welcome() {
  const castRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Greet only while the cast is actually on screen, so the animation is not
  // running (and burning frames) for the whole rest of the page.
  useEffect(() => {
    const el = castRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="welcome" aria-labelledby="welcome-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            Welcome
          </p>
          <h2 id="welcome-title" className="section__title">
            {welcomeCopy.title}
          </h2>
          <p className="lede">{welcomeCopy.body}</p>
        </header>

        {/* All five friends, together — the same skeleton everywhere, so they
            read as one class rather than five mascots. */}
        <ul
          className={`cast${inView ? ' is-waving' : ''}`}
          ref={castRef}
          aria-label="Our little friends"
        >
          {CAST.map((friend) => (
            <li key={friend.animal}>
              {/* The caption below names the friend, so the illustration is
                  decorative here — otherwise it is announced twice. */}
              <friend.Component aria-hidden="true" focusable="false" />
              <span className="cast__name">{friend.name.split(' the ')[0]}</span>
            </li>
          ))}
        </ul>

        <ul className="pillars">
          {welcomeCopy.pillars.map((pillar) => {
            const friend = byKey[pillar.character]
            return (
              <li
                className="pillar reveal"
                key={pillar.title}
                style={{ background: TONES[pillar.tone] }}
              >
                <friend.Component aria-hidden="true" />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
