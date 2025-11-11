import ScrollReveal from "../components/ScrollReveal.jsx";

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

export default function RapMap() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-abyssNavy to-ultraviolet" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>
      <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center gap-8 px-4 py-24 text-center text-paperWhite">
        <p className="pill border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-paperWhite/80">
          Big Map of Rap
        </p>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">
          Discover the Vocabulary Universe of Hip-Hop
        </h1>
        <p className="max-w-2xl text-lg text-paperWhite/80">
          Rap Map is a living atlas of rhyme—mapping cadences, word choice, and cultural callbacks across eras. We start with MF
          DOOM and trace the influence through every cipher, so you can study legends or spotlight your own sound.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => window.alert("Coming soon! We will notify you when Rap Map launches.")}
            className="btn-primary"
          >
            Get Notified
          </button>
          <a
            className="btn border border-white/20 bg-white/5 text-paperWhite hover:border-crystal/60 hover:text-crystal"
            href="/contact"
          >
            Collaborate with Us
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 pb-24 text-paperWhite">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold text-crystal">What the Rap Map Unlocks</h2>
            <p className="mt-3 max-w-3xl text-paperWhite/75">
              Every data stream feeds into an immersive explorer—from syllable density maps to quotable archives. Plug into the
              ecosystem and uncover patterns that make hip-hop history.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <ScrollReveal key={feature.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-ink/60 p-6 shadow-crystal transition hover:-translate-y-1 hover:border-crystal/60">
                <h3 className="text-xl font-semibold text-monteGold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paperWhite/75">{feature.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-ink/70 p-8 text-center shadow-crystal">
            <h2 className="text-2xl font-semibold text-opal">Beta Cohort Forming Now</h2>
            <p className="mt-3 text-paperWhite/75">
              We are onboarding curators, statisticians, and producers to shape the platform experience. Share your ideas and get
              early access to tools that make your verses shine.
            </p>
            <a
              className="mt-6 inline-flex items-center justify-center rounded-full border border-crystal/50 px-6 py-3 text-sm font-semibold text-crystal transition hover:bg-crystal hover:text-ink"
              href="mailto:hello@govangoes.com?subject=Rap%20Map%20Beta"
            >
              Request Beta Access
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
