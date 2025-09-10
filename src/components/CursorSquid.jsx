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

  if (disabledRef.current) return null;

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
    </div>
  );
}
