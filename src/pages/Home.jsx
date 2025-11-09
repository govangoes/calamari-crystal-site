import Hero from "../components/Hero.jsx";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal.jsx";
import { YouTubeEmbed, SpotifyEmbed } from "../components/Embeds.jsx";
import { YT_VIDEO_ID, SPOTIFY_TYPE, SPOTIFY_ID } from "../content/media.js";

const Card = ({ title, body, to }) => (
  <Link
    className="group rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6"
    to={to}
  >
    <h3 className="text-paperWhite font-semibold">{title}</h3>
    <p className="mt-2 text-paperWhite/70">{body}</p>
    <div className="mt-4 text-crystal group-hover:translate-x-0.5 transition">Explore →</div>
  </Link>
);

export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />

      {/* In-page quick nav */}
      <section id="sections" className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-2">
          <a href="#music" className="pill">Listen</a>
          <a href="#merch" className="pill">Merch</a>
          <a href="#story" className="pill">Story</a>
          <a href="#epk" className="pill">Press Kit</a>
          <a href="#contact" className="pill">Contact</a>
        </div>
      </section>

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
      <ScrollReveal className="section mx-auto max-w-6xl px-4" id="music">
        <h2 className="text-2xl font-bold">Listen</h2>
        <p className="mt-2 opacity-80">Dive into the Calamari Crystal era.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
          <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
        </div>
      </ScrollReveal>

      {/* Merch */}
      <ScrollReveal className="section mx-auto max-w-6xl px-4" id="merch">
        <h2 className="text-2xl font-bold">Merch</h2>
        <p className="mt-2 opacity-80">Treasures from the deep—limited runs only.</p>
        <div className="mt-6">
          <Link className="btn btn-primary" to="/merch">Shop the Drop</Link>
        </div>
      </ScrollReveal>

      {/* Story */}
      <ScrollReveal className="section mx-auto max-w-6xl px-4" id="story">
        <h2 className="text-2xl font-bold">Story</h2>
        <p className="mt-2 opacity-80 max-w-2xl">A Monte Cristo revenge tale remixed undersea. The purple squid rises from betrayal to luminous redemption.</p>
        <div className="mt-6">
          <Link className="pill" to="/story">Read the Chronicle →</Link>
        </div>
      </ScrollReveal>

      {/* Press / EPK */}
      <ScrollReveal className="section mx-auto max-w-6xl px-4" id="epk">
        <h2 className="text-2xl font-bold">Press Kit</h2>
        <p className="mt-2 opacity-80">Bio, live stats, photos, and stage specs.</p>
        <div className="mt-6">
          <Link className="pill" to="/press">Open EPK →</Link>
        </div>
      </ScrollReveal>

      {/* Contact */}
      <ScrollReveal className="section mx-auto max-w-6xl px-4" id="contact">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2 opacity-80">Bookings, partnerships, and press.</p>
        <div className="mt-6 flex gap-3">
          <a className="pill" href="mailto:bookings@govangoes.com">bookings@govangoes.com</a>
          <Link className="pill" to="/contact">Contact Form →</Link>
        </div>
      </ScrollReveal>
    </main>
  );
}
