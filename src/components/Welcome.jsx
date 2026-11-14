import { CAST } from '../characters/cast.js'
import { welcomeCopy } from '../data/school.js'

const byKey = Object.fromEntries(CAST.map((c) => [c.animal, c]))
const TONES = { sage: 'var(--sage)', butter: 'var(--butter)', lavender: 'var(--lavender)' }

export default function Welcome() {
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
        <ul className="cast" aria-label="Our little friends">
          {CAST.map((friend) => (
            <li key={friend.animal}>
              <friend.Component />
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
