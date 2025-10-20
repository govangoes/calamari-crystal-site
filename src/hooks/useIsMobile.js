import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_UA_REGEX = /(Mobi|Android|iPhone|iPad|iPod|Windows Phone)/i;

function detectMobile() {
  if (typeof window === "undefined") return false;

  try {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    if (mediaQuery.matches) {
      return true;
    }
  } catch {
    // Ignore matchMedia issues (older browsers)
  }

  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent || "";
    if (MOBILE_UA_REGEX.test(ua)) {
      return true;
    }
  }

  return false;
}

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => detectMobile());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => {
      const matches = mediaQuery.matches;
      setIsMobile(matches || detectMobile());
    };

    update();

    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("is-mobile", isMobile);
    document.documentElement.classList.toggle("is-desktop", !isMobile);
  }, [isMobile]);

  return isMobile;
}
