import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Press() {
  useEffect(() => {
    setSEO({
      title: "Press — GoVanGoes",
      description: "Bio, photos, logos, and press contact.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/press",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Press Kit</h2>
        <p className="lead">Bio, photos, logos, and contact for press inquiries.</p>
        <a className="pill mt-2" href="/GoVanGoes-OneSheet.pdf" target="_blank" rel="noopener noreferrer">One‑Sheet PDF</a>
      </div>
    </section>
  );
}
