import { Link } from "react-router-dom";
import RapMapExplorer from "../components/RapMapExplorer.jsx";
import { rapMapArtists } from "../data/rapMapArtists.js";

export default function Artists() {
  return (
    <main className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-abyssNavy to-ultraviolet"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>
      <section className="mx-auto max-w-6xl px-4 py-16 text-paperWhite">
        <p className="pill border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-paperWhite/80">
          Explore Artists
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          Vocabulary Maps, Artist by Artist
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-paperWhite/80">
          Browse the beta map, inspect artist fingerprints, and jump into Lyrics Lab to analyze
          your own catalog.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/lyrics-lab" className="btn-primary">
            Analyze Your Lyrics
          </Link>
          <Link
            to="/rap-map"
            className="btn border border-white/20 bg-white/5 text-paperWhite hover:border-crystal/60 hover:text-crystal"
          >
            Full Rap Map
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 text-paperWhite">
        <div className="grid gap-6 md:grid-cols-3">
          {rapMapArtists.map((artist) => (
            <article
              key={artist.id}
              className="rounded-2xl border border-white/10 bg-ink/70 p-6 shadow-crystal transition hover:-translate-y-1 hover:border-crystal/60"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-paperWhite/60">
                {artist.role}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-monteGold">{artist.name}</h2>
              <p className="mt-2 text-sm text-paperWhite/70">{artist.summary}</p>
              <Link
                to={`/artists/${artist.id}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-crystal hover:text-monteGold"
              >
                {"View Profile ->"}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <RapMapExplorer
        title="Artist Explorer"
        description="Scan the network for standout vocabularies and compare rhyme signatures. More artists land every week."
      />
    </main>
  );
}
