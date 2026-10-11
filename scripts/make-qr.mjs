// Builds the printable QR code and sticker sheet for in-person marketing.
//
//   node scripts/make-qr.mjs
//
// Writes to print/ (not part of the website build):
//   govangoes-qr.svg        vector QR, scales to any size without blurring
//   govangoes-qr.png        1200px QR for quick uploads
//   sticker-sheet.html      US Letter page of 3-inch stickers (print to PDF from any browser)
//
// The QR points at the short link /go, which redirects to /services (see vercel.json).
// Dark modules on a white panel: scanners need high contrast, so the code is never inverted.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const SHORT_LINK = "https://www.govangoes.com/go";
const DISPLAY_LINK = "govangoes.com/go";
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "print");

// "H" = highest error correction, so a scuffed or curved sticker still scans.
const options = { errorCorrectionLevel: "H", margin: 2, color: { dark: "#0a1022", light: "#ffffff" } };

const svg = await QRCode.toString(SHORT_LINK, { ...options, type: "svg" });
const qrInner = svg.replace(/<\?xml[^>]*>\s*/, "");
const png = await QRCode.toBuffer(SHORT_LINK, { ...options, type: "png", width: 1200 });

const sticker = `
  <div class="sticker">
    <p class="brand">GoVanGoes Creative</p>
    <div class="qr">${qrInner}</div>
    <p class="cta">Scan to book a date<br />or start a mix</p>
    <p class="link">${DISPLAY_LINK}</p>
  </div>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>GoVanGoes Creative sticker sheet</title>
<style>
  @page { size: 8.5in 11in; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, "Helvetica Neue", Arial, sans-serif; background: #fff; }
  .sheet { width: 8.5in; height: 11in; padding: 0.625in 0.6875in; display: grid;
    grid-template-columns: repeat(2, 3in); grid-template-rows: repeat(3, 3in);
    gap: 0.5in 0.9375in; justify-content: center; align-content: center; }
  .sticker { width: 3in; height: 3in; border-radius: 0.3in; background: #0a1022; color: #f6f7fb;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 0.14in; text-align: center; border: 0.02in solid #22d3ee; }
  .brand { margin: 0 0 0.08in; font-size: 0.17in; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #22d3ee; }
  .qr { width: 1.7in; height: 1.7in; background: #fff; border-radius: 0.08in; overflow: hidden; }
  .qr svg { width: 100%; height: 100%; display: block; }
  .cta { margin: 0.1in 0 0.04in; font-size: 0.17in; font-weight: 700; line-height: 1.2; }
  .link { margin: 0; font-size: 0.15in; color: #a78bfa; font-weight: 600; }
</style>
</head>
<body>
  <div class="sheet">${sticker.repeat(6)}</div>
</body>
</html>
`;

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "govangoes-qr.svg"), svg);
await writeFile(path.join(outDir, "govangoes-qr.png"), png);
await writeFile(path.join(outDir, "sticker-sheet.html"), html);
console.log(`Wrote QR for ${SHORT_LINK} to ${outDir}`);
