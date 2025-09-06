import React from "react";

export default function Shop() {
  return (
    <section id="shop" className="section border-t border-paperWhite/10">
      <h2 className="h2">Shop the Drop</h2>
      <p className="lead">Limited colorways • Bundles • Digital kits</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Cloutlandish Hoodie", price: "$79" },
          { name: "Producer-Rapper Template", price: "$97" },
          { name: "SM7B Vocal Chain Presets", price: "$47" },
        ].map((p) => (
          <article key={p.name} className="card">
            <div className="mb-3 h-40 w-full rounded-xl bg-gradient-to-br from-crystalViolet/25 via-inkBlack to-inkBlack"></div>
            <h3 className="font-semibold text-paperWhite">{p.name}</h3>
            <p className="text-sm text-paperWhite/70">{p.price}</p>
            <div className="mt-4">
              <a href="#" className="inline-block rounded-full border border-crystalPink/50 px-4 py-2 text-sm font-semibold text-crystalPink hover:border-crystalPink">
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
