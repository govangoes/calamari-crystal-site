import { useEffect, useState } from "react";
import GhostButton from "./GhostButton.jsx";
import PsychedelicButton from "./PsychedelicButton.jsx";

const FALLBACK_SCROLL_Y = 240;

export default function CrystalDock({
  sentinelId = "dock-sentinel",
  fallbackScrollY = FALLBACK_SCROLL_Y,
  menuOpen = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const setFromScroll = () => {
      setIsVisible(window.scrollY > fallbackScrollY);
    };

    const sentinel = document.getElementById(sentinelId);
    if (typeof window.IntersectionObserver === "undefined" || !sentinel) {
      setFromScroll();
      window.addEventListener("scroll", setFromScroll, { passive: true });
      window.addEventListener("resize", setFromScroll);
      return () => {
        window.removeEventListener("scroll", setFromScroll);
        window.removeEventListener("resize", setFromScroll);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fallbackScrollY, sentinelId]);

  const dockClassName = [
    "crystal-dock",
    isVisible && !menuOpen ? "crystal-dock--visible" : "crystal-dock--hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav aria-label="Primary actions" className={dockClassName}>
      <div className="crystal-dock__panel">
        <PsychedelicButton as="a" href={`${baseUrl}#mixmaster`} className="w-full justify-center">
          Mix &amp; Master
        </PsychedelicButton>
        <GhostButton as="a" href={`${baseUrl}#bookings`} className="w-full justify-center">
          Book Me
        </GhostButton>
      </div>
    </nav>
  );
}
