import React, { useEffect } from "react";
import setSEO from "../utils/seo.js";
import ListenGrid from "../components/ListenGrid.jsx";

export default function Listen() {
  useEffect(() => {
    setSEO({
      title: "Listen — GoVanGoes",
      description: "Stream the latest tracks, EPs, and live sessions.",
    });
  }, []);
  return (
    <>
      <section className="section">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="h2">Listen</h2>
          <p className="lead">
            Stream the latest tracks, EPs and live sessions. Keep this feed updated
            with your newest drops.
          </p>
        </div>
      </section>
      <ListenGrid />
    </>
  );
}
