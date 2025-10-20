// Populates date/location in /public/images/you/manifest.json using EXIF
// Usage: npm i -D exifr && npm run epk:exif
import fs from "node:fs";
import path from "node:path";
const youDir = path.resolve("public", "images", "you");
const manifestPath = path.join(youDir, "manifest.json");
async function maybeLoadExifr() {
  try {
    const mod = await import("exifr");
    return mod.default || mod;
  } catch {
    console.error("[epk:exif] exifr not installed. Run: npm i -D exifr");
    process.exit(1);
  }
}
function readJSON(fp) {
  try {
    return JSON.parse(fs.readFileSync(fp, "utf8"));
  } catch {
    return null;
  }
}
function writeJSON(fp, data) {
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
}
function uniqBySrc(arr) {
  const s = new Set();
  return arr.filter((x) => {
    if (s.has(x.src)) return false;
    s.add(x.src);
    return true;
  });
}
async function main() {
  if (!fs.existsSync(youDir)) {
    console.error("[epk:exif] missing dir", youDir);
    process.exit(1);
  }
  const exifr = await maybeLoadExifr();
  const manifest = readJSON(manifestPath) || [];
  const updated = [];
  for (const item of manifest) {
    const rel = item.src?.replace(/^\//, "");
    const abs = rel ? path.resolve("public", rel) : null;
    if (!abs || !fs.existsSync(abs)) {
      updated.push(item);
      continue;
    }
    try {
      const data = await exifr.parse(abs, {
        tiff: true,
        ifd0: true,
        exif: true,
        gps: true,
        sanitize: true,
      });
      const next = { ...item };
      if (!next.date) {
        const dt = data?.DateTimeOriginal || data?.CreateDate || data?.ModifyDate;
        if (dt) {
          try {
            next.date = (dt instanceof Date ? dt : new Date(dt)).toISOString().slice(0, 10);
          } catch (dateError) {
            // Date parsing failed - keep original date or leave empty
            console.warn("[epk:exif] Failed to parse date for", item.src, dateError.message);
          }
        }
      }
      if (!next.location && (data?.latitude || data?.longitude)) {
        const lat = data.latitude?.toFixed(5);
        const lon = data.longitude?.toFixed(5);
        if (lat && lon) next.location = `${lat}, ${lon}`;
      }
      updated.push(next);
    } catch (exifError) {
      console.warn("[epk:exif] Failed to parse EXIF for", item.src, exifError.message);
      updated.push(item);
    }
  }
  writeJSON(manifestPath, uniqBySrc(updated));
  console.log(
    `[epk:exif] updated ${updated.length} entries → ${path.relative(process.cwd(), manifestPath)}`,
  );
}
main().catch((error) => {
  console.error("[epk:exif] failed", error);
  process.exit(1);
});
