import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function About() {
  useEffect(() => {
    setSEO({
      title: "About — GoVanGoes",
      description: "Wildly Influential. Unapologetically Different. Story and mission.",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">About</h2>
        <p className="lead">Wildly Influential. Unapologetically Different. The GoVanGoes story and mission.</p>
      </div>
    </section>
  );
}
