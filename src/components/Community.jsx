import { school } from '../data/school.js'

const OUTLINE = 'var(--cocoa)'

/** Small medallion icons — one per series, in the same flat stroke language. */
const ICONS = {
  sprout: (
    <g fill="none" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 25v-9" />
      <path d="M14 17c0-4-3-6-6-6 0 4 3 6 6 6z" />
      <path d="M14 15c0-4 3-6 6-6 0 4-3 6-6 6z" />
    </g>
  ),
  bulb: (
    <g fill="none" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 5a7 7 0 0 1 4 12.6V20h-8v-2.4A7 7 0 0 1 14 5z" />
      <path d="M11 23h6" />
    </g>
  ),
  search: (
    <g fill="none" stroke={OUTLINE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12.5" cy="12.5" r="6.5" />
      <path d="M17.5 17.5 23 23" />
    </g>
  ),
}

const TONES = { sage: 'var(--sage)', butter: 'var(--butter)', lavender: 'var(--lavender)' }

/**
 * What the school actually publishes day to day: its three Instagram series and
 * the profile numbers. Everything here comes from the bio verbatim, so nothing
 * about pedagogy or staffing is implied beyond what they wrote.
 */
export default function Community() {
  const ig = school.instagram

  return (
    <section className="section band--sky" id="feed" aria-labelledby="feed-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            From the feed
          </p>
          <h2 id="feed-title" className="section__title">
            {ig.bio}
          </h2>
          <p className="lede">
            Three little series run through the school&apos;s Instagram all year.
          </p>
        </header>

        <ul className="cards cards--plate">
          {ig.series.map((item) => (
            <li className="card reveal" key={item.name}>
              <span
                className="card__medallion"
                style={{ background: TONES[item.tone] }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 28 28" focusable="false">
                  {ICONS[item.icon]}
                </svg>
              </span>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="community__foot">
          <p className="community__meta">
            <a href={ig.url} target="_blank" rel="noreferrer">
              {ig.handle}
            </a>{' '}
            · {ig.followers.toLocaleString('en-IN')} followers · {ig.posts} posts
            · as of {ig.asOf}
          </p>
          <a className="btn" href={ig.url} target="_blank" rel="noreferrer">
            Follow on Instagram <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
