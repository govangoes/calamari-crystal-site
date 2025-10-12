# Calamari Crystal – Agents Guide

## Project Overview
Calamari Crystal is a cinematic concept‑album website for GoVanGoes built with Vite + React + Tailwind. It’s deployed on Vercel and configured as a single‑page app with serverless API routes.

## Build & Test
- Install dependencies: `npm install`
- Start local development server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`
- Check lint & formatting: `npm run check`
- Auto‑fix lint issues: `npm run lint:fix`
- (Tests coming soon) Run unit tests with Vitest: `npm run test`

## Project Structure
- `src/pages` — Home, Story, Merch, Marketing, Business, Contact pages
- `src/components` — Hero, SocialLinks, CursorSquid, ScrollReveal and other reusable components
- `src/assets` — Brand images and icons
- `src/styles/palette.css` — Brand colour tokens for Tailwind
- `api/*` — Vercel serverless functions (e.g., `/api/health`, `/api/phoneme`, `/api/dict`)
- `scripts/*` — Node scripts (image optimisation, sitemap update, EXIF to manifest)
- `public/` — Static assets and `sitemap.xml`

## Coding Conventions
- Use functional React components and hooks.
- Keep components small and focused; place them in `src/components`.
- Follow ESLint rules configured in `eslint.config.js`. Run `npm run lint` before committing.
- Format code with Prettier. Run `npm run format` to auto‑format or `npm run format:check` to verify.
- For accessibility, use the `eslint-plugin-jsx-a11y` rules; include `alt` text for all images.
- Use Tailwind for styling; prefer utility classes and the brand palette in `src/styles/palette.css`.
- Use descriptive variable and function names; comment complex logic.

## Pull Request Guidelines
- Use conventional commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`) in commit messages.
- Write a clear description of the change.
- Always run `npm run check` and `npm run build` before pushing.
- Once tests are in place, ensure all tests pass by running `npm run test`.

## Deployment
- Vercel auto‑deploys commits pushed to the `main` branch.
- `vercel.json` defines SPA rewrites, security headers, and domain redirects; avoid changing them unless updating routing.
- Domains `govangoes.com` and `www.govangoes.com` should both point to this project. A 308 redirect enforces a single canonical domain (currently `www.govangoes.com`).

## Security Notes
- Never commit secrets (API keys, credentials) to the repository.
- Keep serverless functions (`api/*`) stateless and avoid heavy computation.
- Validate and sanitize user input in API routes.

