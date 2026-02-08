import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Newsletter from "../components/Newsletter.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { Link } from "react-router-dom";
import { YouTubeEmbed, SpotifyEmbed } from "../components/Embeds.jsx";
import { YT_VIDEO_ID, SPOTIFY_TYPE, SPOTIFY_ID } from "../content/media.js";
import { STREAMING_LINKS, MIX_MASTER_FORM_URL, FILE_UPLOAD_URL } from "../content/links.js";
import { merchItems, merchCta } from "../content/merch.js";
import { shows, showsCta } from "../content/shows.js";

import { BOOKING_EMAIL } from "../content/offers.js";

// Upgraded Card:
// - supports internal routes (to="/...")
// - supports external links (href="https://...")
// - customizable CTA label
const Card = ({ title, body, to, href, cta = "Explore →" }) => {
  const isInternal = Boolean(to);
  const Component = isInternal ? Link : "a";

  const props = isInternal ? { to } : { href, target: "_blank", rel: "noreferrer" };

  return (
    <Component
      {...props}
      className="group block rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 hover:bg-graphite/70 transition p-6 h-full"
    >
      <h3 className="text-xl text-paperWhite font-semibold group-hover:text-crystal transition-colors">
        {title}
      </h3>
      <p className="mt-3 text-paperWhite/70 leading-relaxed">{body}</p>
      <div className="mt-4 text-sm font-medium text-crystal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        {cta}
      </div>
    </Component>
  );
};

