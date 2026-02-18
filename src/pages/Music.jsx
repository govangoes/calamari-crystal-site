import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Music() {
  useEffect(() => {
    setSEO({
      title: "Music — GoVanGoes",
      description: "Latest singles, EPs, and concept‑album tracks.",
      url: "https://www.govangoes.com/music",
      image: "/og-image.png",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Music</h1>
      <p className="mt-3 text-paperWhite/80">Latest singles, EPs, and concept‑album tracks.</p>
    </main>
  );
}
