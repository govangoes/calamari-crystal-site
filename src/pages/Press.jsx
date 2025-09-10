import { useEffect } from "react";
import setSEO from "../utils/seo.js";
import EPKGallery from "../components/EPKGallery.jsx";
import { epkHero, epkPhotos } from "../content/epkPhotos.js";

export default function Press(){
  useEffect(()=>{
    setSEO({
      title: "Press — GoVanGoes",
      description: "Bio, photos, logos, and press contact.",
      url: "https://govangoes.com/press",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  },[]);
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold">{epkHero?.title || 'Press Kit'}</h1>
        {epkHero?.tagline && (
          <p className="mt-2 text-sm uppercase tracking-wide text-crystal">{epkHero.tagline}</p>
        )}
        {epkHero?.blurb && (
          <p className="mt-3 text-ink/80 dark:text-paperWhite/80 max-w-3xl">{epkHero.blurb}</p>
        )}
        <div className="mt-4 flex items-center gap-4">
          <a className="underline" href="/GoVanGoes-OneSheet.pdf" target="_blank" rel="noopener noreferrer">One‑Sheet PDF</a>
          {epkHero?.contactEmail && (
            <a className="underline" href={`mailto:${epkHero.contactEmail}`}>Contact: {epkHero.contactEmail}</a>
          )}
        </div>
      </main>
      <EPKGallery items={epkPhotos} />
    </>
  );
}
