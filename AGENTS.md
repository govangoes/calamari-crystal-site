# Repository Guidelines

## Project Structure & Module Organization
- `src/` — React app code: `pages/`, `components/`, `icons/`, `styles/`, `assets/`; entry: `main.jsx`, root: `App.jsx`.
- `src/__tests__/` — unit/UI tests (Vitest + Testing Library).
- `public/` — static assets, icons, `robots.txt`, `sitemap.xml`.
- `index.html` — Vite HTML shell; Tailwind scans `index.html` and `src/**/*`.
- Brand tokens live in `tailwind.config.js` (custom colors) and `src/styles/palette.css`.

## Build, Test, and Development Commands
- `npm run dev` — start Vite dev server with HMR.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.
- `npm test` — run tests once in CI mode.
- `npm run test:watch` — watch mode during development.

## Coding Style & Naming Conventions
- React + JSX, 2‑space indent, double quotes, semicolons (match current files).
- Components/pages use PascalCase filenames (e.g., `Hero.jsx`, `Home.jsx`).
- Keep components focused; colocate small helpers within the component file.
- Tailwind: prefer semantic tokens from `tailwind.config.js`; group utilities logically (layout → spacing → color → effects).

## Testing Guidelines
- Framework: Vitest (jsdom) with Testing Library; setup in `vitest.config.ts` and `vitest.setup.ts` (includes `IntersectionObserver` mock).
- Place tests in `src/__tests__/` or alongside code as `*.test.jsx`.
- Write tests using roles/text over test IDs; cover critical render paths and interactions.
- Run locally with `npm run test:watch`; ensure `npm test` passes before PR.

## Commit & Pull Request Guidelines
- Commits: use imperative mood; Conventional Commits are encouraged (e.g., `feat:`, `fix:`, `chore:`). Keep messages concise with a focused scope.
- Open PRs using `.github/pull_request_template.md`. Include: what/why, test steps, and screenshots/video for UI.
- Checklist must pass: tests/lints locally, no secrets committed.

## Security & Configuration
- Env vars in `.env` (see `.env.example`); never commit secrets. Vite exposes only `VITE_*` keys.
- Deploy: Vercel auto‑deploys on pushes to `main`. Build: `npm run build`; output: `dist/`.
