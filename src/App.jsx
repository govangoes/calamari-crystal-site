import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNav from "./components/TopNav.jsx";
import Footer from "./components/Footer.jsx";
import CrystalDock from "./components/ui/CrystalDock.jsx";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import Press from "./pages/Press.jsx";
import Music from "./pages/Music.jsx";
import RapMap from "./pages/RapMap.jsx";
import LyricsLab from "./pages/LyricsLab.jsx";
import Artists from "./pages/Artists.jsx";
import ArtistProfile from "./pages/ArtistProfile.jsx";
import Upload from "./pages/Upload.jsx";
import OpenMicsOrlando from "./pages/OpenMicsOrlando.jsx";
import Bookings from "./pages/Bookings.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Services from "./pages/Services.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const [isMenuOverlayActive, setIsMenuOverlayActive] = useState(false);
  const showCrystalDock = pathname === "/";

  return (
    <>
      <ScrollToTop />
      <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-paperWhite flex flex-col">
        <TopNav onMenuStateChange={setIsMenuOverlayActive} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/story" element={<Story />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/business" element={<Business />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press" element={<Press />} />
            <Route path="/music" element={<Music />} />
            <Route path="/rap-map" element={<RapMap />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistProfile />} />
            <Route path="/lyrics-lab" element={<LyricsLab />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/open-mics" element={<OpenMicsOrlando />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        {showCrystalDock && <CrystalDock menuOpen={isMenuOverlayActive} />}
      </div>
    </>
  );
}
