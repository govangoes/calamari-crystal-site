import { Mic, Music, Sliders, PenTool, Speaker, Package, ArrowRight } from "lucide-react";
import { FILE_UPLOAD_URL, MIX_MASTER_FORM_URL } from "../content/links.js";
import GhostButton from "../components/ui/GhostButton.jsx";
import PsychedelicButton from "../components/ui/PsychedelicButton.jsx";

// Reusable Service Card Component with "Glass" Effect
const ServiceCard = ({ icon: Icon, title, desc, bestFor }) => (
  <div className="group relative flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
    {/* Glow Effect on Hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-crystal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10">
      <div className="w-12 h-12 rounded-lg bg-crystal/20 flex items-center justify-center text-crystal mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-paperWhite">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted min-h-[60px]">{desc}</p>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs font-semibold text-crystal uppercase tracking-wider">Best For:</p>
        <p className="text-sm text-paperWhite/90 mt-1">{bestFor}</p>
      </div>
    </div>
  </div>
);

export default function Services() {
  const baseUrl = import.meta.env.BASE_URL;
  const services = [
    {
      title: "Mixing & Mastering",
      icon: Sliders,
      desc: "Tiered mix + master options with clear revisions and flexible turnaround.",
      bestFor: "Singles • EPs • Albums",
    },
    {
      title: "Vocal Production",
      icon: Mic,
      desc: "Clean vocals, tight timing, and tasteful polish while keeping the emotion intact.",
      bestFor: "Hooks • Verses • Harmonies",
    },
    {
      title: "Custom Production",
      icon: Music,
      desc: "Original production built around your cadence, story, and references, collaborative from sketch to final bounce.",
      bestFor: "Hip-Hop • R&B • Alternative",
    },
    {
      title: "Songwriting",
      icon: PenTool,
      desc: "Stronger hooks, cleaner verses, better structure. Co-writing available with a clear, discreet process.",
      bestFor: "Artists needing a pen upgrade",
    },
    {
      title: "Studio Design",
      icon: Speaker,
      desc: "Room analysis and treatment guidance so your recordings translate outside the room.",
      bestFor: "Home Studios • Serious Creators",
    },
    {
      title: "Development Packages",
      icon: Package,
      desc: "A focused roadmap: sound identity, branding, release strategy, and content built around your vision.",
      bestFor: "Career Artists",
    },
  ];
  const tiers = [
    {
      name: "Basic",
      price: "$79",
      bullets: ["Mix + master (1 song)", "1 revision", "Typical: 2–4 days (often faster)"],
    },
    {
      name: "Pro",
      price: "$129",
      popular: true,
      bullets: ["Mix + master (1 song)", "2 revisions", "Typical: 1–2 days (priority)"],
    },
    {
      name: "Deluxe",
      price: "$199",
      bullets: [
        "Mix + master (1 song)",
        "Vocal cleanup + light tuning (if needed)",
        "3 revisions · Typical: 24–48 hours",
      ],
    },
  ];

  return (
    <section className="relative min-h-screen">
      {/* Background Ambience (Optional extra texture) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-paperWhite via-crystal to-paperWhite bg-[length:200%_auto] animate-gradient-x">
            Build Your Sound, With Care.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-paperWhite/90">
            Mixing, mastering, and artist support with clear communication and a guided process.
            <br className="hidden md:block" />
            Your vision leads the decisions, and feedback is always welcome.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PsychedelicButton as="a" className="px-8 py-3 text-lg" href={`${baseUrl}#bookings`}>
              Book Me
            </PsychedelicButton>
            <PsychedelicButton
              as="a"
              className="px-8 py-3 text-lg"
              href={MIX_MASTER_FORM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Mix &amp; Master <ArrowRight size={18} />
            </PsychedelicButton>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-muted">
            <span>Step 1: Fill out the form and share your vision</span>
            <span>
              Step 2:{" "}
              <a
                className="underline text-paperWhite"
                href={FILE_UPLOAD_URL}
                target="_blank"
                rel="noreferrer"
              >
                Upload Files
              </a>
            </span>
            <span>Step 3: I&rsquo;ll reply with next steps, timeline, and feedback welcome</span>
          </div>

          <div className="mt-10 mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-paperWhite">Mix &amp; Master Tiers</h2>
              <span className="text-xs uppercase tracking-[0.35em] text-paperWhite/50">
                Packages from $79
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="relative rounded-2xl border border-white/10 bg-ink/50 p-5"
                >
                  {tier.popular && (
                    <span className="absolute right-4 top-4 rounded-full border border-crystal/40 bg-crystal/10 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-crystal">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-paperWhite">{tier.name}</h3>
                    <span className="text-monteGold font-semibold">{tier.price}</span>
                  </div>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
                    {tier.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1 text-xs text-muted">
              <p>
                Turnaround depends on file quality and the current queue — I&rsquo;ll confirm timing
                after I review your upload.
              </p>
              <p>Revisions are for notes and tweaks — not a full re-mix from scratch.</p>
            </div>
            <p className="mt-3 text-xs text-muted">
              Add-ons: Extra revision $15 · Stems export $25 · Rush (same day) $50 (if available)
            </p>
          </div>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-crystal/20 to-purple-900/20 border border-crystal/30 text-center backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-paperWhite">Ready When You Are.</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-paperWhite/90">
            I keep a focused roster so each project gets attention, clarity, and care.
          </p>
          <div className="mt-8">
            <GhostButton
              as="a"
              className="inline-flex items-center gap-2"
              href={`${baseUrl}#bookings`}
            >
              Start Your Project <ArrowRight size={20} />
            </GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}
