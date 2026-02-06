import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";
import { YouTubeEmbed, SpotifyEmbed } from "../components/Embeds.jsx";
import { YT_VIDEO_ID, SPOTIFY_TYPE, SPOTIFY_ID } from "../content/media.js";

import {
  BOOKING_EMAIL,
  FREE_CREATOR_PACK_URL,
  CREATOR_PACK_URL,
  CUSTOM_AUDIO_MAILTO,
} from "../content/offers.js";

// Upgraded Card:
// - supports internal routes (to="/...")
// - supports external links (href="https://...")
// - customizable CTA label
const Card = ({ title, body, to, href, cta = "Explore →" }) => {
  const isInternal = Boolean(to);
  const Component = isInternal ? Link : "a";

  const props = isInternal
    ? { to }
    : { href, target: "_blank", rel: "noreferrer" };

  return (
    <Component
      {...props}
      className="group block rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6 h-full"
    >
      <h3 className="text-xl text-paperWhite font-semibold group-hover:text-crystal transition-colors">
        {title}
      </h3>
      <p className="mt-3 text-paperWhite/70 leading-relaxed">{body}</p>
      <div className="mt-4 text-sm font-medium text-crystal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        {cta}
      </div>
    </Component>
  );
};

export default function Home() {
  // Use explicit hrefs so multi-word labels never break anchors
  const nav = [
    { label: "Start", href: "#start" },
    { label: "Services", href: "#services" },
    { label: "Music", href: "#music" },
    { label: "Merch", href: "#merch" },
    { label: "Story", href: "#story" },
    { label: "EPK", href: "#epk" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="bg-ink min-h-screen">
      <Hero />

      {/* Quick Nav */}
      <nav className="mx-auto max-w-6xl px-4 py-8 flex flex-wrap gap-3 justify-center md:justify-start">
        {nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="pill hover:bg-crystal/20 transition"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* START HERE: Survival-layer funnel */}
      <Section
        id="start"
        title="Start Here"
        description="Need clean, usable music for your content today? Grab a free sample, upgrade when you're ready, or request something custom."
        contentClassName="grid gap-6 md:grid-cols-3"
      >
        <Card
          title="Free Download: Creator Starter Track"
          body="One loopable background track for videos/streams/podcasts. (Email required at download.)"
          href={FREE_CREATOR_PACK_URL}
          cta="Get it free →"
        />
        <Card
          title="Creator Pack Vol. 1 ($15)"
          body="5 loopable background tracks + simple license. Built for creators."
          href={CREATOR_PACK_URL}
          cta="Buy the pack →"
        />
        <Card
          title="Custom Beat / Podcast Intro"
          body="Tell me the vibe + references. Fast turnaround, clean delivery, revisions."
          href={CUSTOM_AUDIO_MAILTO}
          cta="Request custom audio →"
        />
      </Section>

      {/* SERVICES: make it obvious how to buy */}
      <Section
        id="services"
        title="Services"
        description="Small, fast, creator-first audio offers. Designed to hit $100/month without burnout."
        descriptionClassName="max-w-2xl"
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <h3 className="text-xl text-paperWhite font-semibold">Quick Offers</h3>

          <ul className="mt-4 space-y-2 text-paperWhite/70 leading-relaxed">
            <li>• 30-second loop / background track — $20</li>
            <li>• Podcast intro/outro (15–30 sec) — $25</li>
            <li>• Custom beat (full) — $50+</li>
            <li>• Basic mix cleanup (vocals over beat) — $30+</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={CUSTOM_AUDIO_MAILTO}
              target="_blank"
              rel="noreferrer"
            >
              Book Services →
            </a>
            <Link className="pill" to="/contact">
              Contact Form →
            </Link>
          </div>
        </div>

        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <h3 className="text-xl text-paperWhite font-semibold">
            What to send (so I can deliver fast)
          </h3>

          <ol className="mt-4 space-y-2 text-paperWhite/70 leading-relaxed">
            <li>1) Vibe/genre + 1–2 reference tracks</li>
            <li>2) Length + where it will be used</li>
            <li>3) Deadline + any must-haves (BPM, mood, instruments)</li>
          </ol>

          <p className="mt-4 text-paperWhite/60 text-sm">
            Email:{" "}
            <a className="underline" href={`mailto:${BOOKING_EMAIL}`}>
              {BOOKING_EMAIL}
            </a>
          </p>
        </div>
      </Section>

      {/* (Optional) Keep brand cards lower now */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <Card
          title="Lore: The Squid's Revenge"
          body="Betrayal → Escape → Crystal → Reckoning → Redemption. Dive into the chapters."
          to="/story"
          cta="Read the lore →"
        />
        <Card
          title="Merch: Treasures from the Deep"
          body="Crystal pendants, map lyric posters, and more limited relics."
          to="/merch"
          cta="Shop merch →"
        />
        <Card
          title="Press Kit / EPK"
          body="Bio, live stats, photos, and stage specs for promoters and partners."
          to="/press"
          cta="Open EPK →"
        />
      </section>

      {/* Listen */}
      <Section
        id="music"
        title="Listen"
        description="Dive into the Calamari Crystal era."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
        <SpotifyEmbed
          id={SPOTIFY_ID}
          type={SPOTIFY_TYPE}
          title="Featured Release"
        />
      </Section>

      {/* Merch */}
      <Section
        id="merch"
        title="Merch"
        description="Treasures from the deep—limited runs only."
      >
        <Link className="btn btn-primary" to="/merch">
          Shop the Drop
        </Link>
      </Section>

      {/* Story */}
      <Section
        id="story"
        title="Story"
        description="A Monte Cristo revenge tale remixed undersea. The purple squid rises from betrayal to luminous redemption."
        descriptionClassName="max-w-2xl"
      >
        <Link className="pill" to="/story">
          Read the Chronicle →
        </Link>
      </Section>

      {/* Press / EPK */}
      <Section
        id="epk"
        title="Press Kit"
        description="Bio, live stats, photos, and stage specs."
      >
        <Link className="pill" to="/press">
          Open EPK →
        </Link>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="Contact"
        description="Bookings, partnerships, and press."
        contentClassName="flex gap-3"
      >
        <a className="pill" href={`mailto:${BOOKING_EMAIL}`}>
          {BOOKING_EMAIL}
        </a>
        <Link className="pill" to="/contact">
          Contact Form →
        </Link>
      </Section>
    </main>
  );
}
