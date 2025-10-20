import Parallax from "./Parallax.jsx";

export default function Hero() {
  const baseName = import.meta.env.VITE_HERO_IMAGE_BASENAME || "transparentcloutlogo";
  const altText = import.meta.env.VITE_HERO_ALT || "GoVanGoes mark";

  function onImgError(e) {
    const src = e?.target?.src || "";
    if (src.includes("transparentcloutlogo") && !e.target.dataset.fallback1) {
      e.target.dataset.fallback1 = "1";
      e.target.src = "/cloud_gold_logo.png";
      return;
    }
    if (src.includes("cloud_gold_logo") && !e.target.dataset.fallback2) {
      e.target.dataset.fallback2 = "1";
      e.target.src = "/squid_emblem.png";
      return;
    }
    // Final fallback already tried
  }
  return (
    <section className="relative overflow-hidden bg-squid-gradient">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
          <Parallax amount={28} className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
            <picture>
              {/* Prefer custom hero image if present */}
              <source srcSet={`/${baseName}.webp`} type="image/webp" />
              {/* Fallback webp */}
              <source srcSet="/cloud_gold_logo.webp" type="image/webp" />
              <img
                src={`/${baseName}.png`}
                alt={altText}
                className="w-full drop-shadow-2xl shadow-crystal mx-auto"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={onImgError}
              />
            </picture>
          </Parallax>
          <div className="w-full sm:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Wildly influential. Unapologetically different.
            </h1>
            <p className="mt-4 text-ink/80 dark:text-paperWhite/80 max-w-2xl mx-auto">
              Presence. Precision. Performance.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full">
              <a className="btn btn-primary w-full sm:w-auto" href="/music">
                Listen Now
              </a>
              <a
                className="btn btn-secondary w-full sm:w-auto"
                href="https://www.youtube.com/@govangoes"
                target="_blank"
                rel="noreferrer"
              >
                Watch a Performance
              </a>
              <a className="btn btn-tertiary w-full sm:w-auto" href="/merch">
                Shop the Drop
              </a>
            </div>
          </div>
        </div>
      </div>
      <a href="#sections" className="scroll-cue" aria-label="Scroll to content">
        <span>Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </a>
    </section>
  );
}
