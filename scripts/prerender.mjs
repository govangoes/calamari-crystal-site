/* global URL, setTimeout, clearTimeout */
// Prerender: after `vite build`, render each public route to static HTML and save it as
// dist/<route>/index.html (the homepage becomes dist/index.html).
//
// Why: the site is a client-rendered SPA, so crawlers that don't run JavaScript (many AI
// crawlers) only ever saw an empty <div id="root"> and the homepage's canonical tag. Saved
// per-route HTML gives them the real text, title, description and canonical URL for each page.
// Browsers still boot the normal app on top of it, and Vercel serves these files before the
// SPA rewrite, so vercel.json is untouched.
//
// Safety: each route renders in its own child process (scripts/prerender-route.mjs). Any
// failure only logs a warning and leaves that route as the normal SPA page, and this script
// always exits 0 so it can never break a deploy. Set SKIP_PRERENDER=1 to skip.

import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { PRERENDER_ROUTES as ROUTES } from "./prerender-routes.mjs";

const DIST_INDEX = fileURLToPath(new URL("../dist/index.html", import.meta.url));
const CHILD = fileURLToPath(new URL("./prerender-route.mjs", import.meta.url));

function runRoute(route) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [CHILD, route], { stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ ok: false, message: "timed out after 60s" });
    }, 60000);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (out += d));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ ok: code === 0, message: out.trim().split("\n").slice(-1)[0] || "" });
    });
  });
}

async function main() {
  if (process.env.SKIP_PRERENDER) {
    console.log("[prerender] skipped (SKIP_PRERENDER set)");
    return;
  }
  try {
    await access(DIST_INDEX);
  } catch {
    console.warn("[prerender] dist/index.html not found, skipping");
    return;
  }
  let ok = 0;
  for (const route of ROUTES) {
    const result = await runRoute(route);
    if (result.ok) ok++;
    console.log(`[prerender] ${result.ok ? "ok     " : "skipped"} ${route}  ${result.message}`);
  }
  console.log(`[prerender] done: ${ok}/${ROUTES.length} routes`);
}

main()
  .catch((err) => console.warn(`[prerender] failed, leaving the normal SPA build: ${err.message}`))
  .finally(() => process.exit(0));
