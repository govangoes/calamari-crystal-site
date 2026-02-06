# Architecture Overview

High-level structure of calamari-crystal-site for onboarding and maintenance. Keeps **Knowledge Distribution** healthy by documenting where key behavior lives.

---

## Stack

- **Runtime:** Vite + React 18, React Router 6
- **Styling:** Tailwind CSS, brand tokens in `src/styles/theme.css` and `src/styles/palette.css`
- **Hosting:** Vercel (SPA + serverless `api/*`)

---

## Entry and Routing

- **Entry:** `src/main.jsx` — mounts `App` with `BrowserRouter`.
- **Shell:** `src/App.jsx` — global layout (TopNav, Footer), deep-sea gradient background, and `<Routes>`.
- **Routes:** All route definitions live in `App.jsx`; page components in `src/pages/`.

| Route | Page | Notes |
|-------|------|--------|
| `/` | Home | Hero, CTAs, feature pills |
| `/services` | Services | Artist development offerings (glass cards) |
| `/contact`, `/bookings` | Contact, Bookings | Booking CTAs |
| `/press` | Press | EPK gallery + content from `src/content/epkPhotos.js` |
| `/music` | Music | Player embed (env: Spotify/YouTube IDs) |
| `/rap-map` | RapMap | Explorer + artist list from `src/data/rapMapArtists.js` |
| `/lyrics-lab` | LyricsLab | Lyrics analysis UI + `src/utils/lyricsAnalysis.js` |
| `/open-mics` | OpenMicsOrlando | List/filter driven by `src/data/orlandoOpenMics.js` |
| `/artists`, `/artists/:id` | Artists, ArtistProfile | Roster and profile detail |
| `/story`, `/merch`, `/marketing`, `/business`, `/about` | Various | Marketing/content pages |
| `/privacy`, `/terms` | Privacy, Terms | Legal |
| `*` | NotFound | 404 |

---

## Key Directories

| Path | Purpose |
|------|--------|
| `src/pages/` | Route-level components; one main component per route. |
| `src/components/` | Reusable UI (Hero, NavBar, TopNav, Footer, Lightbox, EPKGallery, CursorSquid, etc.). |
| `src/content/` | Copy and media config (e.g. `epkPhotos.js`, `media.js`). |
| `src/data/` | Static data: `orlandoOpenMics.js`, `rapMapArtists.js`. |
| `src/utils/` | Pure logic: `lyricsAnalysis.js`, `seo.js`. |
| `src/styles/` | Theme, palette, fonts. |
| `src/icons/` | Social/brand SVG components (e.g. Spotify, Instagram). |
| `api/` | Vercel serverless handlers (e.g. `api/dict.js`). |
| `scripts/` | Build-time: image optimization, sitemap, EXIF→manifest. |
| `public/` | Static assets; sitemap. |

---

## Hotspots (Higher Complexity / Churn)

Files that are large or central to behavior; good candidates for tests and clear comments.

| File | Role |
|------|------|
| `src/data/orlandoOpenMics.js` | Large array of open mic venues; shape is stable (name, location, day, time, genre, etc.). |
| `src/components/RapMapExplorer.jsx` | Interactive Rap Map UI; state and map logic. |
| `src/components/LyricsLabContent.jsx` | Lyrics Lab UI and integration with analysis. |
| `src/utils/lyricsAnalysis.js` | Core lyrics analysis (counts, phrases); keep pure and covered by tests. |
| `src/components/NavBar.jsx` | Main nav and mobile menu. |
| `src/components/CursorSquid.jsx` | Cursor-follow effect. |
| `src/pages/ArtistProfile.jsx` | Dynamic artist profile and data wiring. |
| `src/pages/RapMap.jsx` | Rap Map page and data from `rapMapArtists.js`. |

---

## Theming and Brand

- **Dark default:** App shell uses a dark gradient (`from-slate-900 via-[#0a0a0a] to-black`) and `text-paperWhite`.
- **Tokens:** `tailwind.config.js` extends colors (e.g. `crystal`, `paperWhite`, `graphite`, `monteGold`) from `src/styles/theme.css` (light/dark).
- **Palette:** `src/styles/palette.css` adds brand utilities (e.g. `shadow-crystal`, `bg-squid-gradient`).

---

## Data Flow

- **Static data:** Imported directly (e.g. `orlandoOpenMics`, `rapMapArtists`, `epkPhotos`). No global store.
- **Env:** `VITE_*` in `.env` / Vercel for YouTube/Spotify IDs, hero image basename, etc. See AGENTS.md.
- **API:** Serverless routes under `api/`; called via fetch where needed (e.g. dict/phoneme).

---

## Testing and Quality

- **Vitest:** Unit tests (e.g. `src/utils/lyricsAnalysis.js`), component/smoke tests in `src/__tests__/` and next to components.
- **CI:** `.github/workflows/ci.yml` runs lint, test, and build on push and PR.
- **Code health:** See `docs/code-health-strategy.md` and PR template Code Health checklist.
