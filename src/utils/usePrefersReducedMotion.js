import { useEffect, useState } from "react";

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = (event) => setPrefersReducedMotion(event.matches);
      update(media);
      if (media.addEventListener) {
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
      }
      if (media.addListener) {
        media.addListener(update);
        return () => media.removeListener(update);
      }
    } catch {
      // Ignore errors
    }
    return undefined;
  }, []);

  return prefersReducedMotion;
}
