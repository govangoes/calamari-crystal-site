import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-0.5 z-[60]"
      style={{
        background:
          "linear-gradient(90deg, rgba(34,211,238,.85), rgba(167,139,250,.85))",
        transform: `scaleX(${progress})`,
        transformOrigin: "0 0",
        transition: "transform .1s linear",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    />
  );
}

