import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal.jsx'

export default function Hero(){
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 bottom-16 w-24 h-24 rounded-full bg-crystalCyan/15 blur-3xl animate-drift" />
        <div className="absolute right-8 top-24 w-32 h-32 rounded-full bg-crystalMagenta/15 blur-3xl animate-drift" />
        <div className="absolute right-1/3 bottom-10 w-16 h-16 rounded-full bg-opalGlow/20 blur-2xl animate-floaty" />
      </div>

      <div className="relative z-10 text-center px-6">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-black text-crystalCyan drop-shadow-glow">
            CALAMARI CRYSTAL
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-lg md:text-xl text-opalGlow/90 max-w-2xl mx-auto">
            Where golden crowns meet cosmic squid energy — dive into an underwater mythos of color, chaos, and crystal clarity.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.35}>
          <a href="#content" className="inline-flex mt-8 px-8 py-3 rounded-full border border-crystalMagenta/40 text-paperWhite hover:bg-crystalMagenta/10 transition">
            Dive Into the Abyss
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
