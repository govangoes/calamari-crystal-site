// Public pages that get prerendered to static HTML (see scripts/prerender.mjs).
// "/" must stay last: it overwrites dist/index.html, which the other routes use as a template.
// Keep in sync with public/sitemap.xml (a test checks this).
export const PRERENDER_ROUTES = [
  "/services",
  "/bookings",
  "/about",
  "/story",
  "/music",
  "/press",
  "/contact",
  "/merch",
  "/marketing",
  "/artists",
  "/upload",
  "/lyrics-lab",
  "/rap-map",
  "/open-mics-orlando",
  "/privacy",
  "/terms",
  "/",
];
