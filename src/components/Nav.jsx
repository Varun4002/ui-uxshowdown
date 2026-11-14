import { useState } from 'react'
import { Benny } from '../characters/Characters.jsx'
import { school, theme } from '../data/school.js'

/**
 * Floating pill navigation. Links only ever point at sections that exist —
 * Activities and Our Little World ship in the next phase and are deliberately
 * absent until then, because a nav link that 404s is worse than a shorter nav.
 */
export default function Nav({ paused, onToggleMotion }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav" data-open={open || undefined}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          {/* The bear waves when you hover the logo. */}
          <Benny className="nav__mascot" aria-hidden="true" focusable="false" />
          <span className="nav__brand-name">
            <span className="nav__brand-en">{school.name.split(' (')[0]}</span>
            <span className="nav__brand-meta">{school.category} · Wakad</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {theme.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn nav__cta" href="#enrol">
          Book a School Visit
        </a>

        <button
          type="button"
          className="btn btn--quiet nav__motion"
          onClick={onToggleMotion}
        >
          {paused ? 'Play motion' : 'Pause motion'}
        </button>

        <button
          type="button"
          className="btn btn--quiet nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div className="nav__menu" id="nav-menu">
        {theme.nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav__menu-cta" href="#enrol" onClick={() => setOpen(false)}>
          Book a School Visit
        </a>
        {/* Still reachable on phones, where it is hidden from the pill. */}
        <button
          type="button"
          className="btn btn--quiet nav__menu-motion"
          onClick={onToggleMotion}
        >
          {paused ? 'Play motion' : 'Pause motion'}
        </button>
      </div>
    </header>
  )
}
