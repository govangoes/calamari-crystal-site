import { PRESS_FEATURE_LINKS } from "../content/links.js";

export default function AsSeenIn({ className = "" }) {
  const rootClassName = ["as-seen-in", className].filter(Boolean).join(" ");

  return (
    <section className={rootClassName} aria-label="As Seen In">
      <div className="as-seen-in__row">
        <p className="as-seen-in__label">As seen in</p>
        <ul className="as-seen-in__list">
          {PRESS_FEATURE_LINKS.map((item) => (
            <li key={item.label}>
              <a className="as-seen-in__item" href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="as-seen-in__meta">Press + features • Updated regularly</p>
    </section>
  );
}
