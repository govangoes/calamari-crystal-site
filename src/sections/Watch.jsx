import React from "react";

export default function Watch() {
  return (
    <section id="watch" className="section">
      <h2 className="h2">Watch</h2>
      <p className="lead">Live clips, performance energy, behind-the-scenes.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map((n) => (
          <article key={n} className="card">
            <div className="mb-3 aspect-video w-full overflow-hidden rounded-xl" style={{background:"rgba(0,0,0,.12)"}}>
              {/* Replace with real iframe/thumb later */}
              <div className="h-full w-full bg-gradient-to-br from-crystalPink/30 to-crystalViolet/30" />
            </div>
            <h3 className="font-semibold">Performance {n}</h3>
            <p className="text-sm" style={{opacity:.75}}>60–120s of pure momentum.</p>
            <div className="mt-4">
              <a href="#" className="pill">Watch</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
