import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal.jsx";
import setSEO from "../utils/seo.js";
import { upsertJSONLD, removeJSONLD } from "../utils/structuredData.js";

const items = [
  {
    name: "Glowing Crystal Necklace",
    desc: "UV-reactive pendant—wear a shard of the legend.",
    price: "$35",
    material: "Polished stainless steel with UV acrylic inlay",
    availability: "In stock",
    sku: "CRYSTAL-NECKLACE",
  },
  {
    name: "Treasure Map Lyric Poster",
    desc: "Aged parchment design with hidden ciphers & song loci.",
    price: "$20",
    material: '18" x 24" recycled art stock with matte finish',
    availability: "Ships in 3-5 days",
    sku: "MAP-POSTER",
  },
  {
    name: "Deluxe Treasure Chest Bundle",
    desc: "Lyric map + necklace + signed note in a mini chest.",
    price: "$120 (limited)",
    material: "Hand-stained pine chest, engraved brass clasp",
    availability: "Limited run: 50 units",
    sku: "CHEST-BUNDLE",
  },
];

export default function Merch() {
  useEffect(() => {
    setSEO({
      title: "Merch — Calamari Crystal Relics",
      description:
        "Shop immersive GoVanGoes relics: UV-reactive necklaces, ciphered lyric maps, and limited Calamari Crystal bundles.",
      url: "https://govangoes.com/merch",
      image: "/og.jpg",
      imageAlt: "GoVanGoes merch collection",
      site: "@govangoes",
      author: "GoVanGoes",
    });

    const productSchema = {
      "@context": "https://schema.org",
      "@graph": items.map((item) => ({
        "@type": "Product",
        name: item.name,
        description: item.desc,
        sku: item.sku,
        offers: {
          "@type": "Offer",
          price: item.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `https://govangoes.com/merch#${item.sku.toLowerCase()}`,
        },
        material: item.material,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Availability",
            value: item.availability,
          },
        ],
        brand: {
          "@type": "Brand",
          name: "GoVanGoes",
        },
      })),
    };

    upsertJSONLD("merch-products", productSchema);
    return () => removeJSONLD("merch-products");
  }, []);

  return (
    <section className="space-y-10">
      <header className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold">Relics from the Deep</h1>
        <p className="opacity-80 mt-2">
          Limited runs. Story-driven. Built for super-fans hunting the next Calamari Crystal clue.
        </p>
        <p className="text-sm text-paperWhite/60">
          Every purchase includes a scannable glyph unlocking coordinates toward the next <Link className="underline" to="/story">lore chapter</Link> and an invite to the
          <Link className="underline" to="/news"> crew newsletter</Link>.
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <ScrollReveal key={it.name}>
            <article
              id={it.sku.toLowerCase()}
              className="p-6 rounded-xl bg-ink/50 border border-white/10 shadow-crystal space-y-4"
            >
              <header className="space-y-2">
                <h3 className="font-semibold text-xl text-paperWhite">{it.name}</h3>
                <p className="opacity-80">{it.desc}</p>
              </header>
              <dl className="space-y-2 text-sm text-paperWhite/70">
                <div>
                  <dt className="uppercase tracking-wide">Materials</dt>
                  <dd>{it.material}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wide">Availability</dt>
                  <dd>{it.availability}</dd>
                </div>
              </dl>
              <div className="flex items-center justify-between">
                <span className="text-monteGold font-semibold text-lg">{it.price}</span>
                <a className="px-4 py-2 rounded bg-ultraviolet text-paperWhite hover:opacity-90" href="https://shop.govangoes.com" target="_blank" rel="noopener noreferrer">
                  Buy Now
                </a>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
      <div className="rounded-2xl border border-paperWhite/10 bg-graphite/60 p-6 text-paperWhite/80">
        <h2 className="text-xl font-semibold text-paperWhite">Need wholesale or custom drops?</h2>
        <p className="mt-2">
          We collaborate with venues, labels, and brands on exclusive Calamari Crystal runs—from VIP chests to AR-enabled merch
          walls. Tell us about your activation and we’ll craft a relic set that unlocks story moments for your audience.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link className="underline" to="/contact">
            Contact the team →
          </Link>
          <Link className="underline" to="/press">
            Download merch specs →
          </Link>
        </div>
      </div>
    </section>
  );
}
