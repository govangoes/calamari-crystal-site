import { useEffect, useMemo, useState } from "react";
import { Sparkles, Target, Plus, Trash2, BarChart3 } from "lucide-react";
import {
  createWordEntry,
  describeRhyme,
  describeUniqueness,
  hydrateWordEntry,
  normalizeWord,
  uniquenessScore,
} from "../utils/rhymeUtils.js";

const STORAGE_KEY = "rhyme-lab-words";
const TARGET_KEY = "rhyme-lab-target";

function loadStoredWords() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => entry && typeof entry.word === "string");
  } catch (error) {
    console.error("Failed to parse saved words", error);
    return [];
  }
}

export default function RhymeLab() {
  const [targetWord, setTargetWord] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(TARGET_KEY) || "";
  });
  const [words, setWords] = useState(loadStoredWords);
  const [newWord, setNewWord] = useState("");
  const [notes, setNotes] = useState("");
  const [sortMode, setSortMode] = useState("rhyme");

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(TARGET_KEY, targetWord);
  }, [targetWord]);

  const hydrated = useMemo(() => {
    return words
      .map((entry) => hydrateWordEntry(entry, targetWord))
      .sort((a, b) => {
        if (sortMode === "uniqueness") {
          return b.uniqueness - a.uniqueness || b.rhymeScore - a.rhymeScore;
        }
        if (sortMode === "chronological") {
          return b.createdAt - a.createdAt;
        }
        const compositeA = a.rhymeScore * 0.7 + a.uniqueness * 0.3;
        const compositeB = b.rhymeScore * 0.7 + b.uniqueness * 0.3;
        if (compositeB === compositeA) {
          return b.rhymeScore - a.rhymeScore;
        }
        return compositeB - compositeA;
      });
  }, [words, targetWord, sortMode]);

  const summary = useMemo(() => {
    if (!hydrated.length) return null;
    const topRhyme = [...hydrated].sort((a, b) => b.rhymeScore - a.rhymeScore)[0];
    const topUnique = [...hydrated].sort((a, b) => b.uniqueness - a.uniqueness)[0];
    const averageRhyme =
      hydrated.reduce((acc, entry) => acc + entry.rhymeScore, 0) / hydrated.length;
    const averageUniqueness =
      hydrated.reduce((acc, entry) => acc + entry.uniqueness, 0) / hydrated.length;
    return {
      topRhyme,
      topUnique,
      averageRhyme: Number(averageRhyme.toFixed(2)),
      averageUniqueness: Number(averageUniqueness.toFixed(2)),
    };
  }, [hydrated]);

  function handleAddWord(event) {
    event.preventDefault();
    const preparedWord = normalizeWord(newWord);
    if (!preparedWord) return;

    setWords((prev) => [createWordEntry(preparedWord, notes), ...prev]);
    setNewWord("");
    setNotes("");
  }

  function handleDelete(id) {
    setWords((prev) => prev.filter((entry) => entry.id !== id));
  }

  function renderMeter(label, score, accent) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink/60 dark:text-paperWhite/60">
          <span>{label}</span>
          <span className="font-semibold">{Math.round(score * 100)}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-ink/10 dark:bg-paperWhite/10 overflow-hidden">
          <div
            className={`${accent} h-full transition-all duration-500`}
            style={{ width: `${Math.max(score * 100, 4)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-12">
      <section className="mb-12 rounded-3xl border border-ink/10 dark:border-paperWhite/10 bg-paperWhite/70 dark:bg-ink/60 backdrop-blur p-8 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-semibold text-ink dark:text-paperWhite">
              <Sparkles className="h-9 w-9 text-crystal" />
              Rhyme Lab
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-ink/70 dark:text-paperWhite/70">
              Capture rhyme sparks, annotate your punchlines, and let the lab surface the rarest
              pairings. Set an anchor word to evaluate rhyme strength, then explore how each idea
              stacks for sound and uniqueness.
            </p>
          </div>
          <div className="rounded-2xl border border-crystal/30 bg-crystal/10 px-4 py-3 text-sm text-crystal">
            <p className="font-semibold uppercase tracking-wider">Live metrics</p>
            <p className="mt-1 text-xs text-crystal/80">
              Anchor: {targetWord ? `“${targetWord}”` : "set an anchor"} · Ideas saved: {words.length}
            </p>
          </div>
        </div>

        <form onSubmit={handleAddWord} className="mt-8 grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-ink dark:text-paperWhite" htmlFor="target-word">
              Anchor word
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-ink/10 dark:border-paperWhite/20 bg-paperWhite/70 dark:bg-ink/80 px-4 py-3 shadow-inner">
              <Target className="h-5 w-5 text-monteGold" />
              <input
                id="target-word"
                type="text"
                value={targetWord}
                onChange={(event) => setTargetWord(event.target.value)}
                placeholder="e.g. revolution"
                className="w-full bg-transparent text-lg font-semibold text-ink dark:text-paperWhite placeholder:text-ink/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paperWhite" htmlFor="new-word">
                Add a rhyme idea
              </label>
              <input
                id="new-word"
                type="text"
                value={newWord}
                onChange={(event) => setNewWord(event.target.value)}
                placeholder="Word or phrase"
                className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-paperWhite/20 bg-paperWhite/70 dark:bg-ink/80 px-4 py-3 text-ink dark:text-paperWhite placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-crystal/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink dark:text-paperWhite" htmlFor="notes">
                Notes & imagery (optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                placeholder="Cadence, internal rhymes, setups..."
                className="mt-2 w-full rounded-2xl border border-ink/10 dark:border-paperWhite/20 bg-paperWhite/70 dark:bg-ink/80 px-4 py-3 text-sm text-ink dark:text-paperWhite placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-crystal/60"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-2xl border border-ink/10 dark:border-paperWhite/10 bg-ink/90/5 dark:bg-paperWhite/5 p-5 text-sm text-ink/80 dark:text-paperWhite/70">
              <p className="font-semibold text-ink dark:text-paperWhite">Rhyme scoring</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Focuses on the vowel-to-end chunk of each word.</li>
                <li>Perfect match? 85%+ rhyme strength.</li>
                <li>Slant textures still count toward your palette.</li>
              </ul>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-crystal px-4 py-3 text-base font-semibold text-ink shadow-crystal transition hover:bg-crystal/90"
            >
              <Plus className="h-5 w-5" /> Add to lab
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-ink/10 dark:border-paperWhite/10 bg-paperWhite/60 dark:bg-ink/70 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-ink dark:text-paperWhite">
              <BarChart3 className="h-5 w-5 text-monteGold" />
              Lab stats
            </h2>
            <p className="text-sm text-ink/60 dark:text-paperWhite/60">
              Sorting by {sortMode === "rhyme" ? "overall rhyme power" : sortMode === "uniqueness" ? "uniqueness" : "recent additions"}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSortMode("rhyme")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                sortMode === "rhyme"
                  ? "bg-crystal text-ink shadow-crystal"
                  : "bg-ink/5 text-ink/70 dark:bg-paperWhite/5 dark:text-paperWhite/70"
              }`}
            >
              Rhyme focus
            </button>
            <button
              type="button"
              onClick={() => setSortMode("uniqueness")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                sortMode === "uniqueness"
                  ? "bg-monteGold/80 text-ink shadow"
                  : "bg-ink/5 text-ink/70 dark:bg-paperWhite/5 dark:text-paperWhite/70"
              }`}
            >
              Unique first
            </button>
            <button
              type="button"
              onClick={() => setSortMode("chronological")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                sortMode === "chronological"
                  ? "bg-ink text-paperWhite"
                  : "bg-ink/5 text-ink/70 dark:bg-paperWhite/5 dark:text-paperWhite/70"
              }`}
            >
              Latest ideas
            </button>
          </div>
        </header>

        {summary ? (
          <div className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              title="Sharpest rhyme"
              highlight={summary.topRhyme.word}
              descriptor={describeRhyme(summary.topRhyme.rhymeScore)}
              score={summary.topRhyme.rhymeScore}
            />
            <SummaryCard
              title="Rarest spark"
              highlight={summary.topUnique.word}
              descriptor={describeUniqueness(summary.topUnique.uniqueness)}
              score={summary.topUnique.uniqueness}
            />
            <div className="rounded-3xl border border-ink/10 dark:border-paperWhite/10 bg-paperWhite/70 dark:bg-ink/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-ink/50 dark:text-paperWhite/50">
                Lab averages
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <p>Rhyme strength avg: {Math.round(summary.averageRhyme * 100)}%</p>
                <p>Uniqueness avg: {Math.round(summary.averageUniqueness * 100)}%</p>
                <p>Total entries: {hydrated.length}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-ink/20 dark:border-paperWhite/20 bg-paperWhite/50 dark:bg-ink/60 p-8 text-center text-sm text-ink/60 dark:text-paperWhite/60">
            Add your first rhyme idea to see live stats.
          </div>
        )}

        <div className="space-y-4">
          {hydrated.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-ink/10 dark:border-paperWhite/10 bg-paperWhite/70 dark:bg-ink/80 p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold capitalize text-ink dark:text-paperWhite">
                    {entry.word}
                  </h3>
                  {entry.notes ? (
                    <p className="mt-2 max-w-2xl text-sm text-ink/70 dark:text-paperWhite/70">
                      {entry.notes}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs uppercase tracking-widest text-ink/40 dark:text-paperWhite/40">
                    Added {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="flex items-center gap-2 self-start rounded-full border border-ink/10 dark:border-paperWhite/20 px-3 py-2 text-xs uppercase tracking-wide text-ink/60 transition hover:border-red-400 hover:text-red-500 dark:text-paperWhite/60"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  {renderMeter("Rhyme strength", entry.rhymeScore, "bg-crystal")}
                  <p className="text-xs font-medium uppercase tracking-widest text-crystal">
                    {entry.rhymeLabel}
                  </p>
                  <p className="text-xs text-ink/60 dark:text-paperWhite/60">
                    Anchor: {targetWord ? `“${targetWord}”` : "set an anchor word to score"}
                  </p>
                </div>
                <div className="space-y-3">
                  {renderMeter("Uniqueness", entry.uniqueness, "bg-monteGold/80")}
                  <p className="text-xs font-medium uppercase tracking-widest text-monteGold">
                    {entry.uniquenessLabel}
                  </p>
                  <p className="text-xs text-ink/60 dark:text-paperWhite/60">
                    Diversity index: {Math.round(uniquenessScore(entry.word) * 100)}%
                  </p>
                </div>
              </div>

              {targetWord ? (
                <div className="mt-4 rounded-2xl bg-ink/5 dark:bg-paperWhite/5 p-4 text-xs text-ink/70 dark:text-paperWhite/70">
                  <p className="font-semibold uppercase tracking-wider text-ink/50 dark:text-paperWhite/50">
                    Sound sketch
                  </p>
                  <p className="mt-1">
                    {entry.word} ↔ {targetWord}: shared tail “
                    {sharedTail(entry.word, targetWord) || "∅"}”.
                  </p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({ title, highlight, descriptor, score }) {
  return (
    <div className="rounded-3xl border border-ink/10 dark:border-paperWhite/10 bg-paperWhite/70 dark:bg-ink/70 p-5">
      <p className="text-xs uppercase tracking-widest text-ink/50 dark:text-paperWhite/50">
        {title}
      </p>
      <p className="mt-3 text-2xl font-semibold capitalize text-ink dark:text-paperWhite">
        {highlight || "—"}
      </p>
      <p className="mt-1 text-sm text-ink/60 dark:text-paperWhite/60">{descriptor}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink/40 dark:text-paperWhite/40">
        Score: {Math.round(score * 100)}%
      </p>
    </div>
  );
}

function sharedTail(a, b) {
  const cleanA = normalizeWord(a);
  const cleanB = normalizeWord(b);
  if (!cleanA || !cleanB) return "";
  let i = 0;
  while (
    i < cleanA.length &&
    i < cleanB.length &&
    cleanA[cleanA.length - 1 - i] === cleanB[cleanB.length - 1 - i]
  ) {
    i += 1;
  }
  if (i === 0) return "";
  return cleanA.slice(cleanA.length - i);
}
