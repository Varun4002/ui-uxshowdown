import HeroScene from './HeroScene.jsx'
import { heroCopy, school, theme } from '../data/school.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="rule" aria-hidden="true" />
            {school.category} · Wakad, Pimpri-Chinchwad
          </p>

          <h1 id="hero-title" className="hero__title">
            {heroCopy.title}
            <br />
            <em>{heroCopy.titleEm}</em>
          </h1>

          <p className="hero__lede">{heroCopy.lede}</p>

          <div className="hero__actions">
            <a className="btn btn--lg" href={heroCopy.primary.href}>
              {heroCopy.primary.label} <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--coral btn--lg" href={heroCopy.secondary.href}>
              {heroCopy.secondary.label}
            </a>
          </div>

          <p className="hero__call">
            Or call <a href={`tel:${school.phoneHref}`}>{school.phone}</a>
          </p>
        </div>

        {/* ~45% of the hero, and the copy never overlaps it. */}
        <div className="hero__stage">
          <HeroScene />
          <div className="hero__labels" aria-hidden="true">
            {theme.chips.map((chip) => (
              <span className="hero__label" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
