import React from "react";

const tracks = [
  { title: "Crystal Tide", mood: "shimmering, triumphant energy" },
  { title: "Abyss Navigator", mood: "dark, driving, focused" },
  { title: "Gold Signal", mood: "bold, anthemic, confident" },
  { title: "Neon Current", mood: "sleek, kinetic, high-gloss" },
  { title: "Magenta Echo", mood: "moody, spacious, hypnotic" },
  { title: "Violet Bloom", mood: "warm, uplifting, cinematic" },
];

export default function ListenGrid() {
  return (
    <section aria-label="Listen" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="h2">Listen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {tracks.map((t) => (
            <div key={t.title} className="card p-5">
              <h3 className="text-xl font-bold mb-1">{t.title}</h3>
              <p className="text-sm opacity-80 mb-3">{t.mood}</p>
              <button className="btn-primary">Play</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

