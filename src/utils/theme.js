export function getPreferredTheme() {
  const saved = window.localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  const t = theme || getPreferredTheme();
  document.documentElement.setAttribute('data-theme', t);
  // Sync browser UI color on mobile
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'dark' ? '#0A0A0E' : '#FFFFFF');
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  window.localStorage.setItem('theme', next);
  applyTheme(next);
}

// New helpers compatible with requested API
export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try { window.localStorage.setItem('theme', theme); } catch {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0A0A0E' : '#FFFFFF');
  }
}

// Detect system preference once, then persist user override.
export function initTheme() {
  // 1) read persisted choice; 2) fall back to system; 3) default dark
  const saved = (() => { try { return window.localStorage.getItem('theme'); } catch { return null; } })();
  const systemPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || systemPref || 'dark';
  setTheme(theme);
}

export default {
  getPreferredTheme,
  applyTheme,
  toggleTheme,
  setTheme,
  initTheme,
};
