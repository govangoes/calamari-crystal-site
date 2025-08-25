import React from 'react';
import { motion } from 'framer-motion';
// Assets
import squidEmblem from '../assets/squid_emblem.png';
import cloudLogo from '../assets/cloud_gold_logo.png';

/**
 * Story page
 *
 * This component introduces the Calamari Crystal narrative. It explains how
 * GoVanGoes drew inspiration from Alexandre Dumas' classic novel, recasting
 * its themes of betrayal, revenge and redemption into a psychedelic under‑sea
 * fantasy. The page uses the dark, bioluminescent palette defined in the
 * Tailwind config and includes two decorative images imported from the
 * project's assets folder.
 */
export default function Story() {
  return (
    <main className="pt-20 pb-32 px-6 max-w-5xl mx-auto space-y-16">
      {/* Title */}
      <section className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-crystalCyan mb-4">
          An Undersea Epic
        </h2>
        <p className="text-opalGlow md:text-lg max-w-2xl mx-auto">
          Inspired by <em>The Count of Monte Cristo</em>, Calamari Crystal follows a
          wronged squid who discovers a hidden treasure and evolves into a
          mythical avenger. It’s a tale of betrayal, hidden wealth and ultimate
          redemption — all told through GoVanGoes’ signature blend of
          psychedelic metaphors and hip‑hop swagger.
        </p>
      </section>

      {/* Story narrative */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={squidEmblem}
            alt="Purple squid emblem"
            className="w-full rounded-xl shadow-lg border border-crystalMagenta/30"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-paperWhite">Betrayal &amp; Exile</h3>
          <p className="text-opalGlow/80">
            Our story begins in the depths. A brilliant squid — the album’s
            protagonist — is betrayed by those closest to him and cast into a
            dark abyss. There he languishes, plotting his escape while
            bioluminescent creatures whisper secrets of hidden crystals and
            ancient riches.
          </p>
          <h3 className="text-2xl font-bold text-paperWhite">Discovery &amp; Transformation</h3>
          <p className="text-opalGlow/80">
            After a daring escape, the squid discovers the titular Calamari Crystal
            — a glowing gem that grants power and knowledge. Just as Edmond
            Dantès used treasure to become the Count, our squid harnesses the
            crystal to transform into a cunning avenger, ready to right the
            wrongs done to him.
          </p>
          <h3 className="text-2xl font-bold text-paperWhite">Revenge &amp; Redemption</h3>
          <p className="text-opalGlow/80">
            The latter half of the album explores elaborate plans for revenge,
            building to a climax where the squid must choose between vengeance
            and mercy. In true GoVanGoes fashion, the conclusion embraces
            redemption, proving that even in the darkest depths, love and
            forgiveness can shine brighter than any crystal.
          </p>
        </div>
      </section>

      {/* Visual motifs */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 order-2 md:order-1">
          <h3 className="text-2xl font-bold text-paperWhite">Aquatic Mystique</h3>
          <p className="text-opalGlow/80">
            Deep‑sea blues, glowing purples and flashes of gold permeate every
            visual associated with Calamari Crystal. From album art to lyric
            videos, these colours create an other‑worldly ambience that feels
            both vintage and futuristic — like a treasure map drenched in neon
            ink.
          </p>
          <h3 className="text-2xl font-bold text-paperWhite">Symbolism</h3>
          <p className="text-opalGlow/80">
            The squid represents intelligence and adaptability; the crystal
            stands for hidden wealth and enlightenment. Crowns hint at
            royalty and revenge, while swirling clouds recall the chaos of the
            ocean. Keep an eye on these motifs — they tie together every
            merch drop and content release.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={cloudLogo}
            alt="Cloud with crown logo"
            className="w-full rounded-xl shadow-lg border border-crystalMagenta/30"
          />
        </div>
      </section>
    </main>
  );
}