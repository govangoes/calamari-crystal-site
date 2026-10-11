import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GhostButton from "./ui/GhostButton.jsx";

const MENU_TRANSITION_MS = 240;

export default function TopNav({ onMenuStateChange }) {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { label: "Services", to: "/services" },
    { label: "Book a Date", to: "/bookings" },
    { label: "Mix & Master", to: "/#mixmaster" },
    { label: "Mix Temple", to: "/#mix-temple" },
    { label: "Music", to: "/#music" },
    { label: "Press", to: "/press" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsMenuMounted(true);
    requestAnimationFrame(() => {
      setIsMenuOpen(true);
    });
  }, []);

  useEffect(() => {
    if (!isMenuMounted) return undefined;
    if (isMenuOpen) return undefined;

    const timer = window.setTimeout(() => {
      setIsMenuMounted(false);
    }, MENU_TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isMenuMounted, isMenuOpen]);

  useEffect(() => {
    if (!isMenuMounted) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isMenuMounted]);

  useEffect(() => {
    if (!onMenuStateChange) return undefined;
    onMenuStateChange(isMenuOpen);
    return () => onMenuStateChange(false);
  }, [isMenuOpen, onMenuStateChange]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Go Van Goes home"
        >
          <img
            src="/govangoes-mark.webp"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
            className="h-8 w-8"
          />
          <span className="wordmark text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.42em] text-strong">
            Go Van Goes
          </span>
          <span className="hidden sm:inline-block h-px w-6 bg-gradient-to-r from-crystal to-paperWhite/80 opacity-70 transition group-hover:opacity-100" />
        </Link>
        <GhostButton
          className="px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.3em]"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={openMenu}
        >
          Menu
        </GhostButton>
      </div>

      {isMenuMounted && (
        <div className={`menu-overlay ${isMenuOpen ? "menu-overlay--open" : ""}`}>
          <div className="menu-overlay__backdrop" aria-hidden />
          <button
            type="button"
            className="absolute inset-0 z-[1] cursor-default"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div id="site-menu" className="menu-overlay__panel">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.4em] text-muted">Menu</span>
              <GhostButton
                className="px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.28em]"
                onClick={closeMenu}
              >
                Close
              </GhostButton>
            </div>
            <nav className="mt-6 flex flex-col gap-4 text-sm text-muted">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-muted transition hover:text-crystal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
