/* Update <lastmod> in public/sitemap.xml to today's date (YYYY-MM-DD). */
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('public', 'sitemap.xml');
const today = new Date();
const iso = today.toISOString().slice(0, 10); // YYYY-MM-DD

if (!fs.existsSync(file)) {
  console.error('[sitemap] not found:', file);
  process.exit(0);
}

const src = fs.readFileSync(file, 'utf8');
const out = src.replace(/(<lastmod>)([^<]+)(<\/lastmod>)/g, `$1${iso}$3`);

if (out !== src) {
  fs.writeFileSync(file, out);
  console.log(`[sitemap] lastmod updated to ${iso}`);
} else {
  console.log('[sitemap] no changes');
}

