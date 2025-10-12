/* global console, process */
import fs from 'node:fs';
import path from 'node:path';
async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default || mod;
  } catch {
    console.warn('[img:opt] sharp is not installed. Skipping image optimization.');
    return null;
  }
}
const root = path.resolve('public');
const exts = new Set(['.png', '.jpg', '.jpeg']);
function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(fp);
    else yield fp;
  }
}
function shouldConvert(fp) {
  const ext = path.extname(fp).toLowerCase();
  if (!exts.has(ext)) return false;
  const base = path.basename(fp).toLowerCase();
  // Skip favicons and manifest icons
  if (base.startsWith('favicon') || base.startsWith('icon-') || base.includes('apple')) return false;
  return true;
}
function bytes(n) { return (n/1024).toFixed(0)+'KB'; }
async function main(){
  const sharp = await loadSharp();
  if (!sharp) {
    console.log('[img:opt] noop (sharp missing)');
    return;
  }
  let converted = 0;
  for (const fp of walk(root)) {
    if (!shouldConvert(fp)) continue;
    const outWebp = fp.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(outWebp)) continue;
    const buf = fs.readFileSync(fp);
    try {
      const webp = await sharp(buf).webp({ quality: 82 }).toBuffer();
      fs.writeFileSync(outWebp, webp);
      console.log(`[img:opt] ${path.relative(process.cwd(), fp)} -> ${path.basename(outWebp)} (${bytes(buf.length)} → ${bytes(webp.length)})`);
      converted++;
    } catch (e) {
      console.warn('[img:opt] failed for', fp, e?.message || e);
    }
  }
  console.log(`[img:opt] done. ${converted} images converted to WebP.`);
}
main().catch((e)=>{ console.error(e); process.exit(1); });
