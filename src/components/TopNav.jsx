import { useState } from "react";
import GhostButton from "./ui/GhostButton.jsx";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;
  const menuItems = [
    { label: "Start", href: `${baseUrl}#start` },
    { label: "Mix & Master", href: `${baseUrl}#mixmaster` },
    { label: "Bookings", href: `${baseUrl}#bookings` },
    { label: "Music", href: `${baseUrl}#music` },
    { label: "Press", href: `${baseUrl}#press` },
    { label: "Resources", href: `${baseUrl}#resources` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-black/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
        <a
          href={`${baseUrl}#start`}
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Go Van Goes home"
        >
          <span className="wordmark text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.42em] text-strong">
            Go Van Goes
          </span>
          <span className="hidden sm:inline-block h-px w-6 bg-gradient-to-r from-crystal to-paperWhite/80 opacity-70 transition group-hover:opacity-100" />
        </a>
        <GhostButton
          className="px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.3em]"
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={() => setIsOpen(true)}
        >
          Menu
        </GhostButton>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="site-menu"
            className="absolute right-4 top-4 w-[min(20rem,92vw)] rounded-2xl border border-white/10 bg-ink/95 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.4em] text-muted">Menu</span>
              <GhostButton
                className="px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.28em]"
                onClick={() => setIsOpen(false)}
              >
                Close
              </GhostButton>
            </div>
            <nav className="mt-6 flex flex-col gap-4 text-sm text-muted">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted transition hover:text-crystal"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
