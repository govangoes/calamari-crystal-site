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

5) SSG/SSR migration (future)
- Consider vite-plugin-ssr or Next.js for stronger SEO on content pages
- Persist current routes and head tags via SSR for crawlability

6) Accessibility polish
- Ensure all decorative SVGs are `aria-hidden="true"`
- Review color contrast against new light/dark tokens

7) Analytics hygiene
- Validate single analytics snippet in production only

