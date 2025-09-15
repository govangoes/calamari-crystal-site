import React from "react";

export default function Story() {
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
          <source srcSet="/squid_emblem.webp" type="image/webp" />
          <img src="/squid_emblem.png" alt="Squid emblem" className="w-full rounded-lg shadow-crystal" decoding="async" />
        </picture>
        <picture>
          <source srcSet="/cloud_gold_logo.webp" type="image/webp" />
          <img src="/cloud_gold_logo.png" alt="Cloud logo" className="w-full rounded-lg opacity-80" decoding="async" />
        </picture>
      </div>
    </main>
  );
}
