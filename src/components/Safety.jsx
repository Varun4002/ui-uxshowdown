import { safety } from '../data/school.js'

/**
 * Safety grid.
 *
 * Teal (#2EC4B6) is not part of the nine-hue palette, but the brief asks for it
 * in the iconography. It is used the only way it stays readable: as the tile
 * FILL with cocoa glyphs on top (5.13:1). Teal on cream is 2.01:1 and would be
 * invisible as a stroke, so it never touches the page background directly.
 */
const ICONS = {
  cctv: (
    <g fill="none" stroke="var(--cocoa)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10h12l4 3v6H6z" />
      <path d="M6 10 4 13l4 2" />
      <circle cx="14" cy="16" r="2.4" />
      <path d="M24 19v6" />
    </g>
  ),
  ratio: (
    <g fill="none" stroke="var(--cocoa)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="11" r="3.4" />
      <path d="M4 24c0-3.4 2.7-6 6-6s6 2.6 6 6" />
      <circle cx="20" cy="13" r="2.6" />
      <path d="M16 24c0-2.6 1.9-4.6 4-4.6s4 2 4 4.6" />
    </g>
  ),
  sanitize: (
    <g fill="none" stroke="var(--cocoa)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 9h6v3l2 3v11H9V15l2-3z" />
      <path d="M13 5h2v4" />
      <path d="M23 8v3M20 9.5h6" />
      <path d="M20 16h6M21 20h4" />
    </g>
  ),
  access: (
    <g fill="none" stroke="var(--cocoa)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="12" width="16" height="12" rx="3" />
      <path d="M10 12V9a4 4 0 0 1 8 0v3" />
      <circle cx="14" cy="18" r="1.6" />
    </g>
  ),
}

export default function Safety() {
  return (
    <section className="section safety" id="safety" aria-labelledby="safety-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {safety.eyebrow}
          </p>
          <h2 id="safety-title" className="section__title">
            {safety.title}
          </h2>
        </header>

        <ul className="safety__grid">
          {safety.items.map((item) => (
            <li className="safety__tile reveal" key={item.title}>
              <span className="safety__icon" aria-hidden="true">
                <svg viewBox="0 0 28 28" focusable="false">
                  {ICONS[item.icon]}
                </svg>
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
