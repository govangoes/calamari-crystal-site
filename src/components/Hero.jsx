import TaglineLockup from "./TaglineLockup.jsx";
import NavPills from "./NavPills.jsx";
import SocialLinks from "./SocialLinks.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Hero(){
  return (
    <>
      <div id="top" aria-hidden="true" style={{position:"absolute", inset:"0 auto auto 0", width:0, height:0}} />
      <header className="bg-hero section" style={{paddingTop:"6rem", paddingBottom:"6rem"}}>
        <div className="sticky-header" style={{position:"sticky", top:0}}>
          <div style={{maxWidth:960, margin:"0 auto", padding:"10px 20px", display:"flex", gap:16, justifyContent:"space-between", alignItems:"center", flexWrap:"wrap"}}>
            <NavPills />
            <ThemeToggle />
          </div>
        </div>

        <div style={{maxWidth:960, margin:"0 auto", padding:"0 20px"}}>
          <h1 style={{fontSize:"clamp(38px,6vw,64px)", lineHeight:1.05, margin:"22px 0 12px"}}>
            Wildly influential. Unapologetically different.
          </<div style={{maxWidth:960, margin:"0 auto", padding:"0 20px"}}>
  <TaglineLockup />
  <p style={{fontSize:"clamp(16px,2.2vw,20px)", opacity:.88, maxWidth:720}}>
    Art that makes noise — bars, showmanship, and a movement you can join.
  </p>
  {/* buttons/social */}
</div>
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
    </>
  );
}
