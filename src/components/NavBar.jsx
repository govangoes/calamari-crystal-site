import { NavLink } from "react-router-dom";
import { Gem, Music, ShoppingBag, FileText, MessageCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const LinkItem = ({ to, children, onClick, className = "" }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition ${className}
       ${
         isActive
           ? "text-crystal dark:bg-graphite/60 bg-ink/10 ring-1 ring-crystal/40 shadow-crystal"
           : "text-ink/80 dark:text-paperWhite/80 hover:text-ink dark:hover:text-paperWhite hover:bg-ink/5 dark:hover:bg-graphite/40"
       }`
    }
  >
    {children}
  </NavLink>
);

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paperWhite/70 dark:bg-ink/50 border-b border-ink/10 dark:border-paperWhite/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-monteGold" />
          <span className="font-semibold tracking-wide text-ink dark:text-paperWhite">
            GoVanGoes
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/story">Lore</LinkItem>
          <LinkItem to="/music">
            <Music className="inline h-4 w-4 mr-1" />
            Music
          </LinkItem>
          <LinkItem to="/merch">
            <ShoppingBag className="inline h-4 w-4 mr-1" />
            Merch
          </LinkItem>
          <LinkItem to="/press">
            <FileText className="inline h-4 w-4 mr-1" />
            Press
          </LinkItem>
          <LinkItem to="/bookings">
            <MessageCircle className="inline h-4 w-4 mr-1" />
            Bookings
          </LinkItem>
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-ink/80 dark:text-paperWhite/80 hover:bg-ink/5 dark:hover:bg-graphite/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          aria-hidden
          onClick={closeMenu}
        />
        <div
          id="mobile-menu"
          className={`absolute right-4 left-4 top-20 rounded-2xl bg-paperWhite shadow-2xl border border-ink/10 overflow-hidden transition-transform duration-200 origin-top ${
            isOpen ? "scale-100" : "scale-95"
          } dark:bg-graphite/95 dark:border-paperWhite/10`}
        >
          <nav className="flex flex-col p-4 gap-1">
            <LinkItem to="/" onClick={closeMenu} className="w-full">
              Home
            </LinkItem>
            <LinkItem to="/story" onClick={closeMenu} className="w-full">
              Lore
            </LinkItem>
            <LinkItem to="/music" onClick={closeMenu} className="w-full">
              <Music className="inline h-4 w-4 mr-1" />
              Music
            </LinkItem>
            <LinkItem to="/merch" onClick={closeMenu} className="w-full">
              <ShoppingBag className="inline h-4 w-4 mr-1" />
              Merch
            </LinkItem>
            <LinkItem to="/press" onClick={closeMenu} className="w-full">
              <FileText className="inline h-4 w-4 mr-1" />
              Press
            </LinkItem>
            <LinkItem to="/bookings" onClick={closeMenu} className="w-full">
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Bookings
            </LinkItem>
            <div className="mt-2 flex justify-between items-center rounded-md border border-ink/10 dark:border-paperWhite/10 px-3 py-2">
              <span className="text-sm font-medium text-ink/80 dark:text-paperWhite/80">Theme</span>
              <ThemeToggle onToggle={closeMenu} className="ml-0" />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
