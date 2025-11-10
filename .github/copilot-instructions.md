# Calamari Crystal – Copilot Instructions

## Project Overview
Calamari Crystal is a cinematic concept-album website for GoVanGoes built with Vite + React + Tailwind. It's deployed on Vercel and configured as a single-page app with serverless API routes.

**Stack:** Vite + React + React Router + TailwindCSS  
**Node:** >= 20  
**Live Site:** https://www.govangoes.com

## Build & Test

### Setup
```bash
npm install
```

### Development
- Start local development server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

### Quality Checks
- Check lint & formatting: `npm run check`
- Lint only: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Format code: `npm run format`
- Verify formatting: `npm run format:check`
- Run tests: `npm run test` *(Tests coming soon with Vitest)*

### Environment Variables

#### Media IDs (YouTube/Spotify)
Set these in your Vercel Project → Settings → Environment Variables (and optionally in a local `.env`):
- `VITE_YT_VIDEO_ID` — YouTube video ID to feature on the Home page
- `VITE_SPOTIFY_TYPE` — one of `track`, `album`, or `playlist`
- `VITE_SPOTIFY_ID` — Spotify ID matching the selected type

Example: `VITE_SPOTIFY_TYPE=track`, `VITE_SPOTIFY_ID=1r9xUipOqoNwggBpENDsvJ`

#### Hero Image
Configure the homepage hero mark via env var:
- `VITE_HERO_IMAGE_BASENAME` — base name (without extension) of a file in `public/` (default: `govangoes-logo`). The app will try `/<BASENAME>.webp` then `/<BASENAME>.png`.
- `VITE_HERO_ALT` — accessible alt text for the hero image.

Fallback order if the custom image is missing: `cloud_gold_logo` → `squid_emblem`.

## Project Structure

### Key Directories
- `src/pages` — Route pages (Home, Story, Merch, Marketing, Business, Contact, NotFound)
- `src/components` — Hero, SocialLinks, CursorSquid, ScrollReveal and other reusable components
- `src/assets` — Brand images and icons
- `src/styles/palette.css` — Brand colour tokens for Tailwind
- `api/*` — Vercel serverless functions (e.g., `/api/health`, `/api/phoneme`, `/api/dict`)
- `scripts/*` — Node scripts (image optimisation, sitemap update, EXIF to manifest)
- `public/` — Static assets and `sitemap.xml`

### Routes
- `/` — Home
- `/story` — Story page
- `/merch` — Merchandise
- `/marketing` — Marketing page
- `/business` — Business page
- `/contact` — Contact page
- `*` — 404 NotFound

## Coding Conventions

### React & JavaScript
- Use functional React components and hooks
- Keep components small and focused; place them in `src/components`
- Prefer functional components + hooks over class components
- Use descriptive variable and function names
- Comment complex logic but avoid obvious comments

### Styling
- Use Tailwind utility-first classes; avoid inline styles
- Prefer utility classes and the brand palette in `src/styles/palette.css`
- Keep styling consistent with existing components

### Accessibility
- Follow `eslint-plugin-jsx-a11y` rules
- Include `alt` text for all images
- Use semantic HTML and accessible ARIA labels

### Code Quality
- Follow ESLint rules configured in `eslint.config.js`
- Run `npm run lint` before committing
- Format code with Prettier
- Run `npm run format` to auto-format or `npm run format:check` to verify

## Tasks Copilot Can Do

- Add sections to Hero/Home with CTAs
- Create Button, Card, Section components
- Implement ScrollReveal (IntersectionObserver + framer-motion)
- Write unit tests with Vitest & @testing-library/react
- Add GitHub Action CI to run tests on PRs
- Optimize images via `src/assets`
- Update serverless API functions in `api/*`
- Improve accessibility features

## Pull Request Guidelines

### Commit Messages
Use conventional commit prefixes:
- `feat:` — New feature
- `fix:` — Bug fix
- `chore:` — Maintenance tasks
- `docs:` — Documentation changes
- `refactor:` — Code refactoring
- `test:` — Test changes
- `style:` — Code style changes

### Before Pushing
- Always run `npm run check` and `npm run build` before pushing
- Once tests are in place, ensure all tests pass by running `npm run test`
- Write a clear description of the change

### PR Template
Follow the pull request template in `.github/pull_request_template.md`

## Deployment

- Vercel auto-deploys commits pushed to the `main` branch
- `vercel.json` defines SPA rewrites, security headers, and domain redirects; avoid changing them unless updating routing
- Domains `govangoes.com` and `www.govangoes.com` both point to this project
- A 308 redirect enforces a single canonical domain (currently `www.govangoes.com`)

## Security Notes

### Do NOT
- Commit secrets (API keys, credentials) or `.env` files to the repository
- Modify branch protections
- Commit large binaries > 50MB
- Introduce new security vulnerabilities

### API Security
- Keep serverless functions (`api/*`) stateless and avoid heavy computation
- Validate and sanitize user input in API routes
- Never expose sensitive data in API responses

## Additional Resources

- See `AGENTS.md` for detailed project documentation
- See `README.md` for quick start guide
- See `SECURITY.md` for security policy
