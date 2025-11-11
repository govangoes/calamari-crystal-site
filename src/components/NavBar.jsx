import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Gem, Music, ShoppingBag, FileText, MessageCircle, Mic2, Map, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const LinkItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition
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

const MobileMenuItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-4 py-3 text-base font-medium transition
       ${
         isActive
           ? "text-crystal bg-ink/10 dark:bg-graphite/60"
           : "text-ink/80 dark:text-paperWhite/80 hover:text-ink dark:hover:text-paperWhite hover:bg-ink/5 dark:hover:bg-graphite/40"
       }`
    }
  >
    {children}
  </NavLink>
);

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paperWhite/70 dark:bg-ink/50 border-b border-ink/10 dark:border-paperWhite/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/70 dark:hover:bg-graphite/40"
          aria-label="Go to GoVanGoes home"
        >
          <Gem className="h-5 w-5 text-monteGold" />
          <span className="font-semibold tracking-wide text-ink dark:text-paperWhite">GoVanGoes</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <LinkItem to="/story">Lore</LinkItem>
          <LinkItem to="/music">
            <Music className="inline h-4 w-4 mr-1" />
            Music
          </LinkItem>
          <LinkItem to="/merch">
            <ShoppingBag className="inline h-4 w-4 mr-1" />
            Merch
          </LinkItem>
          <LinkItem to="/open-mics-orlando">
            <Mic2 className="inline h-4 w-4 mr-1" />
            Open Mics
          </LinkItem>
          <LinkItem to="/orlando-nightlife.html">
            <Map className="inline h-4 w-4 mr-1" />
            Nightlife
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

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-ink/80 dark:text-paperWhite/80 hover:bg-ink/5 dark:hover:bg-graphite/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal/70 transition"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-ink/10 dark:border-paperWhite/10 bg-paperWhite/95 dark:bg-ink/95 backdrop-blur-md">
          <div className="py-2">
            <MobileMenuItem to="/story" onClick={closeMobileMenu}>
              Lore
            </MobileMenuItem>
            <MobileMenuItem to="/music" onClick={closeMobileMenu}>
              <Music className="inline h-4 w-4 mr-1" />
              Music
            </MobileMenuItem>
            <MobileMenuItem to="/merch" onClick={closeMobileMenu}>
              <ShoppingBag className="inline h-4 w-4 mr-1" />
              Merch
            </MobileMenuItem>
            <MobileMenuItem to="/open-mics-orlando" onClick={closeMobileMenu}>
              <Mic2 className="inline h-4 w-4 mr-1" />
              Open Mics
            </MobileMenuItem>
            <MobileMenuItem to="/orlando-nightlife.html" onClick={closeMobileMenu}>
              <Map className="inline h-4 w-4 mr-1" />
              Nightlife
            </MobileMenuItem>
            <MobileMenuItem to="/press" onClick={closeMobileMenu}>
              <FileText className="inline h-4 w-4 mr-1" />
              Press
            </MobileMenuItem>
            <MobileMenuItem to="/bookings" onClick={closeMobileMenu}>
              <MessageCircle className="inline h-4 w-4 mr-1" />
              Bookings
            </MobileMenuItem>
          </div>
        </div>
      )}
    </header>
  );
}
