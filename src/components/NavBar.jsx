import { NavLink } from "react-router-dom";
import { Gem, Music, ShoppingBag, FileText, MessageCircle } from "lucide-react";

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition
       ${isActive ? "text-crystal bg-graphite/60 ring-1 ring-crystal/40 shadow-crystal" : "text-paperWhite/80 hover:text-paperWhite hover:bg-graphite/40"}`
    }
  >
    {children}
  </NavLink>
);

export default function NavBar(){
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/50 border-b border-paperWhite/10">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-monteGold" />
          <span className="font-semibold tracking-wide text-paperWhite">GoVanGoes</span>
        </div>
        <div className="flex items-center gap-1">
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/story">Lore</LinkItem>
          <LinkItem to="/merch"><ShoppingBag className="inline h-4 w-4 mr-1" />Merch</LinkItem>
          <LinkItem to="/marketing"><Music className="inline h-4 w-4 mr-1" />Drops</LinkItem>
          <LinkItem to="/epk"><FileText className="inline h-4 w-4 mr-1" />EPK</LinkItem>
          <LinkItem to="/contact"><MessageCircle className="inline h-4 w-4 mr-1" />Contact</LinkItem>
        </div>
      </nav>
    </header>
  );
}
