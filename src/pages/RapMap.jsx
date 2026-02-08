import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal.jsx";
import RapMapExplorer from "../components/RapMapExplorer.jsx";
import GhostButton from "../components/ui/GhostButton.jsx";
import CrystalBadge from "../components/ui/CrystalBadge.jsx";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import Hairline from "../components/ui/Hairline.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";

const features = [
  {
    title: "Legendary Lexicons",
    description:
      "Trace lyrical fingerprints from MF DOOM to modern innovators with animated timelines and vocabulary heatmaps.",
  },
  {
    title: "Compare Any MC",
    description:
      "Drop in two artists or upload your own bars to instantly see overlap, rarity, and signature phrases side by side.",
  },
  {
    title: "Community Lab",
    description:
      "Join a cohort of writers and fans trading cipher challenges, rare references, and critique circles in real time.",
  },
];

const rapMapFeatureCards = [
  {
    title: "Interactive Map",
    description: "Visualize artists by unique word usage and explore influence links.",
    to: "/artists",
    cta: "Explore ->",
  },
  {
    title: "Upload Lyrics",
    description: "Analyze your own catalog and see how your vocabulary stacks up.",
    to: "/upload",
    cta: "Analyze ->",
  },
  {
    title: "Compare Artists",
    description: "Side-by-side vocab stats, rhyme density, and phrase rarity.",
    cta: "Coming soon",
  },
];

export default function RapMap() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-abyssNavy to-ultraviolet"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-8 px-4 py-24 text-center text-paperWhite">
        <CrystalBadge variant="pill" className="border-white/20 bg-white/10 text-paperWhite/80">
          Big Map of Rap
        </CrystalBadge>
        <SectionHeader
          align="center"
          titleAs="h1"
          className="mx-auto max-w-3xl"
          title="Discover the Vocabulary Universe of Hip-Hop"
          subtitle="Rap Map is a living atlas of rhyme--mapping cadences, word choice, and cultural callbacks across eras. We start with MF DOOM and trace the influence through every cipher, so you can study legends or spotlight your own sound."
        />
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <GhostButton as="a" href="#explore">
            Explore the Map
          </GhostButton>
          <GhostButton as={Link} to="/upload">
            Upload Your Lyrics
          </GhostButton>
          <GhostButton as={Link} to="/contact">
            Collaborate with Us
          </GhostButton>
        </div>
        <Hairline className="max-w-2xl" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 text-paperWhite">
        <div className="grid gap-6 md:grid-cols-3">
          {rapMapFeatureCards.map((card) => {
            const Action = card.to ? Link : card.href ? "a" : "span";
            const actionProps = card.to ? { to: card.to } : card.href ? { href: card.href } : {};
            return (
              <ScrollReveal key={card.title}>
                <CrystalCard
                  as="article"
                  variant="glass"
                  className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-crystal/50"
                >
                  <h2 className="text-xl font-semibold text-monteGold">{card.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
                  <Action
                    className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${
                      card.to || card.href
                        ? "text-crystal transition hover:text-monteGold"
                        : "text-paperWhite/40"
                    }`}
                    {...actionProps}
                  >
                    {card.cta}
                  </Action>
                </CrystalCard>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <RapMapExplorer id="explore" />

      <section className="mx-auto max-w-6xl space-y-12 px-4 pb-24 text-paperWhite">
        <ScrollReveal>
          <CrystalCard variant="glass" className="rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-crystal">What the Rap Map Unlocks</h2>
            <p className="mt-3 max-w-3xl text-muted">
              Every data stream feeds into an immersive explorer--from syllable density maps to
              quotable archives. Plug into the ecosystem and uncover patterns that make hip-hop
              history.
            </p>
          </CrystalCard>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <ScrollReveal key={feature.title}>
              <CrystalCard
                as="article"
                variant="solid"
                className="h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-crystal/50"
              >
                <h3 className="text-xl font-semibold text-monteGold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              </CrystalCard>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <CrystalCard variant="solid" className="rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-opal">Beta Cohort Forming Now</h2>
            <p className="mt-3 text-muted">
              We are onboarding curators, statisticians, and producers to shape the platform
              experience. Share your ideas and get early access to tools that make your verses
              shine.
            </p>
            <GhostButton
              as="a"
              className="mt-6"
              href="mailto:hello@govangoes.com?subject=Rap%20Map%20Beta"
            >
              Request Beta Access
            </GhostButton>
          </CrystalCard>
        </ScrollReveal>
      </section>
    </main>
  );
}
