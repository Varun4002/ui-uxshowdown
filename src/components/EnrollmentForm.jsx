import { useId } from "react";
import { copy } from "../data/school";

/**
 * Focus reporting drives the owl: `onFieldFocus` receives the field's viewport
 * centre so the mascot can look at it, plus whether the field is marked
 * `data-private` (peekaboo). The rect is read once per focus event — never in a
 * pointer or scroll handler.
 */
export default function EnrollmentForm({
  success,
  onFieldFocus,
  onFieldBlur,
  onSubmitted,
  onReset,
}) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;

  const handleFocus = (event) => {
    const rect = event.target.getBoundingClientRect();
    onFieldFocus(
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      event.target.dataset.private === "true"
    );
  };

  if (success) {
    return (
      <div className="card form form--done" role="status">
        <h3>That&apos;s the whole demo</h3>
        <p>
          The owl confirms the moment it succeeds — but this is a front-end build
          with no backend, so <strong>nothing was sent or stored</strong>.
        </p>
        <button className="btn" type="button" onClick={onReset}>
          Run it again
        </button>
      </div>
    );
  }

  return (
    <form
      className="card form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitted();
      }}
      onBlur={onFieldBlur}
    >
      <h3>Enquire about a place</h3>

      <div className="form__grid">
        <p className="form__field">
          <label htmlFor={id("child")}>Child&apos;s name</label>
          <input
            id={id("child")}
            name="child"
            autoComplete="off"
            required
            onFocus={handleFocus}
          />
        </p>

        <p className="form__field">
          <label htmlFor={id("age")}>Child&apos;s age</label>
          <select
            id={id("age")}
            name="age"
            defaultValue=""
            required
            onFocus={handleFocus}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
          </select>
        </p>

        <p className="form__field">
          <label htmlFor={id("parent")}>Your name</label>
          <input
            id={id("parent")}
            name="parent"
            autoComplete="name"
            required
            onFocus={handleFocus}
          />
        </p>

        <p className="form__field">
          <label htmlFor={id("phone")}>Phone</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            /* Opt-in only: the owl covers its eyes while this is focused. */
            data-private="true"
            onFocus={handleFocus}
          />
        </p>

        <p className="form__field form__field--wide">
          <label htmlFor={id("email")}>Email</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            onFocus={handleFocus}
          />
        </p>
      </div>

      <button className="btn" type="submit">
        Send enquiry
      </button>
      <p className="form__note">{copy.formNote}</p>
    </form>
  );
}
