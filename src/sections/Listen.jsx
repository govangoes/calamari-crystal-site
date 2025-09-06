import React from "react";

export default function Listen() {
  return (
    <section id="listen" className="section">
      <h2 className="h2">Listen</h2>
      <p className="lead">
        New music and essentials. Press play, then live it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4,5,6].map((n) => (
          <article key={n} className="card">
            <div className="mb-3 h-40 w-full rounded-xl bg-gradient-to-br from-crystalViolet/25 via-inkBlack to-inkBlack"></div>
            <h3 className="font-semibold text-paperWhite">Track {n}</h3>
            <p className="text-sm text-paperWhite/70">Short description or mood.</p>
            <div className="mt-4">
              <a href="#" className="inline-block rounded-full bg-royalGold px-4 py-2 text-sm font-semibold text-inkBlack hover:scale-[1.02]">
                Play
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
