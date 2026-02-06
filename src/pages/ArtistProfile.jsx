import { Link, useParams } from "react-router-dom";
import analyzeLyrics from "../utils/lyricsAnalysis.js";
import MetricBar from "../components/MetricBar.jsx";
import { getArtistById } from "../data/rapMapArtists.js";

export default function ArtistProfile() {
  const { id } = useParams();
  const artist = getArtistById(id);

  if (!artist) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-paperWhite">
        <h1 className="text-3xl font-bold">Artist Not Found</h1>
        <p className="mt-3 text-paperWhite/70">
          This profile is still loading into the Rap Map archive.
        </p>
        <Link to="/artists" className="mt-6 inline-flex text-crystal hover:text-monteGold">
          {"Back to Artists ->"}
        </Link>
      </main>
    );
  }

  const lyricsSeed = artist.bars.join("\n");
  const analysis = analyzeLyrics(lyricsSeed);

  return (
    <main className="relative overflow-hidden text-paperWhite">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-abyssNavy to-ultraviolet"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="pill border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-paperWhite/80">
          Rap Map Artist
        </p>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">{artist.name}</h1>
            <p className="mt-2 text-lg text-paperWhite/70">
              {artist.role} - {artist.alias}
            </p>
            <p className="mt-4 max-w-2xl text-paperWhite/75">{artist.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/upload" className="btn-primary">
              Upload Lyrics
            </Link>
            <Link
              to="/artists"
              className="btn border border-white/20 bg-white/5 text-paperWhite hover:border-crystal/60 hover:text-crystal"
            >
              Back to Artists
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <h2 className="text-xl font-semibold text-crystal">Profile Snapshot</h2>
          <div className="mt-4 grid gap-3 text-sm text-paperWhite/80">
            <div className="flex items-center justify-between">
              <span>Era</span>
              <span>{artist.era}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Origin</span>
              <span>{artist.origin}</span>
            </div>
            {artist.metrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span>{metric.label}</span>
                <span>{metric.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {artist.highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-paperWhite/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <h2 className="text-xl font-semibold text-opal">Rap Map Score (Preview)</h2>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-paperWhite/70">Score</span>
            <span className="text-3xl font-semibold text-paperWhite">
              {Math.round(analysis.overallScore)}
            </span>
          </div>
          <p className="mt-2 text-xs text-paperWhite/60">
            Based on sample bars. Upload full lyrics for accurate stats.
          </p>
          <div className="mt-6 space-y-4">
            <MetricBar
              label="Lexical diversity"
              value={analysis.lexicalDiversity.toFixed(3)}
              score={analysis.lexicalDiversityScore}
            />
            <MetricBar
              label="Rhyme density"
              value={analysis.rhymeDensity.toFixed(3)}
              score={analysis.rhymeDensityScore}
            />
            <MetricBar
              label="Internal rhyme ratio"
              value={analysis.internalRhymeRatio.toFixed(3)}
              score={analysis.internalRhymeScore}
            />
            <MetricBar
              label="Phrase rarity (local)"
              value={analysis.phraseRarity.toFixed(2)}
              score={analysis.phraseRarityScore}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <h2 className="text-lg font-semibold text-monteGold">Signature Bars</h2>
          <ul className="mt-4 space-y-2 text-sm text-paperWhite/80">
            {artist.bars.map((bar) => (
              <li key={bar} className="rounded-lg bg-black/40 px-3 py-2">
                "{bar}"
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <h2 className="text-lg font-semibold text-crystal">Top Phrase Loops</h2>
          <ul className="mt-4 space-y-2 text-sm text-paperWhite/80">
            {analysis.topPhrases.length === 0 && <li>No phrases yet.</li>}
            {analysis.topPhrases.map((item) => (
              <li
                key={item.phrase}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2"
              >
                <span>{item.phrase}</span>
                <span className="text-paperWhite/50">{item.count}x</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
