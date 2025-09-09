import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Privacy() {
  useEffect(() => {
    setSEO({
      title: "Privacy — GoVanGoes",
      description: "Privacy policy and data usage overview.",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Privacy Policy</h2>
        <p className="lead">We respect your privacy. This placeholder page will outline data usage and policies.</p>
      </div>
    </section>
  );
}
