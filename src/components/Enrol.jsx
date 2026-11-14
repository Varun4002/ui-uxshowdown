import { useId } from 'react'
import { Benny } from '../characters/Characters.jsx'
import { copy, enrolSteps } from '../data/school.js'

/**
 * Enrolment form. Native constraint validation only — `required` + type=email
 * blocks submission before this code ever runs, so there is no second, subtly
 * different validation implementation to drift out of sync.
 *
 * Focus is handled by delegation on the form rather than per-input handlers,
 * which also gives correct behaviour when focus moves between fields with the
 * keyboard (the peekaboo must not flicker off and on between them).
 */
export default function Enrol({ onFieldFocus, onFieldBlur, onSubmitted, success }) {
  const formId = useId()

  const handleFocus = (event) => {
    const field = event.target
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      return
    }
    onFieldFocus(field.name, field)
  }

  const handleBlur = (event) => {
    // Only clear once focus has actually left the form.
    if (!event.currentTarget.contains(event.relatedTarget)) onFieldBlur()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    onSubmitted()
  }

  return (
    <section className="section enrol" id="enrol">
      <div className="shell enrol__grid">
        <div className="enrol__copy">
          <p className="eyebrow">Enrolment</p>
          <h2>Book a visit</h2>
          <p className="lede">
            Come and see the rooms, meet the teachers, and ask anything you like.
          </p>

          <ol className="enrol__steps">
            {enrolSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="enrol__note">{copy.formNote}</p>

          <div className="enrol__host" aria-hidden="true">
            <Benny focusable="false" />
            <p className="enrol__bubble">See you soon</p>
          </div>
        </div>

        <form
          className="card enrol__form"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
          aria-describedby={`${formId}-note`}
        >
          <div className="field">
            <label htmlFor={`${formId}-name`}>Your name</label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor={`${formId}-tel`}>Phone number</label>
            <input
              id={`${formId}-tel`}
              name="tel"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
            />
          </div>

          <div className="field">
            <label htmlFor={`${formId}-age`}>Child&rsquo;s age</label>
            <select id={`${formId}-age`} name="age" defaultValue="2-3" required>
              <option value="under-2">Under 2</option>
              <option value="2-3">2&ndash;3 years</option>
              <option value="3-4">3&ndash;4 years</option>
              <option value="4-5">4&ndash;5 years</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>

          <div className="field field--wide">
            <label htmlFor={`${formId}-message`}>Anything we should know?</label>
            <textarea id={`${formId}-message`} name="message" rows={3} />
          </div>

          <div className="enrol__actions">
            <button className="btn" type="submit">
              Request a visit
            </button>
            <p className="enrol__hint" id={`${formId}-note`}>
              No payment, no commitment.
            </p>
          </div>

          {/* The owl's spin and confetti are decoration. This is the part a
              screen reader can actually perceive, so it is not optional.
              There is no backend: this must never claim a real submission. */}
          <p className="enrol__success" role="status">
            {success
              ? 'Demo only — nothing was sent. To reach the school, call or WhatsApp +91 92720 99011.'
              : ''}
          </p>
        </form>
      </div>
    </section>
  )
}
