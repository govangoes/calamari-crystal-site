import { useEffect, useRef } from "react";

export default function Parallax({ amount = 24, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // Respect users that prefer reduced motion

    let raf = 0;
    function update() {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 at top, 0 at center, +1 at bottom
      const norm = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      const clamped = Math.max(-1, Math.min(1, norm));
      const y = clamped * amount; // translate in px
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
    function onScroll() {
      if (!raf) raf = window.requestAnimationFrame(update);
    }
    el.style.willChange = "transform";
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
