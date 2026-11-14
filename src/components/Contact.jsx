import { school } from '../data/school.js'

/**
 * Closing band. For a preschool the phone call is the conversion, so the number
 * is the loudest type on the page and a real `tel:` link — not a form submit.
 */
export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell contact__inner">
        <p className="eyebrow contact__eyebrow">
          <span className="rule" aria-hidden="true" />
          Talk to us
        </p>

        <a className="contact__phone" href={`tel:${school.phoneHref}`}>
          {school.phone}
        </a>

        <p className="contact__note">
          {school.category} · Wakad, Pimpri-Chinchwad · opens{' '}
          {school.hours.known.opens} {school.hours.known.day}
        </p>

        <div className="contact__actions">
          <a className="btn btn--light" href="#enrol">
            Book a visit
          </a>
          <a
            className="btn btn--light btn--quiet-light"
            href={school.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            {school.instagram.handle}
          </a>
        </div>
      </div>
    </section>
  )
}
