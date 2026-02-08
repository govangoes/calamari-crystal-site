import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { SpotifyEmbed, YouTubeEmbed } from "../components/Embeds.jsx";
import AsSeenIn from "../components/AsSeenIn.jsx";
import BookingForm from "../components/forms/BookingForm.jsx";
import MixMasterForm from "../components/forms/MixMasterForm.jsx";
import CrystalBadge from "../components/ui/CrystalBadge.jsx";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import Hairline from "../components/ui/Hairline.jsx";
import { CONTACT_EMAIL } from "../content/offers.js";
import { epkPhotos } from "../content/epkPhotos.js";
import {
  HAS_SPOTIFY,
  HAS_YOUTUBE,
  SPOTIFY_ID,
  SPOTIFY_TYPE,
  YT_VIDEO_ID,
} from "../content/media.js";
import { FILE_UPLOAD_URL, STREAMING_LINKS } from "../content/links.js";
import { shows, showsCta } from "../content/shows.js";
import PsychedelicTextureLayer from "../components/ui/PsychedelicTextureLayer.jsx";

const proofItems = ["Apple Music artist profile", "Remote delivery", "Notes welcome"];

const tiers = [
  { name: "Basic", price: "$79", detail: "1 revision • typical 2–4 days" },
  { name: "Pro", price: "$129", detail: "2 revisions • typical 1–2 days" },
  { name: "Deluxe", price: "$199", detail: "cleanup/tuning • typical 24–48 hours" },
];

const resources = [
  {
    title: "Rap Map",
    description:
      "A living atlas of rhyme—track vocabulary patterns, cadence, and influence across eras.",
    to: "/rap-map",
  },
  {
    title: "Open Mics",
    description:
      "Curated Orlando open mics with notes on vibe, crowd, and where to show up prepared.",
    to: "/open-mics",
  },
];

export default function Home() {
  const hasConfirmedShows = Boolean(showsCta) && shows.some((show) => show.href);

  return (
    <main className="min-h-screen bg-ink">
      <Hero />

      <section id="proof" className="relative mx-auto max-w-6xl isolate overflow-hidden px-4 pb-12">
        <PsychedelicTextureLayer variant="section" strength="low" />
        <div className="relative z-[1] space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {proofItems.map((item) => (
              <CrystalBadge key={item} variant="chip">
                {item}
              </CrystalBadge>
            ))}
          </div>
          <Hairline />
          <AsSeenIn className="border-white/15 bg-ink/25" />
        </div>
      </section>

      <Section
        id="mixmaster"
        eyebrow="Mix + Master"
        title="Premium Vocal Mixing & Mastering"
        description="Remote vocal mixing & mastering with clear revisions and a calm, guided process."
        contentClassName="space-y-6"
        withTexture
        textureVariant="section"
        textureStrength="low"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {tiers.map((tier) => (
            <CrystalCard key={tier.name} variant="outline" className="p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-paperWhite">{tier.name}</span>
                <span className="text-sm font-semibold text-monteGold">{tier.price}</span>
              </div>
              <p className="mt-2 text-xs text-muted">{tier.detail}</p>
            </CrystalCard>
          ))}
        </div>

        <MixMasterForm fileUploadUrl={FILE_UPLOAD_URL} />
      </Section>

      <Section
        id="bookings"
        eyebrow="Bookings"
        title="Book Go Van Goes"
        description="Shows, hosting, and brand events with clear communication from inquiry to showtime."
        contentClassName="space-y-4"
        withTexture
        textureVariant="section"
        textureStrength="low"
      >
        <BookingForm />

        <div className="text-xs text-muted">
          {hasConfirmedShows ? (
            <a
              className="transition hover:text-crystal"
              href={showsCta.href}
              target="_blank"
              rel="noreferrer"
            >
              See all dates →
            </a>
          ) : (
            <>
              Shows updating — email{" "}
              <a className="transition hover:text-crystal" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              for dates.
            </>
          )}
        </div>
      </Section>

      <Section
        id="music"
        eyebrow="Music"
        title="Listen"
        description="Dive into the Calamari Crystal era."
        contentClassName="space-y-6"
      >
        {HAS_YOUTUBE ? (
          <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
        ) : HAS_SPOTIFY ? (
          <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
        ) : null}

        <div className="flex flex-wrap gap-3">
          {STREAMING_LINKS.map((link) => (
            <a
              key={link.label}
              className="pill transition hover:bg-crystal/10"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Section>

      <Section
        id="press"
        eyebrow="Press"
        title="Press Kit"
        description="Bio, live stats, photos, and stage specs."
        contentClassName="space-y-6"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {epkPhotos.slice(0, 3).map((photo) => (
            <div
              key={photo.src}
              className="overflow-hidden rounded-2xl border border-white/10 bg-ink/40"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div>
          <Link className="pill" to="/press">
            View Press →
          </Link>
        </div>
      </Section>

      <Section
        id="resources"
        eyebrow="Resources"
        title="Explore the Lab"
        description="Rap Map and Open Mics are here when you need them."
        contentClassName="grid gap-4 md:grid-cols-2"
      >
        {resources.map((resource) => (
          <CrystalCard key={resource.title} variant="solid" className="p-6">
            <h3 className="text-lg font-semibold text-paperWhite">{resource.title}</h3>
            <p className="mt-2 text-sm text-muted">{resource.description}</p>
            <div className="mt-4">
              <Link className="pill" to={resource.to}>
                Open →
              </Link>
            </div>
          </CrystalCard>
        ))}
      </Section>
    </main>
  );
}
