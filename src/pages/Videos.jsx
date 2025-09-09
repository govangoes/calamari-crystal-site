import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Videos() {
  useEffect(() => {
    setSEO({
      title: "Videos — GoVanGoes",
      description: "Music videos, live performances, and BTS footage.",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Videos</h2>
        <p className="lead">
          Coming soon: a curated gallery of music videos, live performances, and behind‑the‑scenes footage.
        </p>
      </div>
    </section>
  );
}
