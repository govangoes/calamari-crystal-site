import { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Privacy() {
  useEffect(() => {
    setSEO({
      title: "Privacy — GoVanGoes",
      description: "Privacy policy and data usage overview.",
      url: "https://govangoes.com/privacy",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);
  return (
    <main id="main" tabIndex="-1" className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-paperWhite/80">
        We respect your privacy. This placeholder page will outline data usage and policies.
      </p>
    </main>
  );
}
