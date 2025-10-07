import { useEffect } from "react";
import { Link } from "react-router-dom";
import setSEO from "../utils/seo.js";
import { upsertJSONLD, removeJSONLD } from "../utils/structuredData.js";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const releases = [
  {
    title: "Signal Flares",
    releaseDate: "2025-05-17",
    description: "Lead single from Calamari Crystal—pulsing bass, vow of revenge, choir of sirens.",
    spotify: "https://open.spotify.com/embed/track/5qap5aO4i9A6g7gJ7RVRBA?utm_source=generator",
    apple: "https://music.apple.com/us/album/1440833089",
    tracklist: ["Signal Flares", "Signal Flares (Instrumental)", "Signal Flares (Acapella)"]
  },
  {
    title: "Tide Glass EP",
    releaseDate: "2024-11-01",
    description: "Five-song EP chronicling the dive into the abyss with cinematic interludes.",
    spotify: "https://open.spotify.com/embed/album/4yP0hdKOZPNshxUOjY0cZj?utm_source=generator",
    apple: "https://music.apple.com/us/album/1440833089",
    tracklist: ["Undercurrent", "Pressure Points", "Glowforge", "Harpoon", "Surface Rising"]
  },
];

const performances = [
  {
    title: "Live at Harbor Lights Fest",
    url: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    description: "An 8-minute medley featuring “Signal Flares” and unreleased lore interludes.",
  },
  {
    title: "Studio Session — Tide Glass",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Behind-the-scenes instrumentation breakdown with producer commentary.",
  },
];

export default function Music() {
  useEffect(() => {
    setSEO({
      title: "Music — GoVanGoes",
      description: "Stream the Calamari Crystal saga: new singles, Tide Glass EP, and live performance archives.",
      url: "https://govangoes.com/music",
      image: "/og.jpg",
      imageAlt: "GoVanGoes crest",
      site: "@govangoes",
      author: "GoVanGoes",
    });

    const musicSchema = {
      "@context": "https://schema.org",
      "@graph": releases.map((release) => ({
        "@type": "MusicRelease",
        name: release.title,
        datePublished: release.releaseDate,
        description: release.description,
        url: `https://govangoes.com/music#${slugify(release.title)}`,
        byArtist: {
          "@type": "MusicGroup",
          name: "GoVanGoes",
        },
        track: release.tracklist.map((trackTitle, index) => ({
          "@type": "MusicRecording",
          name: trackTitle,
          position: index + 1,
        })),
      })),
    };
    upsertJSONLD("music-releases", musicSchema);
    return () => removeJSONLD("music-releases");
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 space-y-12">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Music</h1>
        <p className="text-paperWhite/80">
          Latest singles, EPs, and performance archives from the Calamari Crystal universe. Follow along and unlock hidden lore
          in every drop.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-paperWhite">Latest Releases</h2>
        <div className="space-y-10">
          {releases.map((release) => (
            <article
              key={release.title}
              id={slugify(release.title)}
              className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-paperWhite">{release.title}</h3>
                <p className="text-sm uppercase tracking-wide text-crystal/80">
                  Released {new Date(release.releaseDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p className="text-paperWhite/80 leading-relaxed">{release.description}</p>
                <ul className="list-disc pl-5 text-sm text-paperWhite/70">
                  {release.tracklist.map((track) => (
                    <li key={track}>{track}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a className="underline" href={release.spotify} target="_blank" rel="noopener noreferrer">
                    Spotify →
                  </a>
                  <a className="underline" href={release.apple} target="_blank" rel="noopener noreferrer">
                    Apple Music →
                  </a>
                  <Link className="underline" to="/merch">
                    Grab the matching relic →
                  </Link>
                </div>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-paperWhite/10 shadow-crystal">
                <iframe
                  title={`${release.title} streaming player`}
                  src={release.spotify}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="performances" className="space-y-6">
        <h2 className="text-2xl font-semibold text-paperWhite">Performances & Sessions</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {performances.map((performance) => (
            <article key={performance.title} id={slugify(performance.title)} className="space-y-3">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-paperWhite/10 shadow-crystal">
                <iframe
                  title={performance.title}
                  src={performance.url}
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <h3 className="text-lg font-semibold text-paperWhite">{performance.title}</h3>
              <p className="text-sm text-paperWhite/70">{performance.description}</p>
            </article>
          ))}
        </div>
        <p className="text-sm text-paperWhite/60">
          Want the live experience IRL? Head to <Link className="underline" to="/bookings">Bookings</Link> for routing options
          or browse upcoming appearances on our <Link className="underline" to="/news">News</Link> feed.
        </p>
      </section>
    </main>
  );
}

