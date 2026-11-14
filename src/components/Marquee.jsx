const ITEMS = [
  'Preschool',
  'Wakad · Pimpri-Chinchwad',
  'Opens 9:00 am Monday',
  '4.7 from 60 Google reviews',
  'Behind Murari Petrolpump',
  'Full weekly hours unconfirmed',
]

/**
 * Ticker of the facts we actually have. Purely decorative repetition — the same
 * information is stated in the hero and footer — so it is aria-hidden rather
 * than read out twice. Pauses when the nav's motion toggle is off, which is what
 * WCAG 2.2.2 asks for on content that moves for more than five seconds.
 */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {['a', 'b'].map((copy) => (
          <ul className="marquee__group" key={copy}>
            {ITEMS.map((item) => (
              <li key={item}>
                <span className="marquee__dot" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
