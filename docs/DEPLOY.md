Deploy

Vercel (recommended)
- Settings
  - Framework: `Vite`
  - Build command: `npm run build`
  - Output directory: `dist`
- Files used
  - `vercel.json` with SPA rewrites and long‑cache headers for `/assets/*`
- Steps
  1) Connect the GitHub repo in Vercel.
  2) Select the `main` branch.
  3) Deploy; routes like `/music` work via rewrites.

Netlify (alternative)
- Settings
  - Build command: `npm run build`
  - Publish directory: `dist`
- Files used
  - `public/_redirects` provides `/* /index.html 200`

