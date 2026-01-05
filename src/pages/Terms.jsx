import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Terms() {
  useEffect(() => {
    setSEO({
      title: "Terms — GoVanGoes",
      description: "Terms of service and purchase policies.",
      url: "https://www.govangoes.com/terms",
      image: "/og-image.png",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-3 text-paperWhite/80">
        General terms for using this site and purchasing products. Placeholder copy.
      </p>
    </main>
  );
}
