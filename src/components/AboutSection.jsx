export default function AboutSection(){
  return (
    <section id="about" className="section" style={{background:"var(--surface)"}}>
      <div style={{maxWidth:960, margin:"0 auto", padding:"0 20px"}}>
        <h2 style={{fontSize:"clamp(28px,4.5vw,40px)", marginBottom:12}}>About GoVanGoes</h2>
        <p style={{opacity:.9, maxWidth:800}}>
          I build systems for creativity, discipline, and output — then hand you the blueprint.
          GoVanGoes is bars, performance, and a brand-engineered experience built for momentum.
          Wildly influential. Unapologetically different. Art that makes noise.
        </p>
      </div>
    </section>
  );
}
