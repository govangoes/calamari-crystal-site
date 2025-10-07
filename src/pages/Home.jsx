import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import JellyButton from "../components/JellyButton.jsx";
import setSEO from "../utils/seo.js";

const Card = ({ title, body, to }) => (
  <Link className="group rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6" to={to}>
    <h3 className="text-paperWhite font-semibold">{title}</h3>
    <p className="mt-2 text-paperWhite/70">{body}</p>
    <div className="mt-4 text-crystal group-hover:translate-x-0.5 transition">Explore →</div>
  </Link>
);

const testimonials = [
  {
    quote:
      "GoVanGoes turned our festival stage into a sunken cathedral—crowd energy spiked the moment the Crystal intro hit.",
    name: "Tasha V.",
    role: "Founder, Harbor Lights Fest",
  },
  {
    quote:
      "Their world-building hooked our brand team immediately. The interactive lore drop drove 4x our usual engagement.",
    name: "Luis Martinez",
    role: "Director of Brand Partnerships, CoralWave",
  },
];

export default function Home() {
  useEffect(() => {
    setSEO({
      title: "GoVanGoes — Calamari Crystal Saga",
      description:
        "Discover GoVanGoes: a Florida hip-hop duo delivering the Calamari Crystal saga through records, lore, merch, and bookings.",
      url: "https://govangoes.com/",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="bg-ink">
      <Hero />

      <section className="mx-auto max-w-4xl px-4 text-paperWhite/80 space-y-4 leading-relaxed">
        <p>
          The Calamari Crystal chronicles a Monte Cristo revenge tale flipped underwater: two Florida creatives shipwrecked by
          industry politics, resurfacing with luminous armor and a vow to elevate every underdog in their orbit. Each record,
          visual, and live set is another clue in the saga—anchored by razor-sharp bars, orchestral bass, and choreography that
          splashes like neon tidepools.
        </p>
        <p>
          From guerrilla pier shows in St. Augustine to tour support runs in Atlanta and Miami, GoVanGoes builds worlds that fans
          inhabit long after the last encore. Collaborators tap us for boundary-pushing rollouts, while brands lean on our
          narrative studio to launch immersive campaigns. Ready to dive deeper? Chart the lore on our <Link className="underline" to="/story">Story</Link> page, stream the newest
          singles on the <Link className="underline" to="/music">Music</Link> hub, and outfit your crew with limited relics via <Link className="underline" to="/merch">Merch</Link>.
        </p>
      </section>

      {/* Add the JellyButton component here */}
      <section className="mx-auto max-w-6xl px-4 py-8 flex justify-center">
        <JellyButton onClick={() => alert('Hello from the Jelly Button!')}>Try the Jelly Button!</JellyButton>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <Card
          title="Lore: The Squid's Revenge"
          body="Betrayal → Escape → Crystal → Reckoning → Redemption. Dive into the chapters."
          to="/story"
        />
        <Card
          title="Merch: Treasures from the Deep"
          body="Crystal pendants, map lyric posters, and more limited relics."
          to="/merch"
        />
        <Card
          title="Press Kit / EPK"
          body="Bio, live stats, photos, and stage specs for promoters and partners."
          to="/epk"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold text-paperWhite">Trusted by promoters & partners</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="rounded-2xl border border-paperWhite/10 bg-graphite/60 p-6 text-paperWhite/80 shadow-crystal"
            >
              <p className="text-lg leading-relaxed">“{testimonial.quote}”</p>
              <footer className="mt-4 text-sm uppercase tracking-wide text-crystal">
                {testimonial.name} · {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm text-paperWhite/70">
          <Link className="underline" to="/bookings">
            Book GoVanGoes for your stage →
          </Link>
          <Link className="underline" to="/press">
            Download the press kit →
          </Link>
        </div>
      </section>
    </main>
  );
}
