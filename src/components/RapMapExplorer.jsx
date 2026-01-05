import { useMemo, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal.jsx";

const rapMapArtists = [
  {
    id: "mfdoom",
    name: "MF DOOM",
    alias: "Metal Face",
    origin: "London -> NYC",
    era: "1999-2010s",
    role: "Villain Architect",
    summary:
      "Masked icon whose multi-layered rhyme schemes, aliases, and comic-book mythology shaped the underground renaissance.",
    highlights: ["Dense internal rhymes", "Alter egos & lore", "Off-kilter cadence"],
    bars: [
      "No gimmicks, no masks -- just raw craft.",
      "Villainy with a velvet tongue and crooked smile.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.2k" },
      { label: "Lexical density", value: "0.71" },
      { label: "Influence index", value: "92" },
    ],
    x: 22,
    y: 58,
  },
  {
    id: "nas",
    name: "Nas",
    alias: "Nasty",
    origin: "Queens, NYC",
    era: "1994-present",
    role: "Street Laureate",
    summary:
      "Storytelling architect with vivid cityscapes, tight cadence control, and a deep catalog of narrative detail.",
    highlights: ["Narrative detail", "Street reportage", "Legacy catalog"],
    bars: [
      "City lights cut through the haze, pen on parade.",
      "Stories stitched in neon, truth in every page.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.8k" },
      { label: "Lexical density", value: "0.69" },
      { label: "Influence index", value: "88" },
    ],
    x: 38,
    y: 34,
  },
  {
    id: "outkast",
    name: "OutKast",
    alias: "ATLiens",
    origin: "Atlanta, GA",
    era: "1994-2010s",
    role: "Futurist Duo",
    summary:
      "Genre-hopping storytellers blending Southern funk, sci-fi motifs, and wildword cadences.",
    highlights: ["Southern surrealism", "Experimental hooks", "Double-vision flows"],
    bars: [
      "Basslines in orbit, two voices in flight.",
      "Southern constellations, rhyme into the night.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "6.5k" },
      { label: "Lexical density", value: "0.67" },
      { label: "Influence index", value: "85" },
    ],
    x: 58,
    y: 24,
  },
  {
    id: "lauryn",
    name: "Lauryn Hill",
    alias: "L-Boogie",
    origin: "South Orange, NJ",
    era: "1996-present",
    role: "Soul Scribe",
    summary:
      "Singer-rapper with razor-sharp delivery, spiritual depth, and timeless cultural impact.",
    highlights: ["Soulful cadence", "Moral clarity", "Hybrid vocal flow"],
    bars: [
      "Harmony in the syllables, truth on the tongue.",
      "Grace in the cadence, the sermon gets sung.",
    ],
    metrics: [
      { label: "Unique words (beta)", value: "5.4k" },
      { label: "Lexical density", value: "0.73" },
      { label: "Influence index", value: "90" },
    ],
    x: 64,
    y: 64,
  },
  {
    id: "kendrick",
    name: "Kendrick Lamar",
    alias: "K-Dot",
    origin: "Compton, CA",
    era: "2010-present",
    role: "Modern Oracle",
    summary:
      "Concept-driven lyricist weaving personal narrative, social critique, and razor-sharp rhyme pockets.",
    highlights: ["Concept albums", "Character voices", "Social commentary"],
    bars: ["Mirror talk, city lights, verses in the vault.", "Truth in the cadence, every beat a pulse."],
    metrics: [
      { label: "Unique words (beta)", value: "7.1k" },
      { label: "Lexical density", value: "0.74" },
      { label: "Influence index", value: "94" },
    ],
    x: 78,
    y: 44,
  },
];

const rapMapEdges = [
  { from: "mfdoom", to: "kendrick", strength: "influence" },
  { from: "nas", to: "kendrick", strength: "narrative" },
  { from: "outkast", to: "kendrick", strength: "experimentation" },
  { from: "lauryn", to: "kendrick", strength: "soulcraft" },
  { from: "nas", to: "mfdoom", strength: "lyricism" },
];

const clampScale = (value) => Math.min(2.2, Math.max(0.7, value));

