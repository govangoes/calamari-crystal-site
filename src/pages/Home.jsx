import React from "react";
import Hero from "../components/Hero.jsx";
import Listen from "../sections/Listen.jsx";
import Watch from "../sections/Watch.jsx";
import Shop from "../sections/Shop.jsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-inkBlack text-paperWhite">
      <Hero />
      <Listen />
      <Watch />
      <Shop />
    </main>
  );
}
