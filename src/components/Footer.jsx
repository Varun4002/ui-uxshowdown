import { CAST } from '../characters/cast.js'
import { addressLines, directionsUrl, school, theme } from '../data/school.js'

const FOOTER_EXTRA = [
  { label: 'Safety & Care', href: '#safety' },
  { label: 'Parent stories', href: '#reviews' },
  { label: 'Questions', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__col">
            {/* The school's own logo. It is a JPEG on white with an orange mark
                outside the nine-hue palette, so it sits on a plate rather than
                blending into the band. */}
            <img
              className="footer__logo"
              src="/gyanhouz-logo.jpg"
              alt="Gyanhouz — The Learning Hub"
              width="150"
              height="150"
            />
            <h2 className="footer__name">Gyanhouz</h2>
            <p className="footer__hindi" lang="hi">
              {school.nameHi}
            </p>
            <p className="footer__note">
              {school.nameHiUnverified
                ? 'Devanagari captured from Google Maps and not yet confirmed by the school.'
                : null}
            </p>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Explore</h2>
            <nav className="footer__nav" aria-label="Footer">
              {theme.nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              {FOOTER_EXTRA.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Visit</h2>
            <address className="footer__address">
              {addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a className="footer__link" href={directionsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps <span aria-hidden="true">↗</span>
            </a>
            <p className="footer__note">
              {school.hours.known.day}, from {school.hours.known.opens} · full
              weekly hours not published yet
            </p>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Say hello</h2>
            <a className="footer__link footer__link--lead" href={`tel:${school.phoneHref}`}>
              {school.phone}
            </a>
            <a
              className="footer__link"
              href={school.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp us <span aria-hidden="true">↗</span>
            </a>
            <a
              className="footer__link"
              href={school.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              {school.instagram.handle} <span aria-hidden="true">↗</span>
            </a>
            <a className="footer__link" href="#enrol">
              Book a school visit
            </a>
          </div>
        </div>

        {/* Storybook sign-off: the five friends see you out. */}
        <div className="footer__cast">
          <p className="footer__cast-label">See you at school</p>
          <ul aria-hidden="true">
            {CAST.map((friend) => (
              <li key={friend.animal}>
                <friend.Component focusable="false" />
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bar">
          <p>
            UI/UX demo · facts from Google Maps and the school&apos;s Instagram,
            as of {school.ratingAsOf} · the enquiry form posts nowhere
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      <p className="footer__display" aria-hidden="true">
        Gyanhouz
      </p>
    </footer>
  )
}
