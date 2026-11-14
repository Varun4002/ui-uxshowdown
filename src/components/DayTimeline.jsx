import { useEffect, useRef, useState } from 'react'
import { CAST } from '../characters/cast.js'
import { day } from '../data/school.js'

const byAnimal = Object.fromEntries(CAST.map((friend) => [friend.animal, friend]))

/**
 * The daily rhythm as a vertical timeline, with the mascot riding alongside.
 *
 * The mascot changes to whoever owns the active stage — Benny greets, Oliver
 * discovers, Pip runs, Mimi winds down — so scrolling the day walks you through
 * the cast instead of staring at one character. Tracking uses an
 * IntersectionObserver that picks the node nearest the middle of the viewport: no
 * scroll listener, no polling.
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
  const Host = byAnimal[current.animal]?.Component ?? CAST[0].Component
  const hostName = byAnimal[current.animal]?.name.split(' the ')[0] ?? 'Benny'

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
              <span className="day__host">with {hostName}</span>
            </div>
            {/* Keyed so each stage change plays the little entrance. */}
            <Host className="day__benny" key={current.animal} focusable="false" />
          </aside>

          <ol className="day__list">
            {day.blocks.map((block, index) => {
              const Friend = byAnimal[block.animal]?.Component
              return (
                <li
                  className="day__item"
                  key={block.label}
                  data-active={index === active || undefined}
                  ref={(el) => {
                    nodes.current[index] = el
                  }}
                >
                  <div className="day__head">
                    {Friend ? (
                      <Friend className="day__avatar" aria-hidden="true" focusable="false" />
                    ) : null}
                    <div>
                      <span className="day__time">{block.time}</span>
                      <h3>{block.label}</h3>
                    </div>
                  </div>
                  <p>{block.body}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
