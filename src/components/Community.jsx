import { school } from '../data/school.js'

/**
 * What the school actually publishes day to day: its three Instagram series and
 * the profile numbers. Everything here comes from the bio verbatim, so nothing
 * about pedagogy or staffing is implied beyond what they wrote.
 */
export default function Community() {
  const ig = school.instagram

  return (
    <section className="section band--sky" id="feed">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            From the feed
          </p>
          <h2 className="section__title">{ig.bio}</h2>
        </header>

        <ul className="cards cards--plate">
          {ig.series.map((item, index) => (
            <li className="card reveal" key={item.name}>
              <span className="card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="community__meta">
          <a href={ig.url} target="_blank" rel="noreferrer">
            {ig.handle}
          </a>{' '}
          · {ig.followers.toLocaleString('en-IN')} followers · {ig.posts} posts
          · as of {ig.asOf}
        </p>
      </div>
    </section>
  )
}
