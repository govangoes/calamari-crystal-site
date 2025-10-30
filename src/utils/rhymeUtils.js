const VOWELS = "aeiouy";

export function normalizeWord(word = "") {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z\s'-]/g, "")
    .trim();
}

export function commonSuffixLength(a, b) {
  const minLength = Math.min(a.length, b.length);
  let count = 0;
  for (let i = 0; i < minLength; i += 1) {
    if (a[a.length - 1 - i] === b[b.length - 1 - i]) {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}

export function sharedTail(a, b) {
  const cleanA = normalizeWord(a);
  const cleanB = normalizeWord(b);
  if (!cleanA || !cleanB) return "";
  const suffixLen = commonSuffixLength(cleanA, cleanB);
  if (suffixLen === 0) return "";
  return cleanA.slice(cleanA.length - suffixLen);
}

function lastVowelIndex(word) {
  for (let i = word.length - 1; i >= 0; i -= 1) {
    if (VOWELS.includes(word[i])) {
      return i;
    }
  }
  return -1;
}

export function rhymeStrength(word, target) {
  const cleanWord = normalizeWord(word);
  const cleanTarget = normalizeWord(target);

  if (!cleanWord || !cleanTarget) return 0;
  if (cleanWord === cleanTarget) return 1;

  const suffixStartWord = lastVowelIndex(cleanWord);
  const suffixStartTarget = lastVowelIndex(cleanTarget);

  const rhymeChunkWord =
    suffixStartWord === -1 ? cleanWord : cleanWord.slice(suffixStartWord);
  const rhymeChunkTarget =
    suffixStartTarget === -1 ? cleanTarget : cleanTarget.slice(suffixStartTarget);

  const sharedSuffix = commonSuffixLength(rhymeChunkWord, rhymeChunkTarget);
  const normalized = sharedSuffix / Math.max(rhymeChunkTarget.length, 1);

  return Number(normalized.toFixed(3));
}

export function uniquenessScore(word) {
  const cleanWord = normalizeWord(word);
  if (!cleanWord) return 0;

  const lettersOnly = cleanWord.replace(/[^a-z]/g, "");
  if (!lettersOnly) return 0;

  const uniqueLetters = new Set(lettersOnly);
  const diversity = uniqueLetters.size / lettersOnly.length;
  const lengthBonus = Math.min(lettersOnly.length / 12, 0.5);
  const rareLettersBonus = /[jxqz]/.test(lettersOnly) ? 0.15 : 0;

  const score = diversity * 0.6 + lengthBonus * 0.25 + rareLettersBonus;
  return Number(Math.min(score, 1).toFixed(3));
}

export function describeRhyme(score) {
  if (score >= 0.85) return "Perfect rhyme";
  if (score >= 0.65) return "Strong rhyme";
  if (score >= 0.45) return "Near rhyme";
  if (score >= 0.25) return "Slant rhyme";
  if (score > 0) return "Textural echo";
  return "No rhyme yet";
}

export function describeUniqueness(score) {
  if (score >= 0.75) return "Rare gem";
  if (score >= 0.5) return "Fresh twist";
  if (score >= 0.3) return "Familiar";
  if (score > 0) return "Common";
  return "Undefined";
}

export function hydrateWordEntry(entry, targetWord) {
  const rhymeScore = rhymeStrength(entry.word, targetWord);
  const uniqueness = uniquenessScore(entry.word);
  return {
    ...entry,
    rhymeScore,
    uniqueness,
    rhymeLabel: describeRhyme(rhymeScore),
    uniquenessLabel: describeUniqueness(uniqueness),
  };
}

export function createWordEntry(word, notes = "") {
  const timestamp = Date.now();
  return {
    id: `${timestamp}-${Math.random().toString(16).slice(2)}`,
    word: normalizeWord(word),
    notes: notes.trim(),
    createdAt: timestamp,
  };
}
