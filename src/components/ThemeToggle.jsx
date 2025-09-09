import { useEffect, useState } from "react";
import { initTheme, toggleTheme } from "../utils/theme.js";

export default function ThemeToggle(){
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme') || 'light'
      : 'light'
  );

  useEffect(() => {
    initTheme();
    const t = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(t);

    // Observe attribute changes so UI stays in sync
    const obs = new MutationObserver(() => {
      const next = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(next);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const onClick = () => {
    toggleTheme();
    const next = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(next);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onClick}
      className="pill"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{gap:8}}
    >
      <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

