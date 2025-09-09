import { useEffect, useState } from "react";
import { applyTheme, toggleTheme, getCurrentTheme } from "../utils/theme.js";

export default function ThemeToggle(){
  const [mode, setMode] = useState('dark');
  useEffect(() => { const t=getCurrentTheme(); setMode(t); applyTheme(t); }, []);
  function onClick(){
    toggleTheme();
    const t = document.documentElement.getAttribute('data-theme') || 'dark';
    setMode(t);
  }
  return (
    <button className="pill" aria-label="Toggle theme" onClick={onClick} style={{gap:8}}>
      {mode === 'dark' ? '🌙' : '☀️'} <span>{mode === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
