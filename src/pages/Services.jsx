import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FILE_UPLOAD_URL, PRESS_FEATURE_LINKS } from "../content/links.js";
import { BRAND } from "../content/services.js";
import setSEO from "../utils/seo.js";
import BookingSteps from "../components/BookingSteps.jsx";
import Faq from "../components/Faq.jsx";
import ServiceTierCards from "../components/ServiceTierCards.jsx";
import GhostButton from "../components/ui/GhostButton.jsx";
import PsychedelicButton from "../components/ui/PsychedelicButton.jsx";
import PsychedelicTextureLayer from "../components/ui/PsychedelicTextureLayer.jsx";
import CrystalBadge from "../components/ui/CrystalBadge.jsx";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import Hairline from "../components/ui/Hairline.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";

// Mix & master packages were already public. Prices are unchanged.
const MIX_TIERS = [
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

const ALSO_AVAILABLE = [
  "Custom production built around your cadence and references",
  "Songwriting and co-writing",
  "Artist development roadmap: sound identity, branding, and release strategy",
];

export default function Services() {
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    setSEO({
      title: "Services — GoVanGoes Creative",
      description:
        "Live performance and DJ sets, remote mixing and mastering, and studio consulting from GoVanGoes Creative in Oviedo, FL.",
      url: "https://www.govangoes.com/services",
      image: "/icon-192.png",
      imageAlt: "GoVanGoes icon",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <section className="relative min-h-screen">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 0.6px, transparent 0.6px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-24 px-4 py-20">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow={`${BRAND.company} · ${BRAND.location}`}
            titleAs="h1"
            title="One artist. Three ways to work together."
            subtitle="Live performance and DJ sets, remote mixing and mastering, and studio guidance. Pick what you need and request it in a few minutes. I review every request myself."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <GhostButton as={Link} to="/bookings" className="px-8 py-3 text-lg">
              Book a Date
            </GhostButton>
            <PsychedelicButton as="a" className="px-8 py-3 text-lg" href={`${baseUrl}#mixmaster`}>
              Mix &amp; Master <ArrowRight size={18} />
            </PsychedelicButton>
          </div>
        </header>

        {/* The three tiers, in detail */}
        <div>
          <ServiceTierCards detailed />
        </div>

        {/* How booking works */}
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Booking"
            title="How booking works"
            subtitle="No account and no payment to send a request. You'll know exactly what happens next."
          />
          <BookingSteps />
        </div>

        {/* Mix & master packages */}
        <div id="mix-master-packages">
          <CrystalCard variant="glass" className="relative isolate overflow-hidden p-6 text-left">
            <PsychedelicTextureLayer variant="section" strength="medium" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-paperWhite">Mix &amp; Master Packages</h2>
                <CrystalBadge variant="pill" className="text-paperWhite/75">
                  Packages from $79
                </CrystalBadge>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {MIX_TIERS.map((tier) => (
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
                      <span className="font-semibold text-monteGold">{tier.price}</span>
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
                  Turnaround depends on file quality and the current queue. I&rsquo;ll confirm
                  timing after I review your upload.
                </p>
                <p>Revisions are for notes and tweaks, not a full re-mix from scratch.</p>
                <p>
                  Add-ons: Extra revision $15 · Stems export $25 · Rush (same day) $50 (if
                  available)
                </p>
              </div>
              <Hairline className="my-5" />
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <Link className="pill" to="/#mixmaster">
                  Start a mix
                </Link>
                <span>
                  Have big files?{" "}
                  <a
                    className="text-paperWhite underline"
                    href={FILE_UPLOAD_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Upload them here
                  </a>
                  .
                </span>
              </div>
            </div>
          </CrystalCard>
        </div>

        {/* Also available */}
        <div className="space-y-4">
          <SectionHeader eyebrow="Also available" title="More ways I can help" />
          <ul className="grid gap-3 md:grid-cols-3">
            {ALSO_AVAILABLE.map((item) => (
              <li key={item}>
                <CrystalCard variant="outline" className="h-full p-4 text-sm text-paperWhite/90">
                  {item}
                </CrystalCard>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">
            These are quoted per project. Use the{" "}
            <Link className="text-paperWhite underline" to="/contact">
              contact form
            </Link>{" "}
            and tell me what you have in mind.
          </p>
        </div>

        {/* Who you're working with */}
        <div className="space-y-4">
          <SectionHeader eyebrow="Who you're working with" title="GoVanGoes, artist and engineer" />
          <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
            I&rsquo;m a rapper, producer, and engineer based in Oviedo, Florida. I&rsquo;ve been
            performing for about 18 years, I make my own beats, and I record and mix from my home
            studio. I placed Top 3 at the Coast 2 Coast Showcase in Philadelphia, and my music has
            been featured in Rap Fiesta and Orlando Voyager.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {PRESS_FEATURE_LINKS.filter((link) => !link.href.includes("govangoes.com")).map(
              (link) => (
                <a
                  key={link.label}
                  className="pill"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ),
            )}
            <Link className="pill" to="/about">
              More about me →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <SectionHeader eyebrow="Questions" title="Good to know" />
          <Faq />
        </div>

        {/* CTA */}
        <CrystalCard
          variant="solid"
          className="rounded-3xl border-crystal/30 bg-gradient-to-r from-ultraviolet/28 via-ink/70 to-crystal/14 p-8 text-center md:p-12"
        >
          <h2 className="text-3xl font-bold text-paperWhite">Ready when you are.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Tell me what you need. I keep a focused roster so every project gets real attention.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <GhostButton as={Link} to="/bookings" className="inline-flex items-center gap-2">
              Request a Date <ArrowRight size={20} />
            </GhostButton>
            <GhostButton as={Link} to="/#mixmaster" className="inline-flex items-center gap-2">
              Start a Mix <ArrowRight size={20} />
            </GhostButton>
          </div>
        </CrystalCard>
      </div>
    </section>
  );
}
