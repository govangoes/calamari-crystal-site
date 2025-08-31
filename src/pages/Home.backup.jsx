import Hero from "../components/Hero.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <ScrollReveal>
        <section className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-ink/50 border border-white/10">
            <h3 className="font-semibold text-lg">The Legend</h3>
            <p className="opacity-80 mt-2">A purple squid wronged, a crystal found, a reckoning planned.</p>
          </div>
          <div className="p-6 rounded-lg bg-ink/50 border border-white/10">
            <h3 className="font-semibold text-lg">The Sound</h3>
            <p className="opacity-80 mt-2">Hip-hop x EDM x pop x reggae — storytelling and heavy hooks.</p>
          </div>
          <div className="p-6 rounded-lg bg-ink/50 border border-white/10">
            <h3 className="font-semibold text-lg">The Relics</h3>
            <p className="opacity-80 mt-2">Crystal necklaces, lyric maps, and limited treasure bundles.</p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
