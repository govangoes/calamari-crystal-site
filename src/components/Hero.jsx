import React from "react";
import SocialLinks from "./SocialLinks.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-paperWhite/10 bg-inkBlack">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-crystalViolet/35 via-deepViolet/20 to-inkBlack"></div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-paperWhite/60">
          Cloutlandish™ / GoVanGoes
        </p>

        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-tight text-paperWhite sm:text-5xl">
          Wildly influential. Unapologetically different.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-crystalPink via-royalGold to-crystalViolet">
            Art that makes noise.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base text-paperWhite/80">
          Be the Vibe. Be the Voice. Turn the volume into value—bars, showmanship, and a movement you can join.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#listen"
             className="rounded-full bg-royalGold px-5 py-3 text-sm font-semibold text-inkBlack shadow-sm transition hover:scale-[1.02] hover:shadow-md">
            Listen Now
          </a>
          <a href="#watch"
             className="rounded-full border border-paperWhite/20 bg-inkBlack/40 px-5 py-3 text-sm font-semibold text-paperWhite/90 backdrop-blur transition hover:border-royalGold/60">
            Watch a Performance
          </a>
          <a href="#shop"
             className="rounded-full border border-crystalPink/40 bg-inkBlack/40 px-5 py-3 text-sm font-semibold text-crystalPink/90 backdrop-blur transition hover:border-crystalPink hover:text-crystalPink">
            Shop the Drop
          </a>
        </div>

        <SocialLinks className="mt-10 justify-center" />
      </div>
    </section>
  );
}
