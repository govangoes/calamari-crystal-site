import { useEffect } from "react";
import setSEO from "../utils/seo.js";
import EPKGallery from "../components/EPKGallery.jsx";

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
        <h1 className="text-3xl font-bold">Press Kit</h1>
        <p className="mt-3 text-ink/70 dark:text-paperWhite/80">Bio, photos, logos, and contact for press inquiries.</p>
        <a className="inline-block mt-4 underline" href="/GoVanGoes-OneSheet.pdf" target="_blank" rel="noopener noreferrer">One‑Sheet PDF</a>
      </main>
      <EPKGallery />
    </>
  );
}
