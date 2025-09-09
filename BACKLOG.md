Backlog — SEO/UX Improvements

1) Route-level SEO refinements
- Re-introduce Home setSEO call with canonical and absolute OG image
- Add per-route Twitter/OG extras (author, site, image alt)

2) Linting and formatting
- Add ESLint + Prettier with React, Testing Library plugins
- Wire `npm run lint` and CI check

3) Asset optimization
- Convert large PNGs to WebP/AVIF; compress hero and OG images
- Add `preload` or `fetchpriority=high` for critical hero image if used

4) Fonts and CLS
- Preload primary font(s) and use `font-display: swap`
- Verify no layout shift in header/hero on first paint
 - Add WOFF2 files for Calamari Sans; add `<link rel="preload" as="font" crossorigin>` once files are present
 - Optional: design SVG wordmark for header; replace text brand
 - Optional: create a Display cut for H1/H2 later

5) SSG/SSR migration (future)
- Consider vite-plugin-ssr or Next.js for stronger SEO on content pages
- Persist current routes and head tags via SSR for crawlability

6) Accessibility polish
- Ensure all decorative SVGs are `aria-hidden="true"`
- Review color contrast against new light/dark tokens

7) Analytics hygiene
- Validate single analytics snippet in production only

8) New routes and pages
- Add route/page skeletons for: Music (/music), Bookings (/bookings), About (/about), Press (/press)
- Add policy pages: Privacy (/privacy), Terms (/terms)
- Wire header nav to new routes; add to sitemap.xml with absolute URLs
- Add route-level setSEO for each new page (title/description/canonical)

9) Domain alignment
- When govangoes.com is live, switch og:url and canonical back to the primary domain
- Update robots.txt sitemap URL accordingly

10) EPK Automation
- Install EXIF reader: `npm i -D exifr`
- Run `npm run epk:exif` to auto-fill date/location in manifest from image EXIF (GPS/DateTimeOriginal)
- Curate captions/notes in `public/images/you/manifest.json`
