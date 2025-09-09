import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Listen from "./pages/Listen.jsx";
import Videos from "./pages/Videos.jsx";
import Shop from "./pages/Shop.jsx";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import initRevealOnScroll from "./utils/revealOnScroll.js";
import { initTheme } from "./utils/theme.js";
export default function App() {
  const location = useLocation();
  useEffect(() => {
    initTheme();
    initRevealOnScroll();
  }, []);
  useEffect(() => {
    // Re-scan for new reveal targets on route changes
    initRevealOnScroll();
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-inkBlack text-paperWhite">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
