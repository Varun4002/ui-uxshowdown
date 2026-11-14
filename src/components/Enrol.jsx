import { useId, useState } from 'react'
import { Benny } from '../characters/Characters.jsx'
import { copy, enrolSteps, programs } from '../data/school.js'

/**
 * Enrolment form.
 *
 * Validation stays native (`required`, `pattern`, `type`) — there is no second,
 * subtly different validation implementation to drift out of sync. What this
 * component adds is the accessibility layer that native validation does not
 * provide: `aria-invalid` is kept in sync with the CSS `:user-invalid` state, the
 * error is only linked through `aria-describedby` while it is actually shown, and
 * one polite live region announces the error when a field is left invalid.
 *
 * Why the sync matters: without it, Firefox and Safari expose an empty required
 * field as invalid from page load, so a screen reader announces "invalid entry"
 * before the user has touched anything.
 *
 * There is no backend. On submit this must never claim a real submission.
 */
// Computed once per page load: a stable `min` for the visit-date picker (doing this
// during render would be impure and could change between renders).
const TODAY = new Date().toISOString().slice(0, 10)

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

  // Errors mount only after the user has interacted: on leaving a field, or on a
  // failed submit (native `invalid`). Keeping this in state — rather than toggling
  // a hidden live region — means the message element is *inserted*, which assistive
  // technology announces reliably.
  const [invalid, setInvalid] = useState({})
  const mark = (el) => {
    if (!el?.name) return
    const bad = el.matches(':user-invalid') || !el.validity.valid
    setInvalid((current) =>
      current[el.name] === bad ? current : { ...current, [el.name]: bad }
    )
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
          onBlur={(event) => {
            mark(event.target)
            handleBlur(event)
          }}
          onChange={(event) => mark(event.target)}
          onInput={(event) => mark(event.target)}
          onInvalid={(event) => mark(event.target)}
          onSubmit={handleSubmit}
          aria-describedby={`${formId}-note`}
        >
          <div className="enrol__formhead">
            <h3>Tell us about your child</h3>
            <p>We reply on the number you give us.</p>
          </div>

          <div className="field">
            <label htmlFor={`${formId}-name`}>Your name</label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={invalid.name || false}
              aria-describedby={invalid.name ? `${formId}-name-error` : undefined}
            />
            {invalid.name ? (
              <p className="form-error" id={`${formId}-name-error`} role="status">
                Please tell us your name.
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={`${formId}-tel`}>Phone number</label>
            <input
              id={`${formId}-tel`}
              name="tel"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              pattern="[6-9][0-9]{9}"
              title="A 10-digit Indian mobile number, starting 6–9"
              required
              aria-invalid={invalid.tel || false}
              aria-describedby={invalid.tel ? `${formId}-tel-error` : undefined}
            />
            {invalid.tel ? (
              <p className="form-error" id={`${formId}-tel-error`} role="status">
                Enter a 10-digit mobile number starting with 6, 7, 8 or 9.
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={`${formId}-age`}>Child&rsquo;s age</label>
            <select
              id={`${formId}-age`}
              name="age"
              defaultValue="2-3"
              required
              aria-invalid={invalid.age || false}
              aria-describedby={invalid.age ? `${formId}-age-error` : undefined}
            >
              <option value="under-2">Under 2</option>
              <option value="2-3">2&ndash;3 years</option>
              <option value="3-4">3&ndash;4 years</option>
              <option value="4-5">4&ndash;5 years</option>
              <option value="unsure">Not sure yet</option>
            </select>
            {invalid.age ? (
              <p className="form-error" id={`${formId}-age-error`} role="status">
                Please choose an age group.
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor={`${formId}-program`}>Interested program</label>
            <select id={`${formId}-program`} name="program" defaultValue="unsure">
              {programs.map((program) => (
                <option key={program.name} value={program.name}>
                  {program.name}
                </option>
              ))}
              <option value="unsure">Not sure yet</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor={`${formId}-date`}>Preferred visit date</label>
            <input
              id={`${formId}-date`}
              name="date"
              type="date"
              min={TODAY}
            />
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

          {/* There is no backend: this must never claim a real submission. */}
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
