import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Terms() {
  useEffect(() => {
    setSEO({
      title: "Terms — GoVanGoes",
      description: "Terms of service and purchase policies.",
      image: "https://govangoes.com/images/og.jpg",
      url: "https://govangoes.com/terms",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Terms of Service</h2>
        <p className="lead">General terms for using this site and purchasing products. Placeholder copy.</p>
      </div>
    </section>
  );
}
