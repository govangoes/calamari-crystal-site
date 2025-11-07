import { useEffect, useMemo, useState } from "react";
import Parallax from "./Parallax.jsx";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion.js";
import { useAnimationPreference } from "../utils/animationPreference.js";
import "./Hero.css";

const floatingCrystals = [
  { id: "c1", size: 140, top: 12, left: 8, delay: 0, duration: 28 },
  { id: "c2", size: 90, top: 68, left: 16, delay: 2.6, duration: 24 },
  { id: "c3", size: 120, top: 22, left: 74, delay: 1.8, duration: 30 },
  { id: "c4", size: 70, top: 58, left: 78, delay: 3.2, duration: 22 },
  { id: "c5", size: 100, top: 78, left: 42, delay: 0.8, duration: 26 },
  { id: "c6", size: 150, top: 8, left: 46, delay: 1.2, duration: 32 },
];

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationsEnabled = useAnimationPreference();
  const allowMotion = useMemo(
    () => animationsEnabled && !prefersReducedMotion,
    [animationsEnabled, prefersReducedMotion],
  );
  const [cristoVisible, setCristoVisible] = useState(!allowMotion);
  const [copyVisible, setCopyVisible] = useState(!allowMotion);

  useEffect(() => {
    if (!allowMotion) {
      setCristoVisible(true);
      setCopyVisible(true);
      return undefined;
    }
    setCristoVisible(false);
    setCopyVisible(false);
    const mantleTimer = window.setTimeout(() => setCristoVisible(true), 180);
    const copyTimer = window.setTimeout(() => setCopyVisible(true), 920);
    return () => {
      window.clearTimeout(mantleTimer);
      window.clearTimeout(copyTimer);
    };
  }, [allowMotion]);

  return (
    <section className="hero-cristo" aria-labelledby="hero-headline">
      <div className="hero-cristo__backdrop" aria-hidden="true" />
      {allowMotion ? (
        <div className="hero-cristo__particles" aria-hidden="true">
          {floatingCrystals.map((crystal) => (
            <span
              key={crystal.id}
              className="hero-cristo__particle"
              style={{
                width: `${crystal.size}px`,
                height: `${crystal.size}px`,
                top: `${crystal.top}%`,
                left: `${crystal.left}%`,
                animationDelay: `${crystal.delay}s`,
                animationDuration: `${crystal.duration}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="hero-cristo__content">
        <div className={`hero-cristo__illustration ${cristoVisible ? "is-visible" : ""}`}>
          <Parallax amount={allowMotion ? 20 : 0} className="hero-cristo__parallax">
            <CristoIllustration glowing={cristoVisible} />
          </Parallax>
        </div>

        <div className={`hero-cristo__copy ${copyVisible ? "is-visible" : ""}`}>
          <p className="hero-cristo__eyebrow">Cristo the Calamari Sentinel</p>
          <h1 id="hero-headline" className="hero-cristo__headline">
            The crystal chooses the bold.
          </h1>
          <p className="hero-cristo__subhead">
            Cristo emerges from the abyss bearing the Calamari Crystal, igniting GoVanGoes&rsquo;
            undersea mythos with bioluminescent hip-hop.
          </p>
          <div className="hero-cristo__actions">
            <a className="btn btn-primary" href="/music">
              Listen Now
            </a>
            <a
              className="btn btn-secondary"
              href="https://www.youtube.com/@govangoes"
              target="_blank"
              rel="noreferrer"
            >
              Watch a Performance
            </a>
            <a className="btn btn-tertiary" href="/merch">
              Shop the Drop
            </a>
          </div>
        </div>
      </div>

      <a href="#sections" className="scroll-cue" aria-label="Scroll to content">
        <span>Descend</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}

function CristoIllustration({ glowing }) {
  return (
    <svg
      className={`hero-cristo__svg ${glowing ? "is-glowing" : ""}`}
      viewBox="0 0 420 420"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cristo-glow" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="var(--crystal-glow)" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--crystal-glow)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="cristo-mantle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tentacle-accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--tentacle-accent)" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="cristo-tentacle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tentacle-accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--tentacle-accent)" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="cristo-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--crystal-glow)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--coral-accent)" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <circle cx="210" cy="160" r="160" fill="url(#cristo-glow)" />
      <path
        d="M210 30 L320 140 L270 320 L150 320 L100 140 Z"
        fill="url(#cristo-mantle)"
        stroke="var(--crystal-glow)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d="M210 145 L255 205 L210 260 L165 205 Z"
        fill="url(#cristo-crystal)"
        stroke="var(--crystal-glow)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M160 320 C150 360 130 390 105 400"
        stroke="url(#cristo-tentacle)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M190 320 C185 360 160 395 140 405"
        stroke="url(#cristo-tentacle)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M230 320 C240 360 265 395 290 405"
        stroke="url(#cristo-tentacle)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M255 320 C270 355 300 385 320 398"
        stroke="url(#cristo-tentacle)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="180" cy="190" r="14" fill="#05121f" opacity="0.9" />
      <circle cx="240" cy="190" r="14" fill="#05121f" opacity="0.9" />
      <circle cx="210" cy="120" r="18" fill="rgba(255, 255, 255, 0.12)" />
    </svg>
  );
}
