import { Mic, Music, Sliders, PenTool, Speaker, Package, ArrowRight } from "lucide-react";
import { FILE_UPLOAD_URL } from "../content/links.js";
import GhostButton from "../components/ui/GhostButton.jsx";
import PsychedelicButton from "../components/ui/PsychedelicButton.jsx";
import PsychedelicTextureLayer from "../components/ui/PsychedelicTextureLayer.jsx";
import CrystalBadge from "../components/ui/CrystalBadge.jsx";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import Hairline from "../components/ui/Hairline.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";

// Reusable Service Card Component with "Glass" Effect
const ServiceCard = ({ icon: Icon, title, desc, bestFor }) => (
  <CrystalCard
    variant="glass"
    className="group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1"
  >
    <div>
      <div className="w-12 h-12 rounded-lg bg-crystal/20 flex items-center justify-center text-crystal mb-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-paperWhite">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted min-h-[60px]">{desc}</p>

      <div className="mt-4 pt-4 border-t border-white/10">
        <CrystalBadge variant="tag" className="text-crystal">
          Best For
        </CrystalBadge>
        <p className="text-sm text-paperWhite/90 mt-1">{bestFor}</p>
      </div>
    </div>
  </CrystalCard>
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
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full mix-blend-overlay opacity-5"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <SectionHeader
            align="center"
            eyebrow="Services"
            titleAs="h1"
            title="Build Your Sound, With Care."
            subtitle="Mixing, mastering, and artist support with clear communication and a guided process. Your vision leads the decisions, and feedback is always welcome."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GhostButton as="a" className="px-8 py-3 text-lg" href={`${baseUrl}#bookings`}>
              Book Me
            </GhostButton>
            <PsychedelicButton as="a" className="px-8 py-3 text-lg" href={`${baseUrl}#mixmaster`}>
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
          <Hairline className="mx-auto mt-8 max-w-xl" />

          <CrystalCard
            variant="glass"
            className="relative mx-auto mt-10 max-w-4xl isolate overflow-hidden p-6 text-left"
          >
            <PsychedelicTextureLayer variant="section" strength="medium" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-paperWhite">Mix &amp; Master Tiers</h2>
                <CrystalBadge variant="pill" className="text-paperWhite/75">
                  Packages from $79
                </CrystalBadge>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {tiers.map((tier) => (
                  <CrystalCard key={tier.name} variant="outline" className="relative p-5">
                    {tier.popular && (
                      <CrystalBadge
                        variant="tag"
                        className="absolute right-4 top-4 border-crystal/40 bg-crystal/10 text-crystal"
                      >
                        Most Popular
                      </CrystalBadge>
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
                  </CrystalCard>
                ))}
              </div>
              <div className="mt-4 space-y-1 text-xs text-muted">
                <p>
                  Turnaround depends on file quality and the current queue — I&rsquo;ll confirm
                  timing after I review your upload.
                </p>
                <p>Revisions are for notes and tweaks — not a full re-mix from scratch.</p>
              </div>
              <p className="mt-3 text-xs text-muted">
                Add-ons: Extra revision $15 · Stems export $25 · Rush (same day) $50 (if available)
              </p>
            </div>
          </CrystalCard>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>

        {/* CTA Section */}
        <CrystalCard
          variant="solid"
          className="mt-24 rounded-3xl border-crystal/30 bg-gradient-to-r from-ultraviolet/28 via-ink/70 to-crystal/14 p-8 text-center md:p-12"
        >
          <h2 className="text-3xl font-bold text-paperWhite">Ready When You Are.</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted">
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
        </CrystalCard>
      </div>
    </section>
  );
}
