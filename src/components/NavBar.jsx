import { NavLink } from "react-router-dom";
import { Gem, Music, ShoppingBag, FileText, MessageCircle } from "lucide-react";

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `pill ${isActive ? "pill--active" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default function NavBar(){
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="h-5 w-5" style={{color:'var(--gold)'}} />
          <span className="font-semibold tracking-wide">GoVanGoes</span>
        </div>
        <div className="flex items-center gap-1">
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/story">Story</LinkItem>
          <LinkItem to="/merch"><ShoppingBag className="inline h-4 w-4 mr-1" />Merch</LinkItem>
          <LinkItem to="/marketing"><Music className="inline h-4 w-4 mr-1" />Marketing</LinkItem>
          <LinkItem to="/press"><FileText className="inline h-4 w-4 mr-1" />Press</LinkItem>
          <LinkItem to="/contact"><MessageCircle className="inline h-4 w-4 mr-1" />Contact</LinkItem>
        </div>
      </nav>
    </header>
  );
}
