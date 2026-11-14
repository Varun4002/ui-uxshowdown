import { copy } from '../data/school.js'

export default function Highlights() {
  return (
    <section className="section" id="offer">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            What we offer
          </p>
          <h2 className="section__title">
            Small rooms,
            <br />
            unhurried days
          </h2>
        </header>

        <ul className="cards">
          {copy.highlights.map((item, index) => (
            <li className="card reveal" key={item.title}>
              <span className="card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.pending ? (
                <p className="card__pending">Awaiting confirmation</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
