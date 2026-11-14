import { CAST } from '../characters/cast.js'
import { programs } from '../data/school.js'

const byKey = Object.fromEntries(CAST.map((c) => [c.animal, c]))
const TONES = { butter: 'var(--butter)', sage: 'var(--sage)', sky: 'var(--sky)' }

export default function Programs() {
  return (
    <section className="section" id="programs" aria-labelledby="programs-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            Our Programs
          </p>
          <h2 id="programs-title" className="section__title">
            Little Steps, Big Discoveries
          </h2>
          <p className="lede">
            Three groups, one rhythm: the youngest are eased in, the middle explores
            outward, and the oldest get ready for big school.
          </p>
        </header>

        <ul className="programs">
          {programs.map((program) => {
            const friend = byKey[program.character]
            return (
              <li
                className="program reveal"
                key={program.name}
                style={{ background: TONES[program.tone] }}
              >
                <div className="program__head">
                  <friend.Component aria-hidden="true" focusable="false" />
                  <h3>{program.name}</h3>
                </div>

                <p className="program__intro">{program.intro}</p>

                <p className="program__label">What they work on</p>
                <ul className="program__objectives">
                  {program.objectives.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <p className="program__label">Example activities</p>
                <ul className="program__activities">
                  {program.activities.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                {program.agesVerified ? null : (
                  <p className="program__pending">Age range to be confirmed</p>
                )}

                <a className="program__cta" href="#enrol">
                  Ask about {program.name} <span aria-hidden="true">→</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
