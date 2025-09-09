import { useEffect } from "react";
import setSEO from "../utils/seo.js";
import ScrollReveal from "../components/ScrollReveal.jsx";

const items = [
  {
    name: "Glowing Crystal Necklace",
    desc: "UV-reactive pendant—wear a shard of the legend.",
    price: "$35",
  },
  {
    name: "Treasure Map Lyric Poster",
    desc: "Aged parchment design with hidden ciphers & song loci.",
    price: "$20",
  },
  {
    name: "Deluxe Treasure Chest Bundle",
    desc: "Lyric map + necklace + signed note in a mini chest.",
    price: "$120 (limited)",
  },
];

export default function Merch() {
  useEffect(() => {
    setSEO({
      title: "Merch — GoVanGoes",
      description: "Shop the Drop: limited releases and accessories.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/merch",
    });
  }, []);
  return (
    <section className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Relics from the Deep</h1>
        <p className="opacity-80 mt-2">Limited runs. Story-driven. Built for super-fans.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <ScrollReveal key={it.name}>
            <div className="p-6 rounded-xl bg-ink/50 border border-white/10 shadow-crystal">
              <h3 className="font-semibold">{it.name}</h3>
              <p className="opacity-80 mt-2">{it.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold" style={{color:'var(--gold)'}}>{it.price}</span>
                <a className="btn-primary" href="#store">Buy</a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
