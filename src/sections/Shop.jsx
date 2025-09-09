import React from "react";

export default function Shop() {
  return (
    <section id="shop" className="section">
      <h2 className="h2">Shop the Drop</h2>
      <p className="lead">Limited colorways • Bundles • Digital kits</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Cloutlandish Hoodie", price: "$79" },
          { name: "Producer-Rapper Template", price: "$97" },
          { name: "SM7B Vocal Chain Presets", price: "$47" },
        ].map((p) => (
          <article key={p.name} className="card">
            <div className="mb-3 h-40 w-full rounded-xl" style={{background:"linear-gradient(135deg, rgba(124,77,255,.18), rgba(0,0,0,.12))"}}></div>
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm" style={{opacity:.75}}>{p.price}</p>
            <div className="mt-4">
              <a href="#" className="pill">
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
