import { useEffect, useRef, useState } from 'react'
import { Benny } from '../characters/Characters.jsx'
import { day } from '../data/school.js'

/**
 * The daily rhythm as a vertical timeline with the mascot riding alongside.
 *
 * The mascot tracks the schedule through an IntersectionObserver that picks the
 * node nearest the middle of the viewport — no scroll listener, no polling. It
 * shows the child where they are in the day without hijacking the scroll, and
 * every node still carries its own time and text, so the bubble is decoration.
 */
export default function DayTimeline() {
  const [active, setActive] = useState(0)
  const nodes = useRef([])

  useEffect(() => {
    const items = nodes.current.filter(Boolean)
    if (!items.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (!visible.length) return
        const middle = window.innerHeight / 2
        const nearest = visible.reduce((best, entry) =>
          Math.abs(entry.boundingClientRect.top - middle) <
          Math.abs(best.boundingClientRect.top - middle)
            ? entry
            : best
        )
        const index = items.indexOf(nearest.target)
        if (index >= 0) setActive(index)
      },
      // Only the band around the viewport's middle counts as "current".
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.4, 1] }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const current = day.blocks[active] ?? day.blocks[0]

  return (
    <section className="section day" id="day" aria-labelledby="day-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">
            <span className="rule" aria-hidden="true" />
            {day.eyebrow}
          </p>
          <h2 id="day-title" className="section__title">
            {day.title}
          </h2>
          <p className="lede">{day.intro}</p>
        </header>

        <div className="day__grid">
          <aside className="day__mascot" aria-hidden="true">
            <div className="day__bubble">
              <span className="day__clock">{current.time}</span>
              <span className="day__stage">{current.label}</span>
            </div>
            <Benny className="day__benny" focusable="false" />
          </aside>

          <ol className="day__list">
            {day.blocks.map((block, index) => (
              <li
                className="day__item"
                key={block.label}
                data-active={index === active || undefined}
                ref={(el) => {
                  nodes.current[index] = el
                }}
              >
                <span className="day__time">{block.time}</span>
                <h3>{block.label}</h3>
                <p>{block.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
