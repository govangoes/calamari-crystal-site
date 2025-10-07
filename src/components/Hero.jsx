import { useEffect, useRef } from "react";

export default function Hero() {
  const heroImageRef = useRef(null);

  useEffect(() => {
    if (heroImageRef.current) {
      heroImageRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-squid-gradient">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Wildly influential. Unapologetically different.
            </h1>
            <p className="mt-4 text-lg text-ink/80 dark:text-paperWhite/80">
              GoVanGoes is the Florida hip-hop duo behind the Calamari Crystal saga—arena-ready hooks, immersive lore, and
              live shows that feel like underwater theater.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a className="btn btn-primary" href="/music">
                Listen Now
              </a>
              <a className="btn btn-secondary" href="/music#performances">
                Watch a Performance
              </a>
              <a className="btn btn-tertiary" href="/merch">
                Shop the Drop
              </a>
            </div>
          </div>
          <div className="relative">
            <picture>
              <source srcSet="/squid_emblem.webp" type="image/webp" />
              <img
                src="/squid_emblem.png"
                alt="Calamari Crystal squid emblem"
                className="w-full drop-shadow-2xl shadow-crystal"
                loading="eager"
                ref={heroImageRef}
                decoding="async"
                width="640"
                height="640"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
