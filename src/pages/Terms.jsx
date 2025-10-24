import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Terms() {
  useEffect(() => {
    setSEO({
      title: "Terms — GoVanGoes",
      description: "Terms of service and purchase policies.",
      url: "https://govangoes.com/terms",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main id="main" tabIndex="-1" className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-3 text-paperWhite/80">
        General terms for using this site and purchasing products. Placeholder copy.
      </p>
    </main>
  );
}
