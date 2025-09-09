import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('public', 'sitemap.xml');
try {
  let xml = fs.readFileSync(file, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  xml = xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  fs.writeFileSync(file, xml);
  console.log(`[sitemap] lastmod updated to ${today}`);
} catch (e) {
  console.error('[sitemap] failed to update lastmod', e);
  process.exit(0);
}

