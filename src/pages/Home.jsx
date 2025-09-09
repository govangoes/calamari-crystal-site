import Hero from "../components/Hero.jsx";
import ListenGrid from "../components/ListenGrid.jsx";
import AboutSection from "../components/AboutSection.jsx";
import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Home() {
  useEffect(() => {
    setSEO({
      title: "GoVanGoes – Wildly Influential. Unapologetically Different.",
      description: "Art that makes noise — bars, showmanship, and a movement you can join.",
      image: "https://govangoes.com/og.jpg",
      url: "https://govangoes.com/",
    });
  }, []);
  return (
    <main>
      <Hero />
      <ListenGrid />
      <AboutSection />
    </main>
  );
}
