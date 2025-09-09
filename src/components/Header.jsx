import React from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { Link, NavLink } from "react-router-dom";

function PillLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "pill" + (isActive ? " pill--active" : "")
      }
      style={{ textDecoration: "none" }}
    >
      {children}
    </NavLink>
  );
}

export default function Header(){
  return (
    <header
      role="banner"
      style={{
        position:"sticky", top:0, zIndex:50,
        backdropFilter:"saturate(140%) blur(8px)",
        borderBottom:"1px solid var(--surfaceBorder)",
        background:"color-mix(in oklab, var(--bg) 84%, transparent)"
      }}
    >
      <div className="mx-auto max-w-6xl px-4" style={{height:68, display:"flex", alignItems:"center", gap:14}}>
        {/* Logo / Brand */}
        <Link to="/" style={{display:"inline-flex", alignItems:"center", gap:10, textDecoration:"none", color:"var(--text)"}} aria-label="GoVanGoes home">
          {/* Drop your crest PNG/SVG in /public/brand if you want an image */}
          {/* <img src="/brand/crest.svg" alt="" width="28" height="28" /> */}
          <strong style={{letterSpacing:"0.3px"}}>GoVanGoes</strong>
        </Link>

        {/* Spacer */}
        <div style={{flex:1}} />

        {/* Nav Pills */}
        <nav aria-label="Primary">
          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <PillLink to="/">Start Here</PillLink>
            <PillLink to="/shop">Shop</PillLink>
            <PillLink to="/bookings">Bookings</PillLink>
          </div>
        </nav>

        {/* Theme switch */}
        <div style={{marginLeft:12}}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
