export const THEME_KEY = "gvg_theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || null;
  } catch {
    return null;
  }
}

function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getCurrentTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr || getSystemTheme();
}

export function applyTheme(theme) {
  const t = theme || getSystemTheme();
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  // Hints to the browser for form controls, etc.
  root.style.colorScheme = t;
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {}
  // Broadcast so components can react without prop-drilling
  window.dispatchEvent(new Event("gvg-theme-change"));
}

export function initTheme() {
  const saved = getStoredTheme();
  applyTheme(saved || getSystemTheme());

  // If user hasn't explicitly chosen, follow system changes live
  try {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (!getStoredTheme()) applyTheme(e.matches ? "dark" : "light");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener && mq.addListener(onChange);
  } catch {}
}

export function toggleTheme() {
  const now = getCurrentTheme();
  applyTheme(now === "dark" ? "light" : "dark");
}

export default { THEME_KEY, getCurrentTheme, applyTheme, initTheme, toggleTheme };
