import { useEffect } from "react";
import React from "react";
import setSEO from "../utils/seo.js";

export default function Story() {
  useEffect(() => {
    setSEO({
      title: "The Calamari Crystal Story — GoVanGoes",
      description: "The story behind the Calamari Crystal concept album by GoVanGoes.",
      url: "https://www.govangoes.com/story",
      image: "/og-share.png",
      imageAlt: "GoVanGoes logo: a gold G, V and G in a circle",
      site: "@govangoes",
      author: "GoVanGoes",
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
          <source srcSet="/maskable-icon-512.webp" type="image/webp" />
          <img
            src="/icon-512.png"
            alt="Cloutlandish icon"
            className="w-full rounded-lg shadow-crystal"
            decoding="async"
          />
        </picture>
        <img
          src="/apple-touch-icon.png"
          alt="Cloutlandish icon for Apple devices"
          className="w-full rounded-lg opacity-80"
          decoding="async"
        />
      </div>
    </main>
  );
}
