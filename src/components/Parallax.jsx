import { useEffect, useRef } from "react";

export default function Parallax({ amount = 24, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const win = window;

    const prefersReduced = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // Respect users that prefer reduced motion

    let raf = 0;
    function update() {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = win.innerHeight || 1;
      // -1 at top, 0 at center, +1 at bottom
      const norm = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, norm));
      const y = clamped * amount; // translate in px
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
    function onScroll() {
      if (!raf) raf = win.requestAnimationFrame(update);
    }
    el.style.willChange = "transform";
    onScroll();
    win.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
      if (raf) win.cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
