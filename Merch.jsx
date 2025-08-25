import React from 'react';

// Merchandise page
// This page showcases concept merchandise ideas described in the marketing
// strategy. Each merch card uses a minimal placeholder image and descriptive
// text. Later you can replace the img src with actual product photos.

const merchItems = [
  {
    title: 'Glowing Crystal Necklace',
    description:
      'A limited‑run pendant inspired by the album’s crystal. Crafted from purple/iridescent quartz, it subtly glows under UV light. Packaged as a Monte Crystal treasure with a tiny tag of the album name.',
  },
  {
    title: 'Purple Squid Plush',
    description:
      'This whimsical plushie brings the Calamari Crystal hero to life. Soft, huggable and perfect for fans who love the playful side of GoVanGoes’ imagery. Ideal for TikTok cameos.',
  },
  {
    title: 'Treasure Map Lyric Book',
    description:
      'A pirate‑style map poster where each song is marked on an illustrated island. Lyrics are scrawled like aged parchment with hidden easter eggs for superfans.',
  },
  {
    title: 'Deluxe Treasure Chest Bundle',
    description:
      'An exclusive fan bundle presented in a small wooden chest. Includes the CD or vinyl, lyric map, a glowing necklace and a handwritten thank‑you scroll.',
  },
  {
    title: 'Crystal Eye Pins & Rings',
    description:
      'Affordable add‑ons: enamel pins or rings featuring the squid’s crystal eye. Perfect for bags, hats or lanyards.',
  },
];

export default function Merch() {
  return (
    <main className="pt-20 pb-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-crystalCyan text-center mb-12">
        Merch &amp; Collectibles
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {merchItems.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl bg-richBlack/40 border border-opalGlow/15 backdrop-blur-md hover:border-crystalCyan/30 transition flex flex-col"
          >
            {/* Placeholder for product image */}
            <div className="h-40 mb-4 rounded-lg bg-gradient-to-br from-crystalCyan/20 to-crystalMagenta/20 flex items-center justify-center">
              <span className="text-opalGlow/70 italic">Image coming soon</span>
            </div>
            <h3 className="text-xl font-bold text-paperWhite mb-2">
              {item.title}
            </h3>
            <p className="text-opalGlow/80 flex-grow">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-opalGlow/70">
        Want to see these become reality? Join the mailing list and be first to know when each item drops.
      </p>
    </main>
  );
}