import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx"; // Import the new component
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

      {/* Quick Nav - Hidden on mobile, visible on desktop? Up to you. */}
      <nav className="mx-auto max-w-6xl px-4 py-8 flex flex-wrap gap-3 justify-center md:justify-start">
        {['Music', 'Merch', 'Story', 'EPK', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="pill hover:bg-crystal/20 transition">
            {item}
          </a>
        ))}
      </nav>

      {/* Feature Grid */}
      <Section id="features" title="The Chronicles" subtitle="Choose your path through the deep.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            title="Lore: The Squid's Revenge"
            body="Betrayal. Escape. Crystal. Reckoning. Redemption. Dive into the chapters of the saga."
            to="/story"
          />
          <Card
            title="Merch: Relics from the Deep"
            body="Limited edition crystal pendants, map posters, and apparel. Once they're gone, they're gone."
            to="/merch"
          />
          <Card
            title="Press Kit (EPK)"
            body="Official bio, high-res photos, and stage plots for promoters and partners."
            to="/epk"
          />
        </div>
      </Section>

      {/* Listen Section */}
      <Section id="music" title="Listen" subtitle="Dive into the Calamari Crystal era.">
        <div className="grid gap-8 md:grid-cols-2">
          <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
          <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
        </div>
      </Section>

      {/* Merch Section */}
      <Section id="merch" title="Merch" subtitle="Treasures from the deep—limited runs only.">
        <Link className="btn btn-primary inline-flex items-center gap-2" to="/merch">
          <span>Shop the Drop</span>
          <span>→</span>
        </Link>
      </Section>

      {/* Story Section */}
      <Section id="story" title="Story" subtitle="A Monte Cristo revenge tale remixed undersea.">
        <Link className="pill" to="/story">Read the Chronicle →</Link>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact" subtitle="Bookings, partnerships, and press inquiries.">
        <div className="flex flex-col sm:flex-row gap-4">
          <a className="pill text-center" href="mailto:bookings@govangoes.com">bookings@govangoes.com</a>
          <Link className="pill text-center" to="/contact">Use Contact Form →</Link>
        </div>
      </Section>
    </main>
  );
}
