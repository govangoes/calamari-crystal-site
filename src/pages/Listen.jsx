import React from "react";
import ListenGrid from "../components/ListenGrid.jsx";

export default function Listen() {
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

