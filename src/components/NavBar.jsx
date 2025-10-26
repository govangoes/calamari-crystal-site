import { NavLink } from "react-router-dom";
import { Gem, Music, ShoppingBag, FileText, MessageCircle } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-3 leading-6 rounded-md text-sm font-medium transition
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
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paperWhite/70 dark:bg-ink/50 border-b border-ink/10 dark:border-paperWhite/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-monteGold" />
          <span className="font-semibold tracking-wide text-ink dark:text-paperWhite">
            GoVanGoes
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
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
      </nav>
    </header>
  );
}
