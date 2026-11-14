import { Tilly } from '../characters/Characters.jsx'
import { faq, school } from '../data/school.js'

/**
 * FAQ accordion built on native <details>/<summary>: keyboard operable and
 * screen-reader friendly with no JavaScript, and it degrades to plain visible
 * text if anything fails. Sits directly above the enrolment form so the last
 * thing read before the CTA is the reassurance, not a form field.
 */
export default function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="shell faq__inner">
        <div className="faq__aside">
          <header className="section__head faq__head">
            <p className="eyebrow">
              <span className="rule" aria-hidden="true" />
              {faq.eyebrow}
            </p>
            <h2 id="faq-title" className="section__title">
              {faq.title}
            </h2>
          </header>

          {/* Tilly keeps the books — the natural guide to a questions section. */}
          <div className="faq__host" aria-hidden="true">
            <Tilly focusable="false" />
            <p className="faq__bubble">Ask us anything</p>
          </div>

          <p className="faq__more">
            Still unsure? Call{' '}
            <a href={`tel:${school.phoneHref}`}>{school.phone}</a>
          </p>
        </div>

        <div className="faq__list">
          {faq.items.map((item) => (
            <details className="faq__item" key={item.q}>
              <summary>
                <span>{item.q}</span>
                <span className="faq__mark" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
