// Populates date/location fields in /public/images/you/manifest.json using EXIF
// Requires: exifr (install locally) → npm i -D exifr

import fs from 'node:fs';
import path from 'node:path';

const youDir = path.resolve('public', 'images', 'you');
const manifestPath = path.join(youDir, 'manifest.json');

async function maybeLoadExifr() {
  try {
    const mod = await import('exifr');
    return mod.default || mod;
  } catch (e) {
    console.error('[epk:exif] exifr is not installed. Run: npm i -D exifr');
    process.exit(1);
  }
}

function readJSON(fp) {
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return null; }
}

function writeJSON(fp, data) {
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
}

function uniqBySrc(arr){
  const seen = new Set();
  return arr.filter(x => { if (seen.has(x.src)) return false; seen.add(x.src); return true; });
}

async function main() {
  if (!fs.existsSync(youDir)) {
    console.error('[epk:exif] directory not found:', youDir);
    process.exit(1);
  }
  const exifr = await maybeLoadExifr();
  const manifest = readJSON(manifestPath) || [];
  const updated = [];
  for (const item of manifest) {
    const rel = item.src?.replace(/^\//, '');
    const abs = rel ? path.resolve('public', rel) : null;
    if (!abs || !fs.existsSync(abs)) { updated.push(item); continue; }
    try {
      const data = await exifr.parse(abs, { tiff: true, ifd0: true, exif: true, gps: true, sanitize: true });
      const next = { ...item };
      // Date
      if (!next.date) {
        const dt = data?.DateTimeOriginal || data?.CreateDate || data?.ModifyDate;
        if (dt) {
          try {
            const iso = (dt instanceof Date ? dt : new Date(dt)).toISOString().slice(0,10);
            next.date = iso;
          } catch {}
        }
      }
      // Location (GPS)
      if (!next.location && (data?.latitude || data?.longitude)) {
        const lat = data.latitude?.toFixed(5);
        const lon = data.longitude?.toFixed(5);
        if (lat && lon) next.location = `${lat}, ${lon}`;
      }
      updated.push(next);
    } catch (e) {
      updated.push(item);
    }
  }

  writeJSON(manifestPath, uniqBySrc(updated));
  console.log(`[epk:exif] updated ${updated.length} entries → ${path.relative(process.cwd(), manifestPath)}`);
}

main().catch(err => { console.error('[epk:exif] failed', err); process.exit(1); });

