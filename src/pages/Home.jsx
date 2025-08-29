import Hero from '../components/Hero.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

export default function Home(){
  return (
    <main>
      <Hero />
      <section id="content" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <ScrollReveal key={i} delay={i*0.1}>
              <div className="p-6 rounded-xl bg-richBlack/40 border border-opalGlow/15 backdrop-blur-md hover:border-crystalCyan/30 transition">
                <h3 className="text-xl font-bold text-paperWhite mb-2">Depth {i}</h3>
                <p className="text-opalGlow/80">Bioluminescent vibes and precision bars. Build the legend with every scroll.</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
