import NavPills from "./NavPills.jsx";
import SocialLinks from "./SocialLinks.jsx";

export default function Hero(){
  return (
    <header className="section" style={{background:"var(--gradient-hero)", paddingTop:"6rem", paddingBottom:"6rem"}}>
      <div style={{maxWidth:960, margin:"0 auto", padding:"0 20px"}}>
        <NavPills />
        <h1 style={{fontSize:"clamp(38px,6vw,64px)", lineHeight:1.05, margin:"22px 0 12px"}}>
          Wildly influential. Unapologetically different.
        </h1>
        <p style={{fontSize:"clamp(16px,2.2vw,20px)", opacity:.88, maxWidth:720}}>
          Art that makes noise — bars, showmanship, and a movement you can join.
        </p>
        <div style={{display:"flex", gap:12, flexWrap:"wrap", marginTop:22}}>
          <a href="#about" className="btn-primary">Enter the Movement</a>
          <a href="/videos" className="pill">Watch a Performance</a>
        </div>
        <SocialLinks />
      </div>
    </header>
  );
}
