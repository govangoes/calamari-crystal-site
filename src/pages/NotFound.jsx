import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function NotFound(){
  useEffect(() => {
    setSEO({
      title: "404 — GoVanGoes",
      description: "The current carried this page away.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/404",
    });
  }, []);
  return (
    <section className="min-h-[50vh] grid place-items-center text-center">
      <div>
        <h1 className="text-5xl font-extrabold">404</h1>
        <p className="opacity-80 mt-2">The current carried this page away.</p>
        <a href="/" className="btn-primary" style={{marginTop: '1.5rem', display:'inline-block'}}>Back to shore</a>
      </div>
    </section>
  )
}
