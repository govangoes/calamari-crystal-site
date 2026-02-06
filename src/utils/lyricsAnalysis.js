/**
 * Lyrics analysis for Lyrics Lab: word/phrase counts, stop-word filtering, and phrase loops.
 * Used by src/components/LyricsLabContent.jsx. Keep pure (no DOM/side effects) for testability.
 */
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "for",
  "from",
  "has",
  "he",
  "her",
  "his",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "me",
  "my",
  "no",
  "not",
  "of",
  "on",
  "or",
  "our",
  "she",
  "so",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "to",
  "too",
  "up",
  "us",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "who",
  "why",
  "with",
  "you",
  "your",
]);

const DEFAULT_SCORE_RANGES = {
  lexicalDiversity: { min: 0.2, max: 0.6 },
  rhymeDensity: { min: 0.1, max: 0.6 },
  internalRhymeRatio: { min: 0.05, max: 0.4 },
  phraseRarity: { min: 0.2, max: 1.4 },
};

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const normalizeRange = (value, min, max) => {
  if (max === min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
};

const normalizeText = (text) =>
  text
    .replace(/\r\n/g, "\n")
    .replace(/[\u2019\u2018]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\[[^\]]*]/g, " ");

const tokenize = (text) => {
  const matches = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  return matches
    .map((word) => word.replace(/^'+|'+$/g, ""))
    .filter((word) => word.length > 0);
};

const splitLines = (text) =>
  text
    .split("\n")
    .map((line) => tokenize(line))
    .filter((lineTokens) => lineTokens.length > 0);

const rhymeKey = (word) => {
  const cleaned = word.toLowerCase().replace(/[^a-z']/g, "");
  if (!cleaned) return "";
  const stripped = cleaned.replace(/'+/g, "");
  if (!stripped) return "";
  const vowels = "aeiouy";
  for (let i = stripped.length - 1; i >= 0; i -= 1) {
    if (vowels.includes(stripped[i])) {
      return stripped.slice(i);
    }
  }
  return stripped.slice(-3);
};

const buildNgrams = (tokens, size) => {
  const grams = [];
  for (let i = 0; i <= tokens.length - size; i += 1) {
    grams.push(tokens.slice(i, i + size));
  }
  return grams;
};

export const analyzeLyrics = (rawText, ranges = DEFAULT_SCORE_RANGES) => {
  const normalized = normalizeText(rawText || "");
  const tokens = tokenize(normalized);
  const lines = splitLines(normalized);
  const tokenCount = tokens.length;
  const uniqueTokens = new Set(tokens).size;
  const lineCount = lines.length;

  const lexicalDiversity = tokenCount > 0 ? uniqueTokens / tokenCount : 0;

  const lineRhymeKeys = lines.map((line) => {
    const lastWord = [...line].reverse().find((word) => word.length > 0);
    return lastWord ? rhymeKey(lastWord) : "";
  });

  let rhymedLines = 0;
  const windowSize = 4;
  lineRhymeKeys.forEach((key, index) => {
    if (!key) return;
    const start = Math.max(0, index - windowSize);
    const end = Math.min(lineRhymeKeys.length - 1, index + windowSize);
    for (let i = start; i <= end; i += 1) {
      if (i !== index && lineRhymeKeys[i] === key) {
        rhymedLines += 1;
        break;
      }
    }
  });
  const rhymeDensity = lineCount > 0 ? rhymedLines / lineCount : 0;

  let internalRhymeWords = 0;
  let internalRhymeWordTotal = 0;
  lines.forEach((line) => {
    const lineWords = line.filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
    internalRhymeWordTotal += lineWords.length;
    const counts = lineWords.reduce((acc, word) => {
      const key = rhymeKey(word);
      if (!key) return acc;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    lineWords.forEach((word) => {
      const key = rhymeKey(word);
      if (key && counts[key] > 1) internalRhymeWords += 1;
    });
  });
  const internalRhymeRatio =
    internalRhymeWordTotal > 0 ? internalRhymeWords / internalRhymeWordTotal : 0;

  const phraseCounts = new Map();
  [2, 3, 4].forEach((size) => {
    buildNgrams(tokens, size).forEach((gram) => {
      const hasNonStop = gram.some((word) => !STOP_WORDS.has(word));
      if (!hasNonStop) return;
      const phrase = gram.join(" ");
      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
    });
  });

  const phraseList = [...phraseCounts.entries()].sort((a, b) => b[1] - a[1]);
  const totalPhrases = phraseList.reduce((sum, [, count]) => sum + count, 0);
  const phraseSample = phraseList.slice(0, 500);
  const phraseRarity =
    phraseSample.length > 0
      ? phraseSample.reduce((sum, [, count]) => {
          const rarity = Math.log10((totalPhrases + 1) / (count + 1));
          return sum + rarity;
        }, 0) / phraseSample.length
      : 0;

  const lexicalDiversityScore =
    normalizeRange(lexicalDiversity, ranges.lexicalDiversity.min, ranges.lexicalDiversity.max) *
    100;
  const rhymeDensityScore =
    normalizeRange(rhymeDensity, ranges.rhymeDensity.min, ranges.rhymeDensity.max) * 100;
  const internalRhymeScore =
    normalizeRange(internalRhymeRatio, ranges.internalRhymeRatio.min, ranges.internalRhymeRatio.max) *
    100;
  const phraseRarityScore =
    normalizeRange(phraseRarity, ranges.phraseRarity.min, ranges.phraseRarity.max) * 100;

  const baseScore =
    lexicalDiversityScore * 0.3 +
    rhymeDensityScore * 0.25 +
    internalRhymeScore * 0.2 +
    phraseRarityScore * 0.25;

  const coverage = tokenCount >= 3000 ? 1 : clamp(tokenCount / 3000, 0, 1);
  const overallScore = baseScore * coverage;

  const topPhrases = phraseList.slice(0, 8).map(([phrase, count]) => ({ phrase, count }));
  const rhymeCounts = lineRhymeKeys.reduce((acc, key) => {
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const topRhymes = Object.entries(rhymeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key, count]) => ({ key, count }));

  return {
    tokenCount,
    uniqueTokens,
    lineCount,
    lexicalDiversity,
    rhymeDensity,
    internalRhymeRatio,
    phraseRarity,
    lexicalDiversityScore,
    rhymeDensityScore,
    internalRhymeScore,
    phraseRarityScore,
    baseScore,
    overallScore,
    coverage,
    topPhrases,
    topRhymes,
  };
};

export default analyzeLyrics;
