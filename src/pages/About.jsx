import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function About(){
  useEffect(()=>{
    setSEO({
      title: "About — GoVanGoes",
      description: "Wildly Influential. Unapologetically Different. Story and mission.",
      url: "https://govangoes.com/about",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  },[]);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-3 text-paperWhite/80">Wildly Influential. Unapologetically Different. The GoVanGoes story and mission.</p>
    </main>
  );
}