export default function RapMapExplorer({
  id,
  title = "Rap Map Explorer (Beta)",
  description = "Click a node to inspect an artist's footprint. We're seeding the atlas with MF DOOM, then expanding outward as the map grows.",
}) {
  const [selectedId, setSelectedId] = useState(rapMapArtists[0]?.id);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const panRef = useRef(null);

  const artistMap = useMemo(
    () => new Map(rapMapArtists.map((artist) => [artist.id, artist])),
    []
  );
  const selectedArtist =
    rapMapArtists.find((artist) => artist.id === selectedId) ?? rapMapArtists[0];

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    panRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: transform.x,
      originY: transform.y,
    };
  };

  const handlePointerMove = (event) => {
    if (!panRef.current) return;
    const { startX, startY, originX, originY } = panRef.current;
    setTransform((prev) => ({
      ...prev,
      x: originX + (event.clientX - startX),
      y: originY + (event.clientY - startY),
    }));
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    panRef.current = null;
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.12 : 0.12;
    setTransform((prev) => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  };

  const adjustScale = (delta) => {
    setTransform((prev) => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  };

  const resetView = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <section id={id} className="mx-auto max-w-6xl px-4 pb-20 text-paperWhite scroll-mt-28">
      <ScrollReveal>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-crystal">{title}</h2>
          <p className="mt-3 max-w-3xl text-paperWhite/75">{description}</p>
        </div>
      </ScrollReveal>
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-xs text-paperWhite/70">
            <button
              type="button"
              onClick={() => adjustScale(0.15)}
              className="rounded-full border border-white/10 px-2 py-1 text-paperWhite/80 transition hover:border-crystal hover:text-crystal"
              aria-label="Zoom in map"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => adjustScale(-0.15)}
              className="rounded-full border border-white/10 px-2 py-1 text-paperWhite/80 transition hover:border-crystal hover:text-crystal"
              aria-label="Zoom out map"
            >
              -
            </button>
            <button
              type="button"
              onClick={resetView}
              className="rounded-full border border-white/10 px-2 py-1 text-paperWhite/80 transition hover:border-crystal hover:text-crystal"
            >
              Reset
            </button>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(216,198,255,0.22), transparent 40%), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "220px 220px, 240px 240px, 80px 80px, 80px 80px",
              }}
            />
          </div>
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheel}
            className="relative h-full min-h-[360px] w-full touch-none"
            role="application"
            aria-label="Interactive rap map"
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: "center",
              }}
            >
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {rapMapEdges.map((edge) => {
                  const from = artistMap.get(edge.from);
                  const to = artistMap.get(edge.to);
                  if (!from || !to) return null;
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="rgba(170,214,255,0.2)"
                      strokeDasharray="2 3"
                    />
                  );
                })}
              </svg>
              {rapMapArtists.map((artist) => {
                const isActive = artist.id === selectedId;
                return (
                  <button
                    key={artist.id}
                    type="button"
                    onClick={() => setSelectedId(artist.id)}
                    className={`absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-[10px] font-semibold uppercase tracking-wide transition ${
                      isActive
                        ? "border-monteGold bg-monteGold/20 text-monteGold shadow-[0_0_24px_rgba(255,208,102,0.5)]"
                        : "border-white/30 bg-black/50 text-white/80 hover:border-crystal hover:text-crystal"
                    }`}
                    style={{ left: `${artist.x}%`, top: `${artist.y}%` }}
                    aria-pressed={isActive}
                    aria-label={artist.name}
                  >
                    <span className="text-[9px] text-white/60">{artist.alias}</span>
                    <span>{artist.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-paperWhite/70">
            Scroll to zoom, drag to pan. Data is beta mock until ingestion is live.
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          {selectedArtist ? (
            <>
              <p className="text-xs uppercase tracking-[0.3em] text-paperWhite/60">
                {selectedArtist.role}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-paperWhite">
                {selectedArtist.name}
                <span className="ml-2 text-sm text-paperWhite/60">
                  ({selectedArtist.alias})
                </span>
              </h3>
              <p className="mt-2 text-sm text-paperWhite/75">{selectedArtist.summary}</p>
              <div className="mt-4 grid gap-2 text-sm text-paperWhite/70">
                <div className="flex items-center justify-between">
                  <span className="text-paperWhite/50">Era</span>
                  <span>{selectedArtist.era}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-paperWhite/50">Origin</span>
                  <span>{selectedArtist.origin}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedArtist.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-paperWhite/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4">
                {selectedArtist.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between text-sm">
                    <span className="text-paperWhite/60">{metric.label}</span>
                    <span className="text-paperWhite">{metric.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-paperWhite/60">
                  Sample Bars
                </p>
                <ul className="mt-3 space-y-2 text-sm text-paperWhite/80">
                  {selectedArtist.bars.map((bar) => (
                    <li key={bar} className="rounded-lg bg-white/5 px-3 py-2">
                      "{bar}"
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-paperWhite/70">Select an artist node to explore.</p>
          )}
        </div>
      </div>
    </section>
  );
}
