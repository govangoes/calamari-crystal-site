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
    <header style={{ position:"sticky", top:0, zIndex:40 }}>
      <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"space-between",maxWidth:1200,margin:"0 auto",padding:"12px 20px"}}>
        <Link to="/" aria-label="GoVanGoes home" style={{display:"inline-flex",alignItems:"center",gap:10, textDecoration:'none', color:'inherit'}}>
          <strong className="wordmark">GoVanGoes</strong>
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
