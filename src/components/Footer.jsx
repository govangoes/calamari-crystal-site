import React from "react";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer className="section" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4">
        <hr className="divider" />
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"14px", flexWrap:"wrap", marginTop:"18px"}}>
          <p style={{margin:0, opacity:.9}}>
            © {year} Cloutlandish™ / GoVanGoes — <em>Wildly Influential. Unapologetically Different.</em>
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
