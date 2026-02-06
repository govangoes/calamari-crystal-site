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
            <source srcSet="/maskable-icon-512.webp" type="image/webp" />
            <img src="/icon-192.png" alt="GoVanGoes" className="h-6 w-6" decoding="async" />
          </picture>
          <span className="text-white font-bold tracking-wide">GoVanGoes</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              "px-4 py-2 rounded-full text-sm font-extrabold transition transform bg-gradient-to-r from-cyan-400 via-yellow-300 to-pink-400 text-ink shadow-crystal hover:scale-105 " +
              (isActive ? "ring-2 ring-white/70" : "ring-1 ring-white/20")
            }
          >
            Services
          </NavLink>
          <NavLink to="/music" className={navClass}>
            Music
          </NavLink>
          <NavLink to="/rap-map" className={navClass}>
            Rap Map
          </NavLink>
          <NavLink to="/open-mics" className={navClass}>
            Open Mics
          </NavLink>
          <NavLink to="/merch" className={navClass}>
            Merch
          </NavLink>
          <a
            href="/orlando-nightlife.html"
            className="px-3 py-2 rounded-md text-sm font-semibold transition text-white/80 hover:text-white"
          >
            Nightlife
          </a>
          <NavLink to="/press" className={navClass}>
            Press
          </NavLink>
          <NavLink to="/bookings" className={navClass}>
            Bookings
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
