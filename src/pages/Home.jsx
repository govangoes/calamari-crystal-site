import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import { SpotifyEmbed, YouTubeEmbed } from "../components/Embeds.jsx";
import { BOOKING_EMAIL } from "../content/offers.js";
import { epkPhotos } from "../content/epkPhotos.js";
import { HAS_SPOTIFY, SPOTIFY_ID, SPOTIFY_TYPE, YT_VIDEO_ID } from "../content/media.js";
import {
  BOOKING_FORM_URL,
  FILE_UPLOAD_URL,
  JOIN_CREW_FORM_URL,
  MIX_MASTER_FORM_URL,
  STREAMING_LINKS,
} from "../content/links.js";
import { shows, showsCta } from "../content/shows.js";
import GhostButton from "../components/ui/GhostButton.jsx";
import PsychedelicButton from "../components/ui/PsychedelicButton.jsx";
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

const bookingTemplate = `Booking inquiry

Event type:
Date & time:
Location:
Set length:
Budget range:
Contact name + phone:
`;

export default function Home() {
  const hasBookingForm = Boolean(BOOKING_FORM_URL);
  const hasJoinCrewForm = Boolean(JOIN_CREW_FORM_URL);
  const hasConfirmedShows = Boolean(showsCta) && shows.some((show) => show.href);

  return (
    <main className="bg-ink min-h-screen">
      <Hero />

      <section id="proof" className="relative mx-auto max-w-6xl isolate overflow-hidden px-4 pb-12">
        <PsychedelicTextureLayer className="opacity-[0.14]" />
        <div className="relative z-[1] flex flex-wrap items-center gap-2 text-xs text-muted">
          {proofItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-crystal/30 bg-crystal/5 px-3 py-1"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <Section
        id="mixmaster"
        eyebrow="Mix + Master"
        title="Premium Vocal Mixing & Mastering"
        description="Remote vocal mixing & mastering with clear revisions and a calm, guided process."
        contentClassName="space-y-6"
        withTexture
        textureClassName="opacity-[0.16]"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-xl border border-white/10 bg-ink/40 p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-paperWhite">{tier.name}</span>
                <span className="text-sm text-monteGold font-semibold">{tier.price}</span>
              </div>
              <p className="mt-2 text-xs text-muted">{tier.detail}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <PsychedelicButton as="a" href={MIX_MASTER_FORM_URL} target="_blank" rel="noreferrer">
            Mix &amp; Master →
          </PsychedelicButton>
          <a className="pill" href={FILE_UPLOAD_URL} target="_blank" rel="noreferrer">
            Upload Files →
          </a>
        </div>
      </Section>

      <Section
        id="bookings"
        eyebrow="Bookings"
        title="Book Go Van Goes"
        description="Shows, hosting, and brand events with clear communication from inquiry to showtime."
        contentClassName="space-y-4"
        withTexture
        textureClassName="opacity-[0.14]"
      >
        {hasBookingForm ? (
          <div className="flex flex-wrap items-center gap-3">
            <GhostButton as="a" href={BOOKING_FORM_URL} target="_blank" rel="noreferrer">
              Booking Inquiry →
            </GhostButton>
            {hasJoinCrewForm && (
              <a
                className="pill border-crystal/40 text-crystal hover:bg-crystal/10"
                href={JOIN_CREW_FORM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the Crew
              </a>
            )}
          </div>
        ) : (
          <>
            <a className="pill" href={`mailto:${BOOKING_EMAIL}`}>
              {BOOKING_EMAIL}
            </a>
            <div className="rounded-xl border border-white/10 bg-ink/40 p-4">
              <div className="text-[10px] uppercase tracking-[0.35em] text-muted">
                Booking inquiry template
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-xs text-muted">
                {bookingTemplate}
              </pre>
            </div>
            {hasJoinCrewForm && (
              <a
                className="inline-flex text-xs text-crystal hover:text-monteGold"
                href={JOIN_CREW_FORM_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the Crew →
              </a>
            )}
          </>
        )}

        <div className="text-xs text-muted">
          {hasConfirmedShows ? (
            <a
              className="hover:text-crystal transition"
              href={showsCta.href}
              target="_blank"
              rel="noreferrer"
            >
              See all dates →
            </a>
          ) : hasJoinCrewForm ? (
            <>
              Shows updating —{" "}
              <a
                className="hover:text-crystal transition"
                href={JOIN_CREW_FORM_URL}
                target="_blank"
                rel="noreferrer"
              >
                join the crew
              </a>{" "}
              for dates.
            </>
          ) : (
            "Shows updating — join the crew for dates."
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
        {HAS_SPOTIFY ? (
          <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
        ) : (
          <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
        )}
        <div className="flex flex-wrap gap-3">
          {STREAMING_LINKS.map((link) => (
            <a
              key={link.label}
              className="pill hover:bg-crystal/10"
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
          <div key={resource.title} className="rounded-2xl border border-white/10 bg-ink/40 p-6">
            <h3 className="text-lg font-semibold text-paperWhite">{resource.title}</h3>
            <p className="mt-2 text-sm text-muted">{resource.description}</p>
            <div className="mt-4">
              <Link className="pill" to={resource.to}>
                Open →
              </Link>
            </div>
          </div>
        ))}
      </Section>
    </main>
  );
}
