import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";
import { motion } from "framer-motion";

export default function Story() {
  useEffect(() => {
    setSEO({
      title: "Story — GoVanGoes",
      description: "Dive into the saga: betrayal, treasure, redemption.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/story",
    });
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-8">
      <header>
        <h1 className="text-4xl font-bold">The Calamari Crystal Chronicle</h1>
        <p className="mt-2 text-paperWhite/75">
          Our purple squid rises from betrayal to luminous redemption…
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <picture>
          <source type="image/webp" srcSet="/squid_emblem.webp" />
          <img src="/squid_emblem.png" alt="Squid emblem" className="w-full rounded-lg shadow-crystal" />
        </picture>
        <picture>
          <source type="image/webp" srcSet="/cloud_gold_logo.webp" />
          <img src="/cloud_gold_logo.png" alt="Cloud logo" className="w-full rounded-lg opacity-80" />
        </picture>
      </div>
    </main>
  );
}