const formatShowDate = (dateString) => {
  if (!dateString) return "TBA";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "TBA";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ShowRow = ({ date, city, venue, href, status }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl ring-1 ring-paperWhite/10 bg-graphite/40 p-4">
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-paperWhite/50">
        {formatShowDate(date)}
      </div>
      <div className="mt-1 text-lg font-semibold text-paperWhite">{city}</div>
      <div className="text-sm text-paperWhite/60">{venue}</div>
    </div>
    {href ? (
      <a
        className="pill border-crystal/40 text-crystal hover:bg-crystal/10"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {status || "Tickets"}
      </a>
    ) : (
      <span className="pill border-white/15 text-paperWhite/60">Details soon</span>
    )}
  </div>
);

export default function Home() {
  // Use explicit hrefs so multi-word labels never break anchors
  const nav = [
    { label: "Start", href: "#start" },
    { label: "Services", href: "#services" },
    { label: "Drop", href: "#drop" },
    { label: "Music", href: "#music" },
    { label: "Tour", href: "#tour" },
    { label: "Merch", href: "#merch" },
    { label: "Story", href: "#story" },
    { label: "EPK", href: "#epk" },
    { label: "Mailing List", href: "#newsletter" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="bg-ink min-h-screen">
      <Hero />

      {/* Quick Nav */}
      <nav className="mx-auto max-w-6xl px-4 py-8 flex flex-wrap gap-3 justify-center md:justify-start">
        {nav.map((item) => (
          <a key={item.label} href={item.href} className="pill hover:bg-crystal/20 transition">
            {item.label}
          </a>
        ))}
      </nav>

      {/* START HERE: Survival-layer funnel */}
      <Section
        id="start"
        eyebrow="Start"
        title="Start Here"
        description="Two lanes: live bookings and remote vocal mixing/mastering with a guided, artist-first process."
        contentClassName="grid gap-6 md:grid-cols-3"
      >
        <Card
          title="Book Me"
          body="Shows, hosting, and brand events with clear communication from inquiry to showtime."
          to="/bookings"
          cta="Open booking info →"
        />
        <Card
          title="Mix & Master My Vocals"
          body="Tiered mix & master: Basic $79 / Pro $129 / Deluxe $199. Calm process, clear revisions."
          href={MIX_MASTER_FORM_URL}
          cta="Start the form →"
        />
        <Card
          title="Upload Files"
          body="Upload stems, roughs, and references when you're ready."
          href={FILE_UPLOAD_URL}
          cta="Upload files →"
        />
      </Section>

      {/* SERVICES: make it obvious how to buy */}
      <Section
        id="services"
        eyebrow="Mix + Master"
        title="Services"
        description="Remote vocal mixing & mastering with a calm, collaborative process and clear communication."
        descriptionClassName="max-w-2xl"
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <h3 className="text-xl text-paperWhite font-semibold">Mix & Master Services</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.35em] text-paperWhite/50">
            Packages from $79
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 text-paperWhite/80">
            <div className="rounded-lg border border-white/10 bg-ink/40 p-3">
              <div className="text-sm font-semibold text-paperWhite">Basic — $79</div>
              <div className="mt-1 text-xs text-paperWhite/60">
                1 revision · typical 2–4 days
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-ink/40 p-3">
              <div className="text-sm font-semibold text-paperWhite">Pro — $129</div>
              <div className="mt-1 text-xs text-paperWhite/60">
                2 revisions · typical 1–2 days
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-ink/40 p-3">
              <div className="text-sm font-semibold text-paperWhite">Deluxe — $199</div>
              <div className="mt-1 text-xs text-paperWhite/60">
                cleanup/tuning · typical 24–48 hours
              </div>
            </div>
          </div>
          <Link className="mt-3 inline-flex text-xs text-crystal hover:text-monteGold" to="/services">
            See full tiers →
          </Link>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={MIX_MASTER_FORM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Mix & Master My Vocals →
            </a>
            <a className="pill" href={FILE_UPLOAD_URL} target="_blank" rel="noreferrer">
              Upload Files →
            </a>
          </div>
        </div>

        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <h3 className="text-xl text-paperWhite font-semibold">
            What to send (for a smooth, guided start)
          </h3>

          <ol className="mt-4 space-y-2 text-paperWhite/70 leading-relaxed">
            <li>1) Vision notes + 1–2 reference tracks</li>
            <li>2) Vocal stems + beat or instrumental</li>
            <li>3) Deadline + anything you want emphasized</li>
          </ol>

          <p className="mt-4 text-paperWhite/60 text-sm">
            Questions welcome. Email:{" "}
            <a className="underline" href={`mailto:${BOOKING_EMAIL}`}>
              {BOOKING_EMAIL}
            </a>
          </p>
        </div>
      </Section>

      {/* Latest Drop / Capsule */}
      <Section
        id="drop"
        eyebrow="Release"
        title="Latest Drop"
        description="Stream the new chapter and grab the capsule before it disappears."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <p className="pill border-crystal/40 text-crystal">Featured Release</p>
          <h3 className="mt-4 text-2xl font-semibold text-paperWhite">
            Calamari Crystal: Chapter I
          </h3>
          <p className="mt-3 text-paperWhite/70 leading-relaxed">
            Cinematic rap with oceanic menace—built for late-night drives, reels, and chapter-based
            storytelling.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
        </div>

        <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/50 p-6">
          <p className="pill border-monteGold/60 text-monteGold">Merch Capsule</p>
          <h3 className="mt-4 text-2xl font-semibold text-paperWhite">Treasures from the Deep</h3>
          <ul className="mt-4 space-y-2 text-paperWhite/70">
            {merchItems.map((item) => (
              <li key={item.name}>
                • {item.name} — {item.price}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {merchCta ? (
              <a className="btn btn-primary" href={merchCta.href} target="_blank" rel="noreferrer">
                {merchCta.label}
              </a>
            ) : (
              <span className="pill text-paperWhite/60">Drop coming soon</span>
            )}
          </div>
        </div>
      </Section>

      {/* (Optional) Keep brand cards lower now */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-6 md:grid-cols-3">
        <Card
          title="Lore: The Squid's Revenge"
          body="Betrayal → Escape → Crystal → Reckoning → Redemption. Dive into the chapters."
          to="/story"
          cta="Read the lore →"
        />
        <Card
          title="Merch: Treasures from the Deep"
          body="Crystal pendants, map lyric posters, and more limited relics."
          to="/merch"
          cta="Shop merch →"
        />
        <Card
          title="Press Kit / EPK"
          body="Bio, live stats, photos, and stage specs for promoters and partners."
          to="/press"
          cta="Open EPK →"
        />
      </section>

      {/* Listen */}
      <Section
        id="music"
        eyebrow="Music"
        title="Listen"
        description="Dive into the Calamari Crystal era."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <YouTubeEmbed id={YT_VIDEO_ID} title="Featured Performance" />
        <SpotifyEmbed id={SPOTIFY_ID} type={SPOTIFY_TYPE} title="Featured Release" />
        <div className="md:col-span-2 flex flex-wrap gap-3">
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

      {/* Tour Dates */}
      <Section
        id="tour"
        eyebrow="Tour"
        title="Tour Dates"
        description="Catch the live set or pull up to the next pop-up."
      >
        <div className="space-y-4">
          {shows.length ? (
            shows.map((show) => <ShowRow key={`${show.date}-${show.city}`} {...show} />)
          ) : (
            <div className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/40 p-6 text-paperWhite/70">
              No shows announced yet. Join the mailing list for first access.
            </div>
          )}
        </div>
        <div className="mt-6">
          {showsCta ? (
            <a
              className="pill hover:bg-crystal/10"
              href={showsCta.href}
              target="_blank"
              rel="noreferrer"
            >
              {showsCta.label} →
            </a>
          ) : (
            <span className="pill text-paperWhite/60">More dates soon</span>
          )}
        </div>
      </Section>

      {/* Merch */}
      <Section
        id="merch"
        eyebrow="Treasures"
        title="Merch"
        description="Treasures from the deep—limited runs only."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {merchItems.map((item) => (
            <div
              key={item.name}
              className="rounded-xl ring-1 ring-paperWhite/10 bg-graphite/40 p-6"
            >
              <h3 className="text-lg font-semibold text-paperWhite">{item.name}</h3>
              <p className="mt-2 text-paperWhite/70">{item.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-monteGold font-semibold">{item.price}</span>
                {item.href ? (
                  <a
                    className="pill hover:bg-crystal/10"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.status} →
                  </a>
                ) : (
                  <span className="pill text-paperWhite/60">{item.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          {merchCta ? (
            <a className="btn btn-primary" href={merchCta.href} target="_blank" rel="noreferrer">
              {merchCta.label}
            </a>
          ) : (
            <span className="pill text-paperWhite/60">Drop coming soon</span>
          )}
        </div>
      </Section>

      {/* Story */}
      <Section
        id="story"
        eyebrow="Lore"
        title="Story"
        description="A Monte Cristo revenge tale remixed undersea. The purple squid rises from betrayal to luminous redemption."
        descriptionClassName="max-w-2xl"
      >
        <Link className="pill" to="/story">
          Read the Chronicle →
        </Link>
      </Section>

      {/* Press / EPK */}
      <Section
        id="epk"
        eyebrow="Press"
        title="Press Kit"
        description="Bio, live stats, photos, and stage specs."
      >
        <Link className="pill" to="/press">
          Open EPK →
        </Link>
      </Section>

      {/* Newsletter / Social */}
      <Section
        id="newsletter"
        eyebrow="Crew"
        title="Join the Crew"
        description="Drops, shows, and secret lore before the timeline sees it."
        contentClassName="grid gap-6 md:grid-cols-2"
      >
        <Newsletter />
        <div className="rounded-xl border border-white/10 p-6 bg-ink/40 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-paperWhite">Follow + Watch</h3>
            <p className="mt-2 text-sm text-paperWhite/70">
              Short clips, behind-the-scenes, and live announcements.
            </p>
          </div>
          <SocialLinks />
          <div>
            {showsCta ? (
              <a
                className="pill hover:bg-crystal/10"
                href={showsCta.href}
                target="_blank"
                rel="noreferrer"
              >
                Tour updates →
              </a>
            ) : (
              <span className="pill text-paperWhite/60">Tour updates soon</span>
            )}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        eyebrow="Bookings"
        title="Contact"
        description="Bookings, partnerships, and press with clear next steps."
        contentClassName="flex gap-3"
      >
        <a className="pill" href={`mailto:${BOOKING_EMAIL}`}>
          {BOOKING_EMAIL}
        </a>
        <Link className="pill" to="/contact">
          Contact Form →
        </Link>
      </Section>
    </main>
  );
}
