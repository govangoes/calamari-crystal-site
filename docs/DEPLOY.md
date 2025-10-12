Deploy

Vercel (recommended)

- Settings
  - Framework: `Vite`
  - Build command: `npm run build`
  - Output directory: `dist`
- Files used
  - `vercel.json` with SPA rewrites and long‑cache headers for `/assets/*`
- Steps
  1. Connect the GitHub repo in Vercel.
  2. Select the `main` branch.
  3. Deploy; routes like `/music` work via rewrites.

Custom Domain (www.govangoes.com canonical)

- Add `govangoes.com` and `www.govangoes.com` to the project Domains in Vercel.
- Set `www.govangoes.com` as Primary (Dashboard → Domains → Set Primary). Enable “Redirect to primary domain”.
- DNS at your registrar (Squarespace):
  - Apex: `@` A record → `76.76.21.21` (Vercel Edge network)
  - `www` CNAME → `cname.vercel-dns.com`
- Additional domains: point `govangoes.net`/`govangoes.org` apex A to `76.76.21.21` and `www` CNAME to `cname.vercel-dns.com`. They will 308 → `https://www.govangoes.com` via `vercel.json`.

Notes

- `.env.example` sets `VITE_BASE_URL=https://www.govangoes.com` for canonical URLs.
- `public/robots.txt` and `public/sitemap.xml` reference `https://www.govangoes.com`.

Netlify (alternative)

- Settings
  - Build command: `npm run build`
  - Publish directory: `dist`
- Files used
  - `public/_redirects` provides `/* /index.html 200`
