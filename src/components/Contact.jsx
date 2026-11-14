import { addressLines, directionsUrl, school, visit } from '../data/school.js'

/**
 * The closing section: everything a parent needs to act, in one place — call,
 * WhatsApp, book, and where to find the school. It sits on Butter rather than
 * Ink so the ending reads as a warm invitation instead of a long dark block
 * running straight into the footer.
 */
export default function Contact() {
  return (
    <section className="section visit" id="contact" aria-labelledby="visit-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {visit.eyebrow}
          </p>
          <h2 id="visit-title" className="section__title">
            {visit.title}
          </h2>
          <p className="lede">{visit.lede}</p>
        </header>

        <div className="visit__grid">
          <div className="visit__card">
            <p className="visit__label">Call us</p>
            <a className="visit__phone" href={`tel:${school.phoneHref}`}>
              {school.phone}
            </a>

            <div className="visit__actions">
              <a className="btn" href="#enrol">
                Book a school visit
              </a>
              <a
                className="btn btn--quiet"
                href={school.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </div>

            <p className="visit__note">
              {school.category} · opens {school.hours.known.opens}{' '}
              {school.hours.known.day}
            </p>
          </div>

          <div className="visit__info">
            <div className="visit__block">
              <h3>Where</h3>
              <address className="visit__address">
                {addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a className="visit__link" href={directionsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="visit__block">
              <h3>Hours</h3>
              <p className="visit__hours">
                {school.hours.known.day}, from {school.hours.known.opens}
              </p>
              <p className="visit__note">
                Full weekly hours are not published yet — please call ahead.
              </p>
            </div>

            <div className="visit__block">
              <h3>Follow along</h3>
              <a
                className="visit__link"
                href={school.instagram.url}
                target="_blank"
                rel="noreferrer"
              >
                {school.instagram.handle} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <ul className="visit__checklist">
          {visit.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
