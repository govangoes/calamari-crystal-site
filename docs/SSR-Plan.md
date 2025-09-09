# SSR/SSG Plan

This site currently runs as a Vite + React SPA. For stronger SEO and faster first paint on content pages, adopt SSG/SSR while preserving the existing file structure and routes.

## Option A — vite-plugin-ssr (lighter migration)
- Keep Vite + React; add `vite-plugin-ssr`.
- Create `pages/` entries with `.page.jsx` and `.page.route.js` to map current routes.
- Use `onBeforeRender` to fetch any data; return `pageContext` to templates.
- Add `_default.page.server.jsx` and `_default.page.client.jsx` for layout; include `<Head>` for SEO tags.
- Pros: Minimal change to tooling; deploy on Vercel as Serverless/Edge; can pre-render most static pages.
- Cons: Smaller ecosystem than Next.js.

## Option B — Next.js (full framework)
- `pages/` or `app/` router. Use `getStaticProps`/`generateMetadata` for SSG + SEO.
- Map current routes: `/story`, `/music`, `/listen`, `/videos`, `/shop`, `/bookings`, `/about`, `/press`, `/privacy`, `/terms`.
- Use `next/head` or the app router metadata API for canonical, OG/Twitter.
- Pros: Strong ecosystem, Image optimization, font utilities.
- Cons: Larger migration; some Vite-specific features replaced.

## Recommended Phasing
1) Stabilize SEO via runtime (done) and ensure route parity (done).
2) Pilot vite-plugin-ssr on a branch: pre-render `Home`, `Press`, `Shop`.
3) If needs grow (CMS, API, image pipelines), consider Next.

## Tasks Breakdown (vite-plugin-ssr)
- Install: `npm i vite-plugin-ssr react-streaming`.
- Create server entry `server/index.js` for dev/preview SSR; add Vercel adapter for production.
- Convert `src/pages/*` to `.page.jsx` with route files.
- Create `src/renderer/_default.page.server.jsx` (wraps App; injects route-level SEO).
- Enable pre-render for static pages; fall back to SSR for dynamic.

## CDN/Cache Strategy
- Pre-rendered HTML cached on CDN; JSON/JS incrementally cached.
- Invalidate on deploy; stale-while-revalidate for assets.

## Fonts & Images
- Keep WOFF2 self-hosted + preload.
- Convert large hero assets to WebP/AVIF; use `<picture>`.

## Analytics
- Load Plausible only on production domains; add domain toggle when switching.

## Rollout
- Branch-based deployment on Vercel.
- Monitor Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and crawl stats.
