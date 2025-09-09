const STORAGE_KEY = 'theme'; // 'light' | 'dark'

export function getStoredTheme() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark' : 'light';
}

export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch {}

  // Update <meta name="theme-color">
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0A0A0E' : '#F7F7FB');
  }
}

export function initTheme() {
  const stored = getStoredTheme();
  const theme = stored || getSystemTheme();
  applyTheme(theme);

  // React to system changes if user hasn't explicitly chosen
  if (!stored && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(mq.matches ? 'dark' : 'light');
    try {
      mq.addEventListener('change', handler);
    } catch {
      // Safari fallback
      mq.addListener(handler);
    }
  }
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
}

export default {
  getStoredTheme,
  getSystemTheme,
  applyTheme,
  initTheme,
  toggleTheme,
};

