import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Shop() {
  useEffect(() => {
    setSEO({
      title: "Shop — GoVanGoes",
      description: "Limited drops and exclusive bundles.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/shop",
    });
  }, []);
  const items = [
    { name: "Cloutlandish Hoodie", price: "$79" },
    { name: "Producer‑Rapper Template", price: "$97" },
    { name: "SM7B Vocal Presets", price: "$47" },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Shop</h2>
        <p className="lead">Limited drops and exclusive bundles — rep the movement.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="0,60">
          {items.map((p) => (
            <article key={p.name} className="card p-5" data-reveal>
              <div className="mb-3 h-40 w-full rounded-xl" style={{background:"linear-gradient(135deg, rgba(124,77,255,.18), rgba(0,0,0,.12))"}}></div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm opacity-80">{p.price}</p>
              <div className="mt-4">
                <a href="#" className="pill">View</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
