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
            <a className="btn btn--lg" href="#enrol">
              Enquire about admission <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn--quiet btn--lg" href={`tel:${school.phoneHref}`}>
              Call the school
            </a>
          </div>

          <p className="hero__call">
            Or message us on{' '}
            <a href={school.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
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
