import { useCallback, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { school, testimonials } from '../data/school.js'

/**
 * Swipeable review rail. A scroll-snap container plus two buttons — no carousel
 * library, no autoplay (so no extra pause control to explain), and the native
 * scroller keeps touch swiping, keyboard scrolling and screen-reader order
 * correct without any of it being reimplemented.
 */
export default function Testimonials() {
  const railRef = useRef(null)
  const reduced = useReducedMotion()

  const nudge = useCallback(
    (direction) => {
      const rail = railRef.current
      if (!rail) return
      const card = rail.querySelector('.review')
      const step = card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8
      rail.scrollBy({ left: direction * step, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced]
  )

  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="shell">
        <header className="section__head reviews__head">
          <div>
            <p className="eyebrow">
              <span className="rule" aria-hidden="true" />
              {testimonials.eyebrow}
            </p>
            <h2 id="reviews-title" className="section__title">
              {testimonials.title}
            </h2>
          </div>

          <div className="reviews__controls">
            <p className="reviews__score">
              <strong>{school.rating}</strong>
              <span>
                from {school.reviewCount} Google reviews · {school.ratingAsOf}
              </span>
            </p>
            <div className="reviews__arrows">
              <button
                type="button"
                className="btn btn--quiet reviews__arrow"
                onClick={() => nudge(-1)}
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                type="button"
                className="btn btn--quiet reviews__arrow"
                onClick={() => nudge(1)}
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>
        </header>

        <div
          className="reviews__rail"
          ref={railRef}
          tabIndex={0}
          role="group"
          aria-label="Parent reviews"
        >
          <ul className="reviews__track">
            {testimonials.items.map((item) => (
              <li className="review" key={item.author}>
                <blockquote>
                  <p>{item.quote}</p>
                </blockquote>
                <p className="review__by">
                  <span className="review__author">{item.author}</span>
                  <span className="review__role">{item.role}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="reviews__notice">{testimonials.sampleNotice}</p>
      </div>
    </section>
  )
}
