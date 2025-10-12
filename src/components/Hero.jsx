export default function Hero() {
  function onImgError(e) {
    // Fallback to existing emblem if the custom logo is missing
    if (!e.target.dataset.fellBack) {
      e.target.dataset.fellBack = '1';
      e.target.src = '/squid_emblem.png';
    }
  }
  return (
    <section className="relative overflow-hidden bg-squid-gradient">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Wildly influential. Unapologetically different.
            </h1>
            <p className="mt-4 text-ink/80 dark:text-paperWhite/80">
              Presence. Precision. Performance.
            </p>
            <div className="mt-6 flex gap-4">
              <a className="btn btn-primary" href="/music">
                Listen Now
              </a>
              <a
                className="btn btn-secondary"
                href="https://www.youtube.com/@govangoes"
                target="_blank"
                rel="noreferrer"
              >
                Watch a Performance
              </a>
              <a className="btn btn-tertiary" href="/merch">
                Shop the Drop
              </a>
            </div>
          </div>
          <div className="relative">
            <picture>
              {/* Prefer the user-provided transparent clout logo if present */}
              <source srcSet="/transparentcloutlogo.webp" type="image/webp" />
              <source srcSet="/squid_emblem.webp" type="image/webp" />
              <img
                src="/transparentcloutlogo.png"
                alt="GoVanGoes mark"
                className="w-full drop-shadow-2xl shadow-crystal"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={onImgError}
              />
            </picture>
          </div>
        </div>
      </div>
      <a href="#sections" className="scroll-cue" aria-label="Scroll to content">
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  );
}
