import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const roots = [path.resolve('public', 'images')];
const exts = new Set(['.jpg', '.jpeg', '.png']);

function hasBin(bin){
  try { execFileSync(bin, ['-version'], { stdio: 'ignore' }); return true; } catch { return false; }
}

const cwebp = hasBin('cwebp') ? 'cwebp' : null;
if (!cwebp) {
  console.error('[img:opt] cwebp not found. Install via Homebrew: `brew install webp`.');
  process.exit(1);
}

for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  const files = fs.readdirSync(root);
  for (const f of files) {
    const fp = path.join(root, f);
    const st = fs.statSync(fp);
    if (st.isDirectory()) continue;
    const ext = path.extname(f).toLowerCase();
    if (!exts.has(ext)) continue;
    const out = fp.replace(ext, '.webp');
    if (fs.existsSync(out)) continue;
    try {
      execFileSync(cwebp, ['-q', '82', fp, '-o', out], { stdio: 'inherit' });
      console.log(`[img:opt] -> ${path.basename(out)}`);
    } catch (e) {
      console.error('[img:opt] failed for', f, e?.message || e);
    }
  }
}

