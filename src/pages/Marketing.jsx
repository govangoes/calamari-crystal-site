import ScrollReveal from "../components/ScrollReveal.jsx";
import { Link } from "react-router-dom";

const timeline = [
  {
    when: "T-4–6 weeks",
    what: "Mystery posts + pre-save incentive + open pre-orders + Treasure Hunt begins.",
  },
  { when: "T-3 weeks", what: "Lead Single #1 + lyric visualizer + polls." },
  { when: "T-2 weeks", what: "Cover + tracklist reveal; optional Single #2." },
  { when: "T-1 week", what: "Daily countdown, AMA ‘Ask the Squid’, rehearsal BTS." },
  {
    when: "Release",
    what: "Album live, premiere, live Q&A in character, secret track to mailing list.",
  },
  { when: "Post-1–4 weeks", what: "Alt videos, fan features, giveaway, pop-up treasure moments." },
];

export default function Marketing() {
  return (
    <section className="space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold">Rollout Strategy</h1>
        <p className="opacity-80">Narrative-first content. High engagement, low overhead.</p>
      </header>

      <ol className="space-y-4">
        {timeline.map((t) => (
          <ScrollReveal key={t.when}>
            <li className="p-5 rounded-lg bg-ink/50 border border-white/10">
              <div className="text-monteGold font-semibold">{t.when}</div>
              <div className="opacity-90">{t.what}</div>
            </li>
          </ScrollReveal>
        ))}
      </ol>

      <div className="text-center">
        <Link
          to="/contact"
          className="px-5 py-3 rounded bg-ultraviolet text-paperWhite hover:opacity-90"
        >
          Book a strategy session →
        </Link>
      </div>
    </section>
  );
}
