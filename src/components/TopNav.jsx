import { NavLink, Link } from "react-router-dom";

const navClass = ({ isActive }) =>
  "px-3 py-2 rounded-md text-sm font-semibold transition " +
  (isActive ? "bg-white/10 text-white" : "text-white/80 hover:text-white");

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-14">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Go to GoVanGoes home"
        >
          <picture>
            <source srcSet="/squid.webp" type="image/webp" />
            <img src="/squid.png" alt="GoVanGoes" className="h-6 w-6" decoding="async" />
          </picture>
          <span className="text-white font-bold tracking-wide">GoVanGoes</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/story" className={navClass}>
            Story
          </NavLink>
          <NavLink to="/merch" className={navClass}>
            Merch
          </NavLink>
          <NavLink to="/marketing" className={navClass}>
            Marketing
          </NavLink>
          <NavLink to="/business" className={navClass}>
            Business
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
          <NavLink to="/press" className={navClass}>
            Press
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
