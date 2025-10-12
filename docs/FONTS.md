Fonts — Calamari Sans (WOFF2)

Overview

- Place WOFF2 files in `public/fonts` using these names:
  - `CalamariSans-Regular.woff2`
  - `CalamariSans-Italic.woff2`
  - `CalamariSans-Semibold.woff2`
  - `CalamariSans-Bold.woff2`

What’s already wired

- `src/styles/fonts.css` adds `@font-face` entries with `font-display: swap`.
- `src/index.css` sets `--font-brand` and applies it to `body`.
- `index.html` contains commented `<link rel="preload" as="font" ...>` tags.

Steps

1. Add files to `public/fonts/` with the names above.
2. Uncomment the four `<link rel="preload">` lines in `index.html` to improve LCP.
3. Build: `npm run build` and verify no 404s in dev tools (Network tab).

Notes

- Keep only WOFF2 to minimize payload; older formats aren’t necessary for target browsers.
- If you change filenames, update `src/styles/fonts.css` and the preload hrefs accordingly.
