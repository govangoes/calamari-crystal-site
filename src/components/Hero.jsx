import TaglineLockup from "./TaglineLockup.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import NavPills from "./NavPills.jsx";
import SocialLinks from "./SocialLinks.jsx";

export default function Hero(){
  return (
    <header className="section bg-hero-gradient" id="home" role="banner">
      <div style={{maxWidth:1120, margin:"0 auto", padding:"0 20px"}} data-reveal-stagger="0,80">
        {/* Top row: logo placeholder + theme */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'22px'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{width:36, height:36, borderRadius:'50%', background:'var(--gold)'}} aria-hidden="true" />
            <strong style={{letterSpacing:.5}}>GoVanGoes</strong>
          </div>
          <ThemeToggle />
        </div>

        {/* Nav */}
        <div style={{margin:'10px 0 22px'}}><NavPills /></div>

        {/* Tagline + subcopy */}
        <div style={{maxWidth:960}}>
          <TaglineLockup />
          <p style={{fontSize:"clamp(16px,2.2vw,20px)", opacity:.9, maxWidth:720, margin:"12px 0 22px"}} data-reveal>
            Art that makes noise — bars, showmanship, and a movement you can join.
          </p>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <a className="btn-primary" href="#music" data-reveal>Listen Now</a>
            <a className="pill" href="#videos" data-reveal>Watch a Performance</a>
            <a className="pill" href="#shop" data-reveal>Shop the Drop</a>
          </div>
        </div>

        {/* Social row */}
        <div data-reveal data-reveal-delay="220">
          <SocialLinks className="mt-10" />
        </div>
      </div>
    </header>
  );
}
