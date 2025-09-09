import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('public', 'images', 'you');
const outfile = path.join(dir, 'manifest.json');

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const files = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter(f => exts.has(path.extname(f).toLowerCase()))
  : [];

const entries = files
  .map((name) => {
    // Expect patterns like gvg-photo-12-wd.jpg | ...-lng.jpg | ...-sq.jpg
    const m = name.match(/gvg-photo-(\d+)-(wd|lng|sq)/i);
    const index = m ? Number(m[1]) : undefined;
    const aspect = m ? m[2].toLowerCase() : undefined;
    return {
      index,
      src: `/images/you/${name}`,
      caption: '',
      date: null,
      location: null,
      notes: '',
      aspect,
    };
  })
  .sort((a, b) => (a.index || 0) - (b.index || 0));

fs.writeFileSync(outfile, JSON.stringify(entries, null, 2));
console.log(`[epk] wrote ${entries.length} entries to ${path.relative(process.cwd(), outfile)}`);

