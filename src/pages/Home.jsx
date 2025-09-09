import Hero from "../components/Hero.jsx";

export default function Home(){
  return (
    <main>
      <Hero />
      {/* More sections... */}
      <section id="about" className="section" style={{maxWidth:960, margin:"0 auto", padding:"0 20px"}}>
        <h2>Start Here</h2>
        <p>60-sec welcome video, top 3 offers, and an email opt-in go here.</p>
      </section>
    </main>
  );
}
