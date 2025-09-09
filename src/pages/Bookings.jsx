import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";

export default function Bookings() {
  useEffect(() => {
    setSEO({
      title: "Bookings — GoVanGoes",
      description: "Shows, brand events, press, and collaborations.",
    });
  }, []);
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Bookings</h2>
        <p className="lead">For shows, brand events, press, and collaborations.</p>
        <p className="mt-8">Email: hello@govangoes.com</p>
        <a className="pill mt-2" href="/contact">Contact form →</a>
      </div>
    </section>
  );
}
