// Dictionary lookup from built CMU-derived JSON
// Build first with: npm run dict:build (requires src/data/cmudict.txt)

import fs from "node:fs";
import path from "node:path";

export const config = { runtime: "nodejs" };

function loadDict() {
  try {
    const file = path.join(process.cwd(), "src", "data", "dictionary.json");
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export default async function handler(req, res) {
  const dict = loadDict();
  const url = new URL(req.url, "http://local");
  const type = (url.searchParams.get("type") || "tail").toLowerCase();
  const key = url.searchParams.get("key") || "";
  // If dictionary isn't built yet, return an empty list with 200 so UI can gracefully degrade.
  if (!dict) {
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).json({ key, type, words: [], count: 0, hint: "dictionary_not_built" });
    return;
  }
  let bucket = dict[type];
  if (!bucket) {
    res
      .status(400)
      .json({
        error: "invalid_type",
        types: Object.keys(dict).filter((k) => typeof dict[k] === "object"),
      });
    return;
  }
  if (!key) {
    res.status(400).json({ error: "missing_key" });
    return;
  }
  const words = bucket[key] || [];
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ key, type, words, count: words.length });
}
