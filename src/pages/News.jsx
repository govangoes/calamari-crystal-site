import { useEffect } from "react";
import { Link } from "react-router-dom";
import setSEO from "../utils/seo.js";

const posts = [
  {
    title: "Calamari Crystal Era Launches",
    date: "2025-05-20",
    summary:
      "Signal Flares is out everywhere with an interactive treasure map drop and limited glow chests for the first 200 fans.",
    cta: { label: "Stream Signal Flares", href: "/music#signal-flares" },
  },
  {
    title: "Summer Tour Routing Announced",
    date: "2025-04-18",
    summary:
      "We’re bringing the underwater cathedral to eight cities across Florida and the Southeast. Promoters can still pitch afterparties.",
    cta: { label: "Request booking info", href: "/bookings" },
  },
  {
    title: "Behind the Scenes: Tide Glass",
    date: "2025-03-02",
    summary:
      "Producer Nova Rae breaks down the synth patches and percussion layers that make Tide Glass shimmer.",
    cta: { label: "Watch the session", href: "/music#studio-session-tide-glass" },
  },
];

export default function News() {
  useEffect(() => {
    setSEO({
      title: "News — GoVanGoes Journal",
      description: "Announcements, tour recaps, and lore dispatches from the Calamari Crystal universe.",
      url: "https://govangoes.com/news",
      image: "/og.jpg",
      imageAlt: "GoVanGoes performing live",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">News / Journal</h1>
        <p className="text-paperWhite/80">
          Release announcements, behind-the-scenes lore, tour recaps, and partner highlights. Subscribe for first access to drops
          and hidden coordinates.
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <article key={post.title} className="space-y-3 rounded-2xl border border-paperWhite/10 bg-graphite/60 p-6 shadow-crystal">
            <div className="text-sm uppercase tracking-wide text-crystal/80">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            <h2 className="text-2xl font-semibold text-paperWhite">{post.title}</h2>
            <p className="text-paperWhite/75 leading-relaxed">{post.summary}</p>
            <Link className="underline" to={post.cta.href}>
              {post.cta.label} →
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-paperWhite/10 bg-ink/50 p-6 text-paperWhite/80">
        <h2 className="text-xl font-semibold text-paperWhite">Get dispatches before they surface</h2>
        <p className="mt-2">
          Join the Calamari Crystal newsletter for exclusive lore clues, pre-sale passwords, and behind-the-scenes drops.
        </p>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          action="https://formsubmit.co/hello@govangoes.com"
          method="POST"
          target="_blank"
        >
          <input type="hidden" name="_subject" value="Newsletter Opt-in" />
          <input
            className="flex-1 rounded border border-paperWhite/15 bg-graphite/70 px-4 py-3"
            type="email"
            name="email"
            placeholder="Email address"
            required
            aria-label="Email address"
          />
          <button className="rounded bg-ultraviolet px-5 py-3 font-semibold text-paperWhite hover:opacity-90" type="submit">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
