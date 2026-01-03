# GoVanGoes — Calamari Crystal

A cinematic, under-sea concept-album website for GoVanGoes, built to showcase music, visuals, merch, and service offerings for Cloutlandish LLC.

**Stack:** Vite + React + Tailwind CSS  
**Hosting:** Vercel (auto-deploy on push to main)  
**Live:** https://calamari-crystal-site.vercel.app

## Requirements

- **Node.js:** 20.x
- **npm:** >= 9.0.0

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

- `npm run dev` — Start local development server
- `npm run build` — Production build (includes image optimization & sitemap update)
- `npm run preview` — Preview production build locally
- `npm run check` — Run linting and format checks
- `npm run lint` — Lint code
- `npm run lint:fix` — Auto-fix linting issues
- `npm run format` — Format code with Prettier
- `npm run format:check` — Check code formatting
- `npm run img:opt` — Optimize images (generates WebP)
- `npm run clean` — Remove build artifacts
- `npm run test` — Run tests (Vitest)

## Project Structure

```
src/
├── pages/          # Route pages (Home, Story, Merch, Marketing, Business, Contact)
├── components/     # Reusable components (Hero, SocialLinks, CursorSquid, ScrollReveal)
├── assets/         # Brand images and icons
├── styles/         # CSS files and Tailwind palette tokens
└── utils/          # Utility functions

api/                # Vercel serverless functions (/api/health, /api/phoneme, /api/dict)
scripts/            # Build scripts (image optimization, sitemap, EXIF)
public/             # Static assets and sitemap.xml
```

## Development Workflow

1. Run `npm run dev` and verify `/` and `/services` render correctly
2. Make changes and test locally
3. Before committing, run:
   - `npm run build` — Ensure production build succeeds
   - `npm run check` — Verify linting and formatting
   - `npm run preview` — Optional: final smoke check
4. Commit with conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:`)
5. Push to `main` — Vercel auto-deploys

## Environment Variables

Configure these in Vercel Project Settings → Environment Variables (or local `.env`):

**Media Integration:**
- `VITE_YT_VIDEO_ID` — YouTube video ID for Home page
- `VITE_SPOTIFY_TYPE` — `track`, `album`, or `playlist`
- `VITE_SPOTIFY_ID` — Spotify ID matching the type

**Hero Image:**
- `VITE_HERO_IMAGE_BASENAME` — Base name (without extension) in `public/` (default: `govangoes-logo`)
- `VITE_HERO_ALT` — Alt text for hero image

Example:
```env
VITE_SPOTIFY_TYPE=track
VITE_SPOTIFY_ID=1r9xUipOqoNwggBpENDsvJ
VITE_YT_VIDEO_ID=dQw4w9WgXcQ
```

## Deployment

- **Auto-deploy:** Vercel automatically deploys commits pushed to `main`
- **Domains:** `govangoes.com` and `www.govangoes.com` (308 redirect to canonical domain)
- **Configuration:** `vercel.json` handles SPA rewrites, security headers, and redirects

## Key Features

- Single-page application (SPA) with React Router
- Serverless API routes (`/api/*`)
- Responsive design with Tailwind CSS
- Accessible components (ARIA labels, semantic HTML)
- Image optimization (WebP generation)
- SEO-friendly (sitemap, meta tags)

## Business Priority Pages

- `/services` — Must always render and sell services
- `/contact` — Booking CTA
- `/` — Hero must sell services

## Documentation

For detailed development guidelines, coding conventions, and troubleshooting, see **[AGENTS.md](./AGENTS.md)**.

## License

MIT — see [LICENSE](./LICENSE) file.
