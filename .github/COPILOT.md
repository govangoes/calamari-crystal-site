# Project Guide for Copilot

**Stack:** Vite + React + React Router + TailwindCSS  
**Node:** >= 20

**Scripts**

- dev: `npm run dev`
- build: `npm run build`
- preview: `npm run preview`
- test: `npm run test`

**Folders**

- src/pages -> route pages (Home, Story, Merch, Marketing, Business, Contact, NotFound)
- src/components -> shared UI (Hero, CursorSquid, ScrollReveal)
- src/assets -> images (squid_emblem.png, cloud_gold_logo.png)

**Style**

- Tailwind utility-first, avoid inline styles.
- Keep components small & focused.
- Prefer functional components + hooks.
- Use semantic HTML and accessible aria labels.

**Routing**

- "/", "/story", "/merch", "/marketing", "/business", "/contact", "\*"

**Tasks Copilot can do**

- Add sections to Hero/Home with CTAs.
- Create Button, Card, Section components.
- Implement ScrollReveal (IntersectionObserver + framer-motion).
- Write unit tests with Vitest & @testing-library/react.
- Add GitHub Action CI to run tests on PRs.
- Optimize images via src/assets.

**Do NOT**

- Commit secrets or .env
- Modify branch protections
- Commit large binaries > 50MB
