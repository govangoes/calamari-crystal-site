const PRESS_ITEMS = [
  {
    label: "Rap Fiesta",
    href: "https://rapfiesta.com/go-van-goes-unknown-hacker-anthem/",
  },
  {
    label: "Orlando Voyager",
    href: "https://orlandovoyager.com/interview/meet-go-van-goes-of-orlando/",
  },
  {
    label: "Press Kit",
    href: "https://www.govangoes.com/press",
  },
];

export default function AsSeenIn({ className = "" }) {
  const rootClassName = ["as-seen-in", className].filter(Boolean).join(" ");

  return (
    <section className={rootClassName} aria-label="As Seen In">
      <p className="as-seen-in__label">AS SEEN IN</p>
      <ul className="as-seen-in__list">
        {PRESS_ITEMS.map((item) => (
          <li key={item.label}>
            <a className="as-seen-in__item" href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
