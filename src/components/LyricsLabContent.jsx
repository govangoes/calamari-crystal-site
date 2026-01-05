import { useState } from "react";
import analyzeLyrics from "../utils/lyricsAnalysis.js";
import MetricBar from "./MetricBar.jsx";

const sampleLyrics = `Masked hero in the moonlight, steady with the ink.
Shadow of the city, every bar a missing link.
Rhymes fold like paper, sharp crease in the air.
Hear the villain whisper, truth hiding in the glare.`;

export default function LyricsLabContent({
  title = "Lyrics Lab",
  subtitle = "Paste lyrics and generate a beta vocabulary score. This uses local analysis only and will evolve as the full Rap Map dataset comes online.",
  eyebrow,
}) {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalysis(analyzeLyrics(input));
  };

  const handleUseSample = () => {
    setInput(sampleLyrics);
    setAnalysis(analyzeLyrics(sampleLyrics));
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16">
        {eyebrow && (
          <p className="pill border-white/20 bg-white/10 text-xs uppercase tracking-[0.4em] text-paperWhite/80">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-3 max-w-2xl text-paperWhite/75">{subtitle}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-crystal">Paste Lyrics</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUseSample}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-paperWhite/70 transition hover:border-crystal hover:text-crystal"
              >
                Use Sample
              </button>
              <button type="button" onClick={handleAnalyze} className="btn-primary">
                Analyze
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste lyrics here..."
            rows={16}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-paperWhite shadow-inner outline-none transition focus:border-crystal/60 focus:ring-2 focus:ring-crystal/40"
          />
          <p className="mt-3 text-xs text-paperWhite/60">
            Tip: Aim for 3,000+ words for reliable scoring.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
            <h2 className="text-xl font-semibold text-opal">Score Snapshot</h2>
            {analysis ? (
              <>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-paperWhite/70">Rap Map Score</span>
                  <span className="text-3xl font-semibold text-paperWhite">
                    {Math.round(analysis.overallScore)}
                  </span>
                </div>
                {analysis.coverage < 1 && (
                  <p className="mt-2 text-xs text-paperWhite/60">
                    Score adjusted for short input (coverage {Math.round(analysis.coverage * 100)}%).
                  </p>
                )}
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
              </>
            ) : (
              <p className="mt-4 text-sm text-paperWhite/60">
                Add lyrics and hit Analyze to see your stats.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
            <h2 className="text-lg font-semibold text-crystal">Totals</h2>
            {analysis ? (
              <div className="mt-4 grid gap-3 text-sm text-paperWhite/80">
                <div className="flex items-center justify-between">
                  <span>Words</span>
                  <span>{analysis.tokenCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unique words</span>
                  <span>{analysis.uniqueTokens}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lines</span>
                  <span>{analysis.lineCount}</span>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-paperWhite/60">Totals appear after analysis.</p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
            <h2 className="text-lg font-semibold text-monteGold">Scoring Weights</h2>
            <div className="mt-4 space-y-2 text-sm text-paperWhite/75">
              <div className="flex items-center justify-between">
                <span>Lexical diversity</span>
                <span>30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rhyme density</span>
                <span>25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Internal rhyme ratio</span>
                <span>20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Phrase rarity</span>
                <span>25%</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-paperWhite/60">
              Phrase rarity is local to this input until the global corpus is online.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
            <h2 className="text-lg font-semibold text-monteGold">Top Phrase Loops</h2>
            {analysis ? (
              <ul className="mt-4 space-y-2 text-sm text-paperWhite/75">
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
            ) : (
              <p className="mt-4 text-sm text-paperWhite/60">Phrase stats appear after analysis.</p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink/70 p-6 shadow-crystal">
            <h2 className="text-lg font-semibold text-opal">End Rhyme Keys</h2>
            {analysis ? (
              <ul className="mt-4 space-y-2 text-sm text-paperWhite/75">
                {analysis.topRhymes.length === 0 && <li>No rhymes detected.</li>}
                {analysis.topRhymes.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2"
                  >
                    <span>{item.key}</span>
                    <span className="text-paperWhite/50">{item.count}x</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-paperWhite/60">Rhyme keys appear after analysis.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
