A cinematic, under-sea concept-album website for GoVanGoes (Calamari Crystal).
Stack: Vite + React + Tailwind, deployed on Vercel.

Live: https://calamari-crystal-site.vercel.app

Quickstart
• npm install
• npm run dev
• npm run build && npm run preview

Structure
• src/pages — Home, Story, Merch, Marketing, Business, Contact
• src/components — Hero, SocialLinks, CursorSquid, ScrollReveal
• src/assets — brand images/icons
• src/styles/palette.css — brand tokens

Deploy

Vercel auto-deploys on push to main.

License

MIT — see LICENSE.# Final Hope — GoVanGoes (Calamari Crystal)
Vite + React + Tailwind site with underwater aesthetic, floating squid cursor, scroll reveals, and Coral Glow dark mode.

## Scripts

- `npm i`
- `npm run dev` — start locally
- `npm run build` — production build
- `npm run preview` — preview production

## Deploy

Push to GitHub (main or dev). Connect repo to Vercel (Framework: Vite). Build command: `npm run build`. Output: `dist`.

## Domains + SPA Routing Checklist

- Vercel project config
  - Ensure this repo’s project has both domains added: `govangoes.com` (apex) and `www.govangoes.com` (www).
  - If `www` is attached to a different project, use “Move Domain” in Vercel → Project → Settings → Domains.
  - This repo ships `vercel.json` with:
    - `redirects` to canonicalize `www.*` → `https://govangoes.com` (308).
    - `rewrites` mapping all routes to `/index.html` for SPA deep links.
    - `/api/*` rewrites preserved for lightweight functions (`/api/health`, `/api/phoneme`, `/api/dict`).

- DNS (if managed outside Vercel DNS)
  - Apex `@` A record → `76.76.21.21` (Vercel).
  - `www` CNAME → `cname.vercel-dns.com`.
  - Remove any stale A/CNAME records pointing at old hosts/projects.

- Static SPA fallback (non‑Vercel hosts)
  - Netlify/Static: publish `dist` and include `public/_redirects` with `/* /index.html 200`.
  - Any CDN: set a catch‑all to serve `/index.html` for unknown routes.

- Quick verification
  - `https://www.govangoes.com` should 308 redirect to `https://govangoes.com/`.
  - `https://govangoes.com/story` should load and refresh without 404.
  - `https://govangoes.com/health` should return `{ ok: true }`.
  - `https://govangoes.com/api/phoneme?q=calamari crystal` should return JSON.

Notes

- If you prefer serving both `www` and apex without redirect, remove the `www` redirects in `vercel.json` and add both domains to the same project.
- If `/api/dict` returns 503, run `npm run dict:build` to generate `src/data/dictionary.json` (optional features still work without it).
