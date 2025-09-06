import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Merch from "./pages/Merch.jsx";
import Marketing from "./pages/Marketing.jsx";
import Business from "./pages/Business.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-inkBlack text-paperWhite">
      {/* Simple sticky nav so we can navigate */}
      <header className="sticky top-0 z-50 border-b border-paperWhite/10 bg-inkBlack/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 text-sm">
          <NavLink to="/" end className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Home</NavLink>
          <NavLink to="/story" className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Story</NavLink>
          <NavLink to="/merch" className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Merch</NavLink>
          <NavLink to="/marketing" className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Marketing</NavLink>
          <NavLink to="/business" className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Business</NavLink>
          <NavLink to="/contact" className={({isActive}) => `rounded-full px-3 py-1 ${isActive ? "bg-royalGold text-inkBlack" : "hover:text-royalGold"}`}>Contact</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/business" element={<Business />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
