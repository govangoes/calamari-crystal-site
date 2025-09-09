import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import SocialLinks from "./SocialLinks.jsx";

const nav = [
  { to: "/", label: "Start Here" },
  { to: "/music", label: "Music" },
  { to: "/shop", label: "Shop" },
  { to: "/bookings", label: "Bookings" },
  { to: "/videos", label: "Videos" },
  { to: "/about", label: "About" },
  { to: "/press", label: "Press" }
];

export default function Header(){
  return (
    <header style={{
      position:"sticky", top:0, zIndex:40,
      backdropFilter:"saturate(140%) blur(8px)",
      background:"rgba(10,10,14,.55)", borderBottom:"1px solid rgba(255,255,255,.08)"
    }}>
      <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"space-between",maxWidth:1200,margin:"0 auto",padding:"12px 20px"}}>
        <Link to="/" aria-label="GoVanGoes home" style={{display:"inline-flex",alignItems:"center",gap:10,fontWeight:800,letterSpacing:.3}}>
          <img src="/favicon-32x32.png" alt="" width="24" height="24" style={{borderRadius:6}} />
          <span>GoVanGoes</span>
        </Link>

        <nav aria-label="Primary" style={{display:"none",gap:8,flexWrap:"wrap"}} className="md:flex">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) => `pill ${isActive ? "pill--active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <ThemeToggle />
        </div>
      </div>
      <div style={{display:"none"}} className="md:block">
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px 10px"}}>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
