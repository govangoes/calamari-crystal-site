import Parallax from "./Parallax.jsx";

const DEFAULT_HERO_BASENAME = "govangoes-logo";
const FALLBACK_SEQUENCE = ["cloud_gold_logo", "squid_emblem"];

export default function Hero() {
  const baseName = import.meta.env.VITE_HERO_IMAGE_BASENAME || DEFAULT_HERO_BASENAME;
  const fallbackSources = Array.from(
    new Set([baseName, DEFAULT_HERO_BASENAME, ...FALLBACK_SEQUENCE]),
  );
  const altText = import.meta.env.VITE_HERO_ALT || "GoVanGoes mark";

  function onImgError(e) {
    const target = e?.target;
    if (!target) return;
    const currentIndex = Number(target.dataset.fallbackIndex || 0);
    if (currentIndex >= fallbackSources.length - 1) return;
    const nextIndex = currentIndex + 1;
    target.dataset.fallbackIndex = String(nextIndex);
    const nextBase = fallbackSources[nextIndex];
    target.src = `/${nextBase}.png`;
  }
  return (
    <section className="relative overflow-hidden bg-squid-gradient">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center gap-8">
          <Parallax amount={28} className="relative w-full max-w-md md:max-w-lg">
            <picture>
              {/* Prefer custom hero image if present */}
              <source srcSet={`/${baseName}.webp`} type="image/webp" />
              {baseName !== DEFAULT_HERO_BASENAME && (
                <source srcSet={`/${DEFAULT_HERO_BASENAME}.webp`} type="image/webp" />
              )}
              {/* Fallback webp */}
              <source srcSet="/cloud_gold_logo.webp" type="image/webp" />
              <img
                src={`/${fallbackSources[0]}.png`}
                alt={altText}
                className="w-full drop-shadow-2xl shadow-crystal mx-auto"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onError={onImgError}
                data-fallback-index="0"
              />
            </picture>
          </Parallax>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Wildly influential. Unapologetically different.
            </h1>
            <p className="mt-4 text-ink/80 dark:text-paperWhite/80 max-w-2xl mx-auto">
              Presence. Precision. Performance.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
