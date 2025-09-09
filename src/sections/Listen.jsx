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
            <div className="mb-3 h-40 w-full rounded-xl" style={{background:"linear-gradient(135deg, rgba(124,77,255,.18), rgba(0,0,0,.12))"}}></div>
            <h3 className="font-semibold">Track {n}</h3>
            <p className="text-sm" style={{opacity:.75}}>Short description or mood.</p>
            <div className="mt-4">
              <a href="#" className="btn-primary">Play</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
