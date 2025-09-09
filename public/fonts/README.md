Calamari Sans — font scaffolding

Place your built WOFF2 files in this folder with the following names:

- CalamariSans-Regular.woff2 (400 normal)
- CalamariSans-Semibold.woff2 (600 normal)
- CalamariSans-Bold.woff2 (700 normal)
- CalamariSans-Italic.woff2 (400 italic)

How to produce WOFF2

- If you have TTF/OTF masters: use `woff2_compress` (from Google woff2) or FontForge export.
- If starting from an open-source base under OFL:
  1) Edit outlines in FontForge/Glyphs (basic Latin set A–Z, a–z, numerals, punctuation).
  2) Generate WOFF2 with proper names (preferred subfamily names: Regular, Semibold, Bold, Italic).
  3) Include a `LICENSE.txt` if required by the font license.

Performance tips

- Keep WOFF2 files small (< 100 KB each) by limiting glyph sets initially.
- Consider a display cut for headings later (e.g., "Calamari Display").

