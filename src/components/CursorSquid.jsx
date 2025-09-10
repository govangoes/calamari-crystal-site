import { useEffect, useRef, useState } from "react";

// Ink trail cursor: lightweight particle trail that adapts to light/dark
export default function CursorSquid() {
  const [trail, setTrail] = useState([]);
  const idRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const id = ++idRef.current;
      setTrail((t) => {
        const next = [...t, { id, x: e.clientX, y: e.clientY, life: 1 }];
        // keep last 28 particles
        return next.slice(Math.max(0, next.length - 28));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const decay = () => {
      setTrail((t) =>
        t
          .map((p) => ({ ...p, life: p.life - 0.04 }))
          .filter((p) => p.life > 0)
      );
      rafRef.current = requestAnimationFrame(decay);
    };
    rafRef.current = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {trail.map((p) => {
        const scale = 0.6 + p.life * 0.8; // 0.6 → 1.4
        const opacity = 0.10 + p.life * 0.35; // fades out
        const tx = p.x - 10;
        const ty = p.y - 10;
        return (
          <div
            key={p.id}
            className="absolute will-change-transform"
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}
          >
            {/* Core ink dot (adapts to theme) */}
            <div
              className="h-5 w-5 rounded-full bg-ink/80 dark:bg-ultraviolet/35"
              style={{ opacity }}
            />
            {/* Neon ring glow on dark mode */}
            <div
              className="-mt-5 h-5 w-5 rounded-full ring-2 ring-crystal/50 shadow-crystal hidden dark:block"
              style={{ opacity: opacity * 0.9 }}
            />
          </div>
        );
      })}
    </div>
  );
}
