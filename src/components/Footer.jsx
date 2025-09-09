import React from "react";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer(){
  return (
    <footer className="section" style={{borderTop:"1px solid rgba(255,255,255,.08)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"grid",gap:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src="/favicon-32x32.png" alt="" width="24" height="24" style={{borderRadius:6}} />
            <strong>GoVanGoes</strong>
          </div>
          <SocialLinks />
        </div>
        <div style={{opacity:.7,fontSize:14,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <span>© {new Date().getFullYear()} Cloutlandish™ / GoVanGoes. All rights reserved.</span>
          <span>
            <a className="pill" href="/privacy" style={{marginRight:8}}>Privacy</a>
            <a className="pill" href="/terms">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
