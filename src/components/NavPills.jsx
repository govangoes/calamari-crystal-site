import React from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/story", label: "Story" },
  { to: "/listen", label: "Listen" },
  { to: "/videos", label: "Videos" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export default function NavPills({ className = "" }) {
  return (
    <nav className={className} aria-label="Primary">
      <ul style={{display:"flex", gap:"10px", flexWrap:"wrap", padding:0, margin:0, listStyle:"none"}}>
        {LINKS.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => `pill${isActive ? " pill--active" : ""}`}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
