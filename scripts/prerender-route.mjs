/* global URL, setTimeout */
// Renders ONE route to static HTML. Used by scripts/prerender.mjs; run as
// `node scripts/prerender-route.mjs /services`.
//
// It loads the app's source through Vite (no browser needed), renders it into a jsdom copy of
// dist/index.html so the pages' own effects set title/description/canonical, and writes the
// result to dist/<route>/index.html.

import { createServer } from "vite";
import { JSDOM } from "jsdom";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const route = process.argv[2];
if (!route || !route.startsWith("/")) {
  console.error("usage: prerender-route.mjs /route");
  process.exit(2);
}

const ORIGIN = "https://www.govangoes.com";
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const template = await readFile(join(DIST, "index.html"), "utf8");
const dom = new JSDOM(template, { url: ORIGIN + route, pretendToBeVisual: true });
const w = dom.window;

// Browser APIs jsdom lacks. The app only needs them not to throw.
w.matchMedia =
  w.matchMedia ||
  (() => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
const NoopObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
w.IntersectionObserver = w.IntersectionObserver || NoopObserver;
w.ResizeObserver = w.ResizeObserver || NoopObserver;
w.scrollTo = () => {};
w.fetch = () => Promise.reject(new Error("offline during prerender"));

// Expose the jsdom window as the global browser environment BEFORE React loads.
const define = (key, value) =>
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
[
  "window",
  "document",
  "navigator",
  "HTMLElement",
  "HTMLIFrameElement",
  "HTMLInputElement",
  "HTMLTextAreaElement",
  "HTMLSelectElement",
  "HTMLAnchorElement",
  "Element",
  "Node",
  "Text",
  "SVGElement",
  "MutationObserver",
  "getComputedStyle",
  "localStorage",
  "sessionStorage",
  "Event",
  "CustomEvent",
  "KeyboardEvent",
  "MouseEvent",
  "FocusEvent",
  "DOMParser",
  "history",
  "location",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "matchMedia",
  "IntersectionObserver",
  "ResizeObserver",
  "fetch",
].forEach((key) => define(key, w[key]));
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
});

let exitCode = 0;
try {
  const React = await import("react");
  const { act } = React;
  const { createRoot } = await import("react-dom/client");
  const { MemoryRouter } = await import("react-router-dom");
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

  const rootEl = w.document.getElementById("root");
  const root = createRoot(rootEl);
  await act(async () => {
    root.render(
      React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App)),
    );
  });

  // Lazy page chunks resolve asynchronously; wait for a real heading.
  const started = Date.now();
  while (Date.now() - started < 15000 && !rootEl.querySelector("h1")) {
    await act(async () => {
      await sleep(100);
    });
  }
  await act(async () => {
    await sleep(300); // let effects (page title, meta tags) run
  });

  const textLength = rootEl.textContent.trim().length;
  if (!rootEl.querySelector("h1") || textLength < 100) {
    throw new Error(`rendered too little content (text=${textLength})`);
  }

  // Canonical and og:url must match this route.
  const doc = w.document;
  const canonicalUrl = ORIGIN + route;
  let canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = doc.createElement("link");
    canonical.setAttribute("rel", "canonical");
    doc.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalUrl);
  doc.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);

  const html = "<!doctype html>\n" + doc.documentElement.outerHTML;
  const dir = join(DIST, route.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  console.log(`"${doc.title}" (${textLength} chars)`);
} catch (err) {
  console.error(err.message);
  exitCode = 1;
} finally {
  await vite.close();
  process.exit(exitCode);
}
