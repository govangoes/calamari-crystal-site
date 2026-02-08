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
    label: "Press Kit (EPK)",
    href: "https://www.govangoes.com/press",
  },
];

const MICRO_QUOTES = [
  "Praised for sharp enunciation, complex rhyme schemes, and presence. — Rap Fiesta",
  "Background, influences, and vision in a candid artist interview. — Orlando Voyager",
];

export default function AsSeenIn({ className = "" }) {
  const rootClassName = className
    ? `rounded-2xl border border-white/10 bg-ink/30 p-4 sm:p-5 ${className}`
    : "rounded-2xl border border-white/10 bg-ink/30 p-4 sm:p-5";

  return (
    <section className={rootClassName} aria-label="Press credibility links">
      <p className="text-[0.62rem] font-medium uppercase tracking-[0.34em] text-muted">
        As Seen In
      </p>

      <div className="as-seen-scroll mt-3">
        <div className="inline-flex min-w-max items-center gap-3 whitespace-nowrap pr-4">
          {PRESS_ITEMS.map((item, index) => (
            <span key={item.label} className="inline-flex items-center gap-3">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-paperWhite/80 underline decoration-transparent underline-offset-4 transition hover:text-paperWhite hover:decoration-crystal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {item.label}
              </a>
              {index < PRESS_ITEMS.length - 1 && (
                <span aria-hidden="true" className="text-paperWhite/40">
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        {MICRO_QUOTES.map((line) => (
          <p key={line} className="text-xs leading-relaxed text-muted">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
