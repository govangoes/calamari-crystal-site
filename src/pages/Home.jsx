import Hero from "../components/Hero.jsx";
import JellyButton from "../components/JellyButton.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { Link } from "react-router-dom";

const Card = ({ title, body, to }) => (
  <Link className="group rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6" to={to}>
    <h3 className="text-paperWhite font-semibold">{title}</h3>
    <p className="mt-2 text-paperWhite/70">{body}</p>
    <div className="mt-4 text-crystal group-hover:translate-x-0.5 transition">Explore →</div>
  </Link>
);

export default function Home(){
  return (
    <main className="bg-ink">
      <Hero />

      <div className="relative mx-auto max-w-6xl px-4 -mt-16 md:-mt-24">
        <SocialLinks />
      </div>

      {/* Add the JellyButton component here */}
      <section className="mx-auto max-w-6xl px-4 py-8 flex justify-center">
        <JellyButton onClick={() => alert('Hello from the Jelly Button!')}>Try the Jelly Button!</JellyButton>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <Card title="Lore: The Squid's Revenge"
              body="Betrayal → Escape → Crystal → Reckoning → Redemption. Dive into the chapters."
              to="/story" />
        <Card title="Merch: Treasures from the Deep"
              body="Crystal pendants, map lyric posters, and more limited relics."
              to="/merch" />
        <Card title="Press Kit / EPK"
              body="Bio, live stats, photos, and stage specs for promoters and partners."
              to="/epk" />
      </section>
    </main>
  );
}
