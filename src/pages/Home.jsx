import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { Link } from "react-router-dom";
import { YouTubeEmbed, SpotifyEmbed } from "../components/Embeds.jsx";
import { YT_VIDEO_ID, SPOTIFY_TYPE, SPOTIFY_ID } from "../content/media.js";

// Keep this Card component local since it's only used here for now
const Card = ({ title, body, to }) => (
  <Link
    className="group block rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6 h-full"
    to={to}
  >
    <h3 className="text-xl text-paperWhite font-semibold group-hover:text-crystal transition-colors">{title}</h3>
    <p className="mt-3 text-paperWhite/70 leading-relaxed">{body}</p>
    <div className="mt-4 text-sm font-medium text-crystal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      Explore →
    </div>
  </Link>
);

export default function Home() {
  return (
    <main className="bg-ink min-h-screen">
      <Hero />

      {/* Quick Nav */}
      <nav className="mx-auto max-w-6xl px-4 py-8 flex flex-wrap gap-3 justify-center md:justify-start">
        {['Music', 'Merch', 'Story', 'EPK', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="pill hover:bg-crystal/20 transition">
            {item}
          </a>
        ))}
      </nav>

      {/* Feature cards */}
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

      {/* Listen */}
      <Section
        id="music"
        title="Listen"
        description="Dive into the Calamari Crystal era."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
        <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
      </Section>

      {/* Merch */}
      <Section
        id="merch"
        title="Merch"
        description="Treasures from the deep—limited runs only."
      >
        <Link className="btn btn-primary" to="/merch">Shop the Drop</Link>
      </Section>

      {/* Story */}
      <Section
        id="story"
        title="Story"
        description="A Monte Cristo revenge tale remixed undersea. The purple squid rises from betrayal to luminous redemption."
        descriptionClassName="max-w-2xl"
      >
        <Link className="pill" to="/story">Read the Chronicle →</Link>
      </Section>

      {/* Press / EPK */}
      <Section
        id="epk"
        title="Press Kit"
        description="Bio, live stats, photos, and stage specs."
      >
        <Link className="pill" to="/press">Open EPK →</Link>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="Contact"
        description="Bookings, partnerships, and press."
        contentClassName="flex gap-3"
      >
        <a className="pill" href="mailto:bookings@govangoes.com">bookings@govangoes.com</a>
        <Link className="pill" to="/contact">Contact Form →</Link>
      </Section>
    </main>
  );
}
