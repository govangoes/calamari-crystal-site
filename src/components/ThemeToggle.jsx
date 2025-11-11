import { useEffect, useId, useRef, useState } from "react";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion.js";
import { setAnimationPreference, useAnimationPreference } from "../utils/animationPreference.js";
import "./ThemeToggle.css";

const DARK_MESSAGE = "Diving deeper – the crystal glows in the abyss";
const LIGHT_MESSAGE = "Surface waters – the crystal shines in daylight";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  } catch {
    return "dark";
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [ripple, setRipple] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationsEnabled = useAnimationPreference();
  const buttonRef = useRef(null);
  const allowMotion = animationsEnabled && !prefersReducedMotion;
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Ignore localStorage errors (e.g., private browsing mode)
    }
  }, [theme]);

  useEffect(() => {
    if (!showMessage) return undefined;
    const timer = window.setTimeout(() => {
      setShowMessage(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [showMessage]);

  useEffect(() => {
    if (!ripple) return undefined;
    const timer = window.setTimeout(() => setRipple(null), 320);
    return () => window.clearTimeout(timer);
  }, [ripple]);

  useEffect(() => {
    if (showMessage) {
      setLiveMessage(message);
    }
  }, [showMessage, message]);

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setMessage(nextTheme === "dark" ? DARK_MESSAGE : LIGHT_MESSAGE);
    setShowMessage(true);

    if (allowMotion && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipple({
        key: Date.now(),
        theme: nextTheme,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const handleAnimationToggle = () => {
    setAnimationPreference(!animationsEnabled);
    setMessage(!animationsEnabled ? "Animations enabled" : "Animations paused");
    setShowMessage(true);
  };

  const title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <div className="theme-toggle">
      <button
        ref={buttonRef}
        type="button"
        className="theme-toggle__button"
        aria-pressed={theme === "dark"}
        onClick={handleThemeToggle}
        title={title}
      >
        <CrystalIcon mode={theme} />
        <span className="sr-only">Toggle theme</span>
      </button>

      <button
        type="button"
        className="theme-toggle__anim"
        aria-pressed={animationsEnabled}
        onClick={handleAnimationToggle}
        title={animationsEnabled ? "Disable ambient animations" : "Enable ambient animations"}
      >
        <span
          className="theme-toggle__anim-indicator"
          data-active={animationsEnabled}
          aria-hidden="true"
        />
        <span className="theme-toggle__anim-label">
          Animations {animationsEnabled ? "On" : "Off"}
        </span>
      </button>

      <div
        className={`theme-toggle__message ${showMessage ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>

      {allowMotion && ripple ? (
        <span
          key={ripple.key}
          className={`theme-ripple theme-ripple--${ripple.theme}`}
          style={{
            "--ripple-x": `${ripple.x}px`,
            "--ripple-y": `${ripple.y}px`,
          }}
          aria-hidden="true"
        />
      ) : null}
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </div>
  );
}

function CrystalIcon({ mode }) {
  const gradientId = useId();
  const glowId = `${gradientId}-glow`;
  const mantleId = `${gradientId}-mantle`;

  return (
    <svg
      className={`theme-toggle__icon theme-toggle__icon--${mode}`}
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="var(--crystal-glow)" stopOpacity="0.8" />
          <stop offset="60%" stopColor="var(--crystal-glow)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={mantleId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tentacle-accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--tentacle-accent)" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="18" r="18" fill={`url(#${glowId})`} />
      <path
        d="M24 6 L34 16 L28 34 L20 34 L14 16 Z"
        fill={`url(#${mantleId})`}
        stroke="var(--crystal-glow)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M24 16 L28 22 L24 28 L20 22 Z"
        fill="var(--crystal-glow)"
        opacity={mode === "dark" ? 0.95 : 0.7}
      />
      <path
        d="M18 34 C18 38 16 40 14 42"
        stroke="var(--tentacle-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 34 C22 38 20 41 18 43"
        stroke="var(--tentacle-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M26 34 C26 38 28 41 30 43"
        stroke="var(--tentacle-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 34 C30 38 32 40 34 42"
        stroke="var(--tentacle-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
