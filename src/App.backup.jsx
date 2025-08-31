import { Routes, Route, Link, NavLink } from "react-router-dom";
import CursorSquid from "./components/CursorSquid.jsx";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const navLink = ({isActive}) => `hover:opacity-100 ${isActive ? "opacity-100" : "opacity-80"}`;

export default function App() {
  return (
    <div className="min-h-dvh bg-abyssNavy text-paperWhite">
      <CursorSquid />
      <header className="border-b border-white/10 sticky top-0 bg-ink/60 backdrop-blur supports-[backdrop-filter]:bg-ink/40">
        <nav className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap items-center gap-4">
          <Link to="/" className="font-extrabold tracking-wide">GoVanGoes</Link>
          <div className="flex gap-4 text-sm">
            <NavLink to="/" className={navLink} end>Home</NavLink>
            <NavLink to="/story" className={navLink}>Story</NavLink>
            <NavLink to="/merch" className={navLink}>Merch</NavLink>
            <NavLink to="/marketing" className={navLink}>Marketing</NavLink>
            <NavLink to="/business" className={navLink}>Business</NavLink>
            <NavLink to="/contact" className={navLink}>Contact</NavLink>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 opacity-70">
        © {new Date().getFullYear()} GoVanGoes
      </footer>
    </div>
  );
}
