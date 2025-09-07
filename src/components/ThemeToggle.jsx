import { useEffect, useState } from "react";

const STORAGE_KEY = "gvg-theme"; // "crystal" | "gvg"

export default function ThemeToggle(){
  const [mode, setMode] = useState("crystal");

  useEffect(() => {
    // Initialize from storage or current DOM
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "gvg" || saved === "crystal") {
      setMode(saved);
      document.documentElement.classList.toggle("theme-gvg", saved === "gvg");
    }
  }, []);

  function toggle(){
    const next = mode === "gvg" ? "crystal" : "gvg";
    setMode(next);
    document.documentElement.classList.toggle("theme-gvg", next === "gvg");
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <button onClick={toggle} className="pill" aria-label="Toggle theme">
      {mode === "gvg" ? "Calamari Crystal" : "Gold / Black"}
    </button>
  );
}
