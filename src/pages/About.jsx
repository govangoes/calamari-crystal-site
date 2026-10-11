import { useEffect } from "react";
import { Link } from "react-router-dom";
import { APPLE_MUSIC_URL, PRESS_FEATURE_LINKS } from "../content/links.js";
import { BRAND } from "../content/services.js";
import setSEO from "../utils/seo.js";
import CrystalCard from "../components/ui/CrystalCard.jsx";
import GhostButton from "../components/ui/GhostButton.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";

// Only facts GoVanGoes has shared himself. Add to this list as new milestones happen.
const HIGHLIGHTS = [
  "About 18 years of performing as a rapper",
  "Top 3 at the Coast 2 Coast Showcase in Philadelphia",
  "Featured in Rap Fiesta and Orlando Voyager",
  "Produces his own beats and records and mixes his own vocals at home",
];

export default function About() {
  useEffect(() => {
    setSEO({
      title: "About — GoVanGoes Creative",
      description:
        "GoVanGoes is a rapper, producer, and engineer in Oviedo, FL, and the artist behind GoVanGoes Creative.",
      url: "https://www.govangoes.com/about",
      image: "/icon-192.png",
      imageAlt: "GoVanGoes icon",
      site: "@govangoes",
      author: "GoVanGoes",
    });
  }, []);

  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-16">
      <SectionHeader
        eyebrow={`${BRAND.artist} · ${BRAND.location}`}
        titleAs="h1"
        title="Wildly Influential. Unapologetically Different."
        subtitle="Rapper, producer, and engineer based in Oviedo, Florida."
      />

      <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
        <p>
          GoVanGoes is the artist. GoVanGoes Creative is the company that brings that same standard
          to other people&rsquo;s projects and events: live performance and hosting, mixing and
          mastering, and studio guidance.
        </p>
        <p>
          The music comes first. Performing, writing, producing, and engineering are how I learned
          what makes a record, or a room, work. That&rsquo;s the experience behind every service on
          this site.
        </p>
      </div>

      <section aria-labelledby="highlights-heading" className="space-y-4">
        <h2 id="highlights-heading" className="text-xl font-semibold text-paperWhite">
          The short version
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>
              <CrystalCard variant="outline" className="h-full p-4 text-sm text-paperWhite/90">
                {item}
              </CrystalCard>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="listen-heading" className="space-y-4">
        <h2 id="listen-heading" className="text-xl font-semibold text-paperWhite">
          Hear it and read about it
        </h2>
        <div className="flex flex-wrap gap-3">
          <a className="pill" href={APPLE_MUSIC_URL} target="_blank" rel="noreferrer">
            Apple Music
          </a>
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
          <Link className="pill" to="/press">
            Press kit
          </Link>
        </div>
      </section>

      <div className="flex flex-wrap gap-4">
        <GhostButton as={Link} to="/services">
          See services
        </GhostButton>
        <GhostButton as={Link} to="/bookings">
          Book a date
        </GhostButton>
      </div>
    </main>
  );
}
