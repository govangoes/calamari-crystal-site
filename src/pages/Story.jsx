import { useEffect } from "react";
import { Link } from "react-router-dom";
import setSEO from "../utils/seo.js";

const chapters = [
  {
    title: "Prologue — The Betrayal",
    summary:
      "A backroom deal strands the duo in a label debt they never signed up for. Instead of folding, they take the pen name GoVanGoes and leak coded demos to the fans that kept them afloat.",
  },
  {
    title: "Act I — Descent to the Trench",
    summary:
      "Pursued by mercenary A&Rs, they flee to the coast. A hurricane shipwreck drags them below the surface, where bioluminescent cephalopods crown them protectors of the Crystal.",
  },
  {
    title: "Act II — Forging the Crystal Armor",
    summary:
      "Forged in volcanic vents, their armor vibrates to the frequency of sub-bass. Every beat unlocks new sonic abilities—glitching vocals, tidal drums, glowing stage design.",
  },
  {
    title: "Act III — Return of the Underdogs",
    summary:
      "Back on land, GoVanGoes turns each live show into a recruitment ritual. Fans receive fragments of the Crystal map hidden in merch, lyrics, and alternate reality puzzles.",
  },
  {
    title: "Epilogue — The Reckoning",
    summary:
      "When the betrayers resurface, the crew is ready. Armed with global allies and lore-rich soundscapes, the Calamari Crystal saga crescendos toward a justice only the depths could author.",
  },
];

const timeline = [
  { year: "2019", milestone: "First guerrilla pier show introduces the Calamari mask and teases hidden coordinates." },
  { year: "2021", milestone: "DIY EP ‘Tide Glass’ hits 500K streams after fans decode a treasure-hunt pre-save." },
  { year: "2023", milestone: "CoralWave partnership launches the interactive ‘Signal Flares’ AR filter." },
  { year: "2024", milestone: "Regional tour support slots evolve into headlining nights across Florida and Georgia." },
  { year: "2025", milestone: "Calamari Crystal album cycle kicks off with immersive listening events and limited relic drops." },
];

export default function Story() {
  useEffect(() => {
    setSEO({
      title: "Story — Calamari Crystal Lore",
      description:
        "Follow the Calamari Crystal saga: betrayal, transformation, and the rise of GoVanGoes as lore-building hip-hop architects.",
      url: "https://govangoes.com/story",
      image: "/og.jpg",
      imageAlt: "Illustration of the Calamari Crystal crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">The Calamari Crystal Chronicle</h1>
        <p className="text-lg text-paperWhite/75">
          Dive beneath the surface to uncover how a pair of Florida misfits turned betrayal into a bioluminescent movement that
          powers every GoVanGoes record, performance, and relic.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <picture>
          <img
            src="/squid_emblem.png"
            alt="Calamari Crystal emblem glowing underwater"
            className="w-full rounded-lg shadow-crystal"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <picture>
          <img
            src="/cloud_gold_logo.png"
            alt="Cloud Gold insignia"
            className="w-full rounded-lg opacity-90"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Lore chapters</h2>
        <div className="space-y-6">
          {chapters.map((chapter) => (
            <article key={chapter.title} className="rounded-xl border border-paperWhite/10 bg-graphite/60 p-6">
              <h3 className="text-xl font-semibold text-paperWhite">{chapter.title}</h3>
              <p className="mt-2 text-paperWhite/80 leading-relaxed">{chapter.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Timeline of the uprising</h2>
        <ol className="space-y-3 border-l border-crystal/40 pl-6">
          {timeline.map((moment) => (
            <li key={moment.year} className="relative">
              <span className="absolute -left-3 mt-1 h-2.5 w-2.5 rounded-full bg-crystal"></span>
              <div className="text-sm uppercase tracking-wide text-crystal/90">{moment.year}</div>
              <p className="text-paperWhite/80 leading-relaxed">{moment.milestone}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 text-paperWhite/80">
        <p>
          Ready for the next chapter? Stream the soundtrack on the <Link className="underline" to="/music">Music</Link> page,
          pick up relics that unlock hidden coordinates in the <Link className="underline" to="/merch">Merch vault</Link>, and
          subscribe to the <Link className="underline" to="/news">News journal</Link> for encoded dispatches from the crew.
        </p>
        <p>
          Promoters and partners can head to <Link className="underline" to="/bookings">Bookings</Link> for stage specs or reach out via the <Link className="underline" to="/contact">Contact</Link> form to collaborate on the next immersive drop.
        </p>
      </section>
    </main>
  );
}
