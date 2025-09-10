import { useEffect, useRef, useState } from "react";

const MAX_PARTICLES = 48;
const DECAY_RATE = 0.04;        // normal trail fade speed
const SPLAT_DECAY_RATE = 0.02;  // slower fade for click splats

// Ink trail cursor: particles follow pointer; click creates larger "splat" pulses.
export default function CursorSquid() {
  const [trail, setTrail] = useState([]);
  const idRef = useRef(0);
  const rafRef = useRef(0);
  const disabledRef = useRef(false);
  const [squid, setSquid] = useState({ x: -100, y: -100, deg: 0 });

  useEffect(() => {
    // Respect reduced motion
    try {
      const m = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
      disabledRef.current = !!(m && m.matches);
      if (m && m.addEventListener) {
        m.addEventListener('change', (e) => { disabledRef.current = e.matches; });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (disabledRef.current) return;
      // Update squid position + direction
      setSquid((prev) => {
        const dx = e.clientX - (prev.x === -100 ? e.clientX : prev.x);
        const dy = e.clientY - (prev.y === -100 ? e.clientY : prev.y);
        const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
        return { x: e.clientX, y: e.clientY, deg };
      });
      const id = ++idRef.current;
      setTrail((t) => {
        const next = [...t, { id, x: e.clientX, y: e.clientY, life: 1, splat: false }];
        return next.slice(Math.max(0, next.length - MAX_PARTICLES));
      });
    };
    const onDown = (e) => {
      if (disabledRef.current) return;
      // Create a small cluster of splats around the click point
      const baseId = ++idRef.current;
      const pts = Array.from({ length: 6 }, (_, i) => ({
        id: baseId + i + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 18,
        y: e.clientY + (Math.random() - 0.5) * 18,
        life: 1.1,
        splat: true,
      }));
      setTrail((t) => {
        const next = [...t, ...pts];
        return next.slice(Math.max(0, next.length - MAX_PARTICLES));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  useEffect(() => {
    const decay = () => {
      setTrail((t) =>
        t
          .map((p) => ({ ...p, life: p.life - (p.splat ? SPLAT_DECAY_RATE : DECAY_RATE) }))
          .filter((p) => p.life > 0)
      );
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Hide system cursor while active (unless reduced motion)
  useEffect(() => {
    if (!disabledRef.current) {
      const prev = document.body.style.cursor;
      document.body.style.cursor = 'none';
      return () => { document.body.style.cursor = prev; };
    }
  }, []);

  if (disabledRef.current) return null;

  const size = 36; // squid size in px (slightly larger)

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {trail.map((p) => {
        const size = p.splat ? 18 + p.life * 22 : 8 + p.life * 10; // px
        const opacity = (p.splat ? 0.16 : 0.10) + p.life * (p.splat ? 0.32 : 0.35);
        const tx = p.x - size / 2;
        const ty = p.y - size / 2;
        return (
          <div
            key={p.id}
            className="absolute will-change-transform"
            style={{ transform: `translate(${tx}px, ${ty}px)` }}
          >
            <div className="relative" style={{ width: size, height: size }}>
              {/* Core ink dot (adapts to theme) */}
              <div
                className="absolute inset-0 rounded-full bg-ink/70 dark:bg-ultraviolet/35"
                style={{ opacity }}
              />
              {/* Neon ring glow on dark mode */}
              <div
                className="absolute inset-0 rounded-full ring-2 ring-crystal/50 shadow-crystal hidden dark:block"
                style={{ opacity: opacity * 0.9 }}
              />
            </div>
          </div>
        );
      })}

      {/* Squid cursor */}
      <div
        className="absolute will-change-transform drop-shadow"
        style={{
          transform: `translate(${squid.x - size / 2}px, ${squid.y - size / 2}px) rotate(${squid.deg}deg)`,
          width: size,
          height: size,
        }}
      >
        <SquidIcon />
      </div>
    </div>
  );
}

function SquidIcon() {
  // Simple stylized squid with tentacles; colors adapt via Tailwind text color
  return (
    <svg viewBox="0 0 28 28" className="h-full w-full text-ultraviolet dark:text-crystal" aria-hidden>
      <defs>
        <linearGradient id="squidBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* Head / mantle */}
      <path d="M14 2 L22 10 C22 14 18 16 14 16 C10 16 6 14 6 10 Z" fill="url(#squidBody)"/>
      {/* Eyes */}
      <circle cx="12" cy="10" r="1.3" fill="#0b0a0f" opacity=".9"/>
      <circle cx="16" cy="10" r="1.3" fill="#0b0a0f" opacity=".9"/>
      {/* Tentacles */}
      <path d="M10 16 C9 19 8 22 9.5 24" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M12 16 C11.5 19 11 22 12.4 24" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M14 16 C14 19 14 22 14.8 24" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M16 16 C16.5 19 17 22 16 24" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M18 16 C19 19 20 22 18.5 24" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
