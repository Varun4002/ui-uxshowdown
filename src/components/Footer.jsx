import { addressLines, directionsUrl, school } from '../data/school.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__col">
            {/* The school's own logo. It is a JPEG on white, and its orange is
                outside the five-hue UI palette, so it is presented as a plate
                rather than blended into the page. */}
            <img
              className="footer__logo"
              src="/gyanhouz-logo.jpg"
              alt="Gyanhouz — The Learning Hub"
              width="150"
              height="150"
            />
            <h2 className="footer__title">{school.name.split(' (')[0]}</h2>
            <p className="footer__hindi" lang="hi">
              {school.nameHi}
            </p>
            <p className="footer__note">
              {/* The Devanagari on the Maps listing does not match the romanised
                  name, so it is shown but explicitly flagged rather than
                  silently presented as correct. */}
              {school.nameHiUnverified
                ? 'Devanagari captured from Google Maps and not yet confirmed by the school.'
                : null}
            </p>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Where</h2>
            <address className="footer__address">
              {addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a
              className="footer__link"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Hours</h2>
            <p className="footer__hours">
              {school.hours.known.day}, from {school.hours.known.opens}
            </p>
            <p className="footer__note">
              Full weekly hours are not published yet — please call ahead.
            </p>
            <a className="footer__link" href={`tel:${school.phoneHref}`}>
              {school.phone}
            </a>
          </div>
        </div>

        <div className="footer__bar">
          <p>
            UI/UX demo · facts from a Google Maps listing, {school.ratingAsOf} ·
            the enquiry form posts nowhere
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      {/* Oversized sign-off. The name is already exposed in the column above, so
          this is decoration and must not be announced twice. */}
      <p className="footer__display" aria-hidden="true">
        Gyanhouz
      </p>
    </footer>
  )
}
