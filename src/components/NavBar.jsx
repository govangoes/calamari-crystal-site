import { NavLink, useLocation } from "react-router-dom";
import { Gem, Menu, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import useIsMobile from "../hooks/useIsMobile.js";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/story", label: "Lore" },
  { to: "/music", label: "Music" },
  { to: "/merch", label: "Merch" },
  { to: "/press", label: "Press" },
  { to: "/bookings", label: "Bookings" },
];

const linkBaseStyles =
  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal";

const LinkItem = forwardRef(function LinkItem({ to, children, onClick, className = "" }, ref) {
  return (
    <NavLink
      ref={ref}
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${linkBaseStyles} ${className} ${
          isActive
            ? "text-crystal dark:bg-graphite/70 bg-ink/10 shadow-crystal"
            : "text-ink/80 dark:text-paperWhite/80 hover:text-ink dark:hover:text-paperWhite hover:bg-ink/5 dark:hover:bg-graphite/40"
        }`
      }
    >
      {children}
    </NavLink>
  );
});

export default function NavBar() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile || typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    function handleKey(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paperWhite/70 dark:bg-ink/60 border-b border-ink/10 dark:border-paperWhite/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 text-ink dark:text-paperWhite">
          <Gem className="h-5 w-5 text-monteGold" aria-hidden />
          <span className="font-semibold tracking-wide">GoVanGoes</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <LinkItem key={item.to} to={item.to}>
              {item.label}
            </LinkItem>
          ))}
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-ink/80 dark:text-paperWhite/80 hover:bg-ink/5 dark:hover:bg-graphite/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={-1}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`absolute inset-y-0 right-0 flex w-full max-w-xs transform flex-col bg-paperWhite shadow-2xl transition-transform duration-200 dark:bg-ink/95 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10 dark:border-paperWhite/10">
            <span className="text-base font-semibold text-ink dark:text-paperWhite">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-md p-2 text-ink/80 dark:text-paperWhite/80 hover:bg-ink/5 dark:hover:bg-graphite/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
            {navItems.map((item, index) => (
              <LinkItem
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className="text-base w-full justify-start"
                ref={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </LinkItem>
            ))}
          </nav>
          <div className="border-t border-ink/10 px-6 py-4 dark:border-paperWhite/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink/80 dark:text-paperWhite/70">Theme</span>
              <ThemeToggle onToggle={closeMenu} className="ml-0" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
