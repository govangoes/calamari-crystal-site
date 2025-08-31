import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = "translateY(12px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = "opacity .6s ease, transform .6s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: .12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
