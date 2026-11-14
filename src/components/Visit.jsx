import { addressLines, directionsUrl, school } from "../data/school";

export default function Visit() {
  return (
    <section className="section" id="visit" aria-labelledby="visit-title">
      <div className="shell visit">
        <div>
          <p className="eyebrow">Find us</p>
          <h2 id="visit-title">Wakad, Pimpri-Chinchwad</h2>
          <address className="visit__address">
            {addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <p className="visit__plus">
            Plus code <code>{school.plusCode}</code>
          </p>
          <a
            className="btn btn--teal"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open in Maps
          </a>
        </div>

        <div className="card visit__hours">
          <h3>Opening hours</h3>
          <p className="visit__hours-known">
            Opens {school.hours.known.opens} on {school.hours.known.day}
          </p>
          <p className="visit__muted">
            This is the only hours detail on the listing. Other days are
            unconfirmed — call before travelling.
          </p>
          <p className="visit__muted">
            Phone number not published yet.
          </p>
        </div>
      </div>
    </section>
  );
}
