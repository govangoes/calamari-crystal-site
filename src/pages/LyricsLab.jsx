import { useEffect } from "react";
import LyricsLabContent from "../components/LyricsLabContent.jsx";
import setSEO from "../utils/seo.js";

export default function LyricsLab() {
  useEffect(() => {
    setSEO({
      title: "Lyrics Lab — Rap Map by GoVanGoes",
      description: "Rap Map Labs: paste lyrics and see how big your vocabulary is.",
      url: "https://www.govangoes.com/lyrics-lab",
      image: "/og-share.png",
      imageAlt: "GoVanGoes logo: a gold G, V and G in a circle",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="bg-ink text-paperWhite">
      <LyricsLabContent eyebrow="Rap Map Labs" />
    </main>
  );
}
