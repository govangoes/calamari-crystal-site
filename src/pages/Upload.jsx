import { useEffect } from "react";
import LyricsLabContent from "../components/LyricsLabContent.jsx";
import setSEO from "../utils/seo.js";

export default function Upload() {
  useEffect(() => {
    setSEO({
      title: "Upload Lyrics — Rap Map by GoVanGoes",
      description: "Paste lyrics to get a beta vocabulary score and prep your catalog for Rap Map.",
      url: "https://www.govangoes.com/upload",
      image: "/og-share.png",
      imageAlt: "GoVanGoes logo: a gold G, V and G in a circle",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="bg-ink text-paperWhite">
      <LyricsLabContent
        eyebrow="Artist Upload"
        title="Upload Lyrics"
        subtitle="Paste lyrics to generate a beta vocabulary score and prep your catalog for Rap Map."
      />
    </main>
  );
}
