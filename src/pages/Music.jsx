import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Music() {
  useEffect(() => {
    setSEO({
      title: "Music — GoVanGoes",
      description: "Latest singles, EPs, and concept‑album tracks.",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Music</h2>
        <p className="lead">Latest singles, EPs, and concept-album tracks.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="0,60">
          {["Crystal Tide", "Neon Current", "Violet Bloom"].map((name) => (
            <article key={name} className="card p-5" data-reveal>
              <div className="mb-3 h-40 w-full rounded-xl bg-hero-gradient"></div>
              <h3 className="font-semibold">{name}</h3>
              <a className="pill mt-2" href="#">Play</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
