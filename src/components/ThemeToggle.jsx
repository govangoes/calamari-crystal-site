import React, { useEffect, useState } from "react";
import { getCurrentTheme, toggleTheme } from "../utils/theme.js";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const sync = () => setTheme(getCurrentTheme());
    sync();
    window.addEventListener("gvg-theme-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gvg-theme-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className={`pill ${className}`}
      onClick={() => {
        toggleTheme();
        setTheme(getCurrentTheme());
      }}
      aria-label="Toggle color theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
