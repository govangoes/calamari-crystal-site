import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { PRERENDER_ROUTES } from "../../scripts/prerender-routes.mjs";

const sitemap = readFileSync("public/sitemap.xml", "utf8"); // vitest runs from the repo root;
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/www\.govangoes\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1] || "/",
);

// Static files in public/ that aren't React routes.
const STATIC_FILES = new Set(["/orlando-nightlife.html"]);

describe("sitemap and prerender routes", () => {
  it("prerenders every React page listed in the sitemap", () => {
    const missing = sitemapPaths.filter(
      (p) => !STATIC_FILES.has(p) && !PRERENDER_ROUTES.includes(p),
    );
    expect(missing).toEqual([]);
  });

  it("keeps the homepage last so it doesn't overwrite the shared template early", () => {
    expect(PRERENDER_ROUTES.at(-1)).toBe("/");
  });

  it("does not list the internal rollout page in the sitemap", () => {
    expect(sitemapPaths).not.toContain("/marketing");
  });
});
