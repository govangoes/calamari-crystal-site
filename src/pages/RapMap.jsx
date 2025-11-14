import ScrollReveal from "../components/ScrollReveal.jsx";

const features = [
  {
    title: "Legendary Lexicons",
    description:
      "Trace lyrical fingerprints from MF DOOM to modern innovators with animated timelines, lexical constellations, and cadence overlays that surface signature flows.",
  },
  {
    title: "Compare Any MC",
    description:
      "Drop in two artists or upload your own bars to instantly see overlap, rarity, rhyme density, and stylistic signatures rendered as responsive visualizations.",
  },
  {
    title: "Community Lab",
    description:
      "Join a cohort of writers and fans trading cipher challenges, rare references, critique circles, and collaborative annotations in real time.",
  },
];

const dataPipeline = [
  {
    stage: "Collect",
    detail:
      "Assemble verified lyric sheets, liner notes, and cultural references from MF DOOM's catalog plus directly influenced artists like Earl Sweatshirt, Homeboy Sandman, and Joey Bada$$.",
  },
  {
    stage: "Transform",
    detail:
      "Tokenize verses, detect syllables, and classify rhyme families while attaching metadata for cadence, BPM, producer credits, and era-specific slang.",
  },
  {
    stage: "Visualize",
    detail:
      "Pipe normalized metrics into the Rap Map canvas—heatmaps, node graphs, and timeline arcs that animate as visitors scrub through decades of influence.",
  },
  {
    stage: "Contribute",
    detail:
      "Beta cohort curators submit new verses, provenance notes, or corrections, and the system queues them for review with transparent audit trails.",
  },
];

const timelineNodes = [
  {
    year: "1999",
    artist: "MF DOOM",
    highlight:
      "Operation: Doomsday establishes dense multisyllabic rhyme webs and comic-book mythos that become the Rap Map's origin point.",
  },
  {
    year: "2010",
    artist: "Earl Sweatshirt",
    highlight:
      "EARL channels DOOM's sardonic imagery—our overlap matrix shows a 42% shared rare-vocabulary pool including culinary metaphors and occult nods.",
  },
  {
    year: "2013",
    artist: "Joey Bada$$",
    highlight:
      "1999 mixtape revives dusty boom-bap cadences; cadence flowlines reveal DOOM-inspired off-kilter bar breaks on tracks like 'Hardknock'.",
  },
  {
    year: "2018",
    artist: "Noname",
    highlight:
      "Room 25 leans into poetic density—syllable heatmaps visualize a pivot toward spoken-word syncopation influenced by DOOM's conversational pacing.",
  },
];

const comparisonMetrics = [
  {
    metric: "Shared Lexicon",
    explanation:
      "Surface top five overlapping phrases, weighted by rarity to spotlight truly distinctive echoes rather than common stop words.",
  },
  {
    metric: "Rhyme Topography",
    explanation:
      "Render rhyme schemes as polar charts, contrasting DOOM's internal stacks with peers' end-bar emphasis for instant stylistic contrast.",
  },
  {
    metric: "Cadence Timeline",
    explanation:
      "Animate bar-level BPM and syllable density to show where artists sprint, breathe, or pivot to spoken cadence.",
  },
  {
    metric: "Cultural References",
    explanation:
      "Tag comic, culinary, and geographic callouts to reveal lineage of deep-cut references traveling across generations.",
  },
];

const communityModules = [
  {
    title: "Cipher Sprints",
    description:
      "Timed writing prompts seeded with DOOM-style constraints—scoreboards highlight inventive multisyllabic flips and thematic twists.",
  },
  {
    title: "Reference Digs",
    description:
      "Collaborative hunts for obscure samples or comic panels; winning entries unlock new map pins and annotated lore cards.",
  },
  {
    title: "Critique Circles",
    description:
      "Live feedback sessions where beta members mark cadence pivots, plot rhyme density, and suggest alternate wordplays.",
  },
  {
    title: "Workshop Vault",
    description:
      "Archive of community-uploaded verses with revision history, AI-generated pronunciation guides, and exportable rhyme reports.",
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
          <div className="rounded-3xl border border-white/10 bg-ink/70 p-8">
            <h2 className="text-2xl font-semibold text-opal">From Dataset to Interactive Atlas</h2>
            <p className="mt-3 text-paperWhite/75">
              Rap Map thrives on trustworthy data. Each verse is sourced, cleaned, enriched, and visualized through a transparent pipeline that empowers researchers, superfans, and emerging MCs alike.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {dataPipeline.map((step) => (
                <div
                  key={step.stage}
                  className="rounded-2xl border border-crystal/20 bg-white/5 p-6 text-left shadow-crystal/40 transition hover:border-crystal/60"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-crystal/70">{step.stage}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paperWhite/80">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
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
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold text-crystal">Example Map: MF DOOM's Influence Constellation</h2>
            <p className="mt-3 max-w-3xl text-paperWhite/75">
              Start the tour in 1999 with Operation: Doomsday. Our prototype influence arc links MF DOOM to a curated roster of lyricists who inherit, mutate, or remix his cadence playbook. Hovering over each node reveals annotated song excerpts, production notes, and evolving slang signatures.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {timelineNodes.map((node) => (
                <div key={node.artist} className="rounded-2xl border border-white/15 bg-ink/60 p-6 shadow-crystal/40">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-opal/80">{node.year}</p>
                    <p className="text-lg font-semibold text-monteGold">{node.artist}</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-paperWhite/80">{node.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-ink/70 p-8 text-paperWhite">
            <h2 className="text-2xl font-semibold text-opal">Comparison Engine Blueprint</h2>
            <p className="mt-3 max-w-3xl text-paperWhite/75">
              Fans can plug in two artists—or even paste their own verse—to receive a cinematic breakdown. These are the core metrics we surface on launch to show how MF DOOM's DNA threads through contemporary catalogs.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {comparisonMetrics.map((metric) => (
                <div
                  key={metric.metric}
                  className="rounded-2xl border border-crystal/20 bg-white/5 p-6 text-left shadow-crystal/40 transition hover:border-crystal/60"
                >
                  <p className="text-lg font-semibold text-monteGold">{metric.metric}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paperWhite/80">{metric.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold text-crystal">Community Lab Modules</h2>
            <p className="mt-3 max-w-3xl text-paperWhite/75">
              Beyond metrics, Rap Map thrives on collective imagination. The Community Lab invites curators, statisticians, and beat makers to co-author experiments that keep the atlas alive.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {communityModules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-white/15 bg-ink/60 p-6 shadow-crystal/40">
                  <p className="text-lg font-semibold text-monteGold">{module.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paperWhite/80">{module.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-3xl border border-crystal/30 bg-gradient-to-br from-ink/80 via-abyssNavy/80 to-ultraviolet/80 p-8 text-center shadow-crystal">
            <h2 className="text-3xl font-black text-crystal">Your Verse, Our Atlas</h2>
            <p className="mt-4 text-paperWhite/80">
              Upload upcoming singles, cipher freestyles, or archival gems. Rap Map translates your language into living data so you can benchmark influence, discover collaborators, and leave breadcrumbs for the next generation.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => window.alert("Lyric uploader coming soon. Thanks for your interest in Rap Map!")}
                className="btn-primary"
              >
                Prepare Your Upload
              </button>
              <a
                className="btn border border-white/20 bg-white/5 text-paperWhite hover:border-crystal/60 hover:text-crystal"
                href="/contact"
              >
                Pitch a Collaboration
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
