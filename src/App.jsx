import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import setSEO from "./utils/seo.js";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CursorSquid from "./components/CursorSquid.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
// EPK route aliases to Press content
import Music from "./pages/Music.jsx";
import Bookings from "./pages/Bookings.jsx";
import About from "./pages/About.jsx";
import Press from "./pages/Press.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <RouteSEO />
      <div className="min-h-screen bg-paperWhite text-ink dark:bg-abyssNavy dark:text-paperWhite">
        <CursorSquid />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/music" element={<Music />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/about" element={<About />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/epk" element={<Press />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function RouteSEO() {
  const location = useLocation();
  const map = useMemo(
    () => ({
      "/": {
        title: "GoVanGoes — Calamari Crystal",
        description: "Bold performance hip‑hop. Power, play, precision. Underdogs rise.",
      },
      "/story": { title: "Story — GoVanGoes", description: "The Calamari Crystal saga." },
      "/music": { title: "Music — GoVanGoes", description: "Listen to tracks and mixes." },
      "/merch": { title: "Merch — GoVanGoes", description: "Official merch and drops." },
      "/marketing": {
        title: "Marketing — GoVanGoes",
        description: "Brand, campaigns, collaborations.",
      },
      "/business": { title: "Business — GoVanGoes", description: "Booking, partnerships, press." },
      "/contact": { title: "Contact — GoVanGoes", description: "Reach the crew." },
      "/bookings": { title: "Bookings — GoVanGoes", description: "Book performances and events." },
      "/about": { title: "About — GoVanGoes", description: "Who we are." },
      "/press": { title: "Press — GoVanGoes", description: "Press kit and assets." },
      "/privacy": { title: "Privacy — GoVanGoes" },
      "/terms": { title: "Terms — GoVanGoes" },
      "/epk": { title: "EPK — GoVanGoes", description: "Electronic press kit." },
    }),
    [],
  );

  useEffect(() => {
    const entry = map[location.pathname] || map["/"];
    setSEO({ ...entry, site: "GoVanGoes" });
  }, [location.pathname, map]);

  return null;
}
