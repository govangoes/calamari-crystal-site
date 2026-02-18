import ScrollReveal from "../components/ScrollReveal.jsx";
import { merchItems, merchCta } from "../content/merch.js";
import GhostButton from "../components/ui/GhostButton.jsx";

export default function Merch() {
  return (
    <section className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">Relics from the Deep</h1>
        <p className="opacity-80 mt-2">Limited runs. Story-driven. Built for super-fans.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-6">
        {merchItems.map((it) => (
          <ScrollReveal key={it.name}>
            <div className="p-6 rounded-xl bg-ink/50 border border-white/10 shadow-crystal">
              <h3 className="font-semibold">{it.name}</h3>
              <p className="opacity-80 mt-2">{it.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-monteGold font-semibold">{it.price}</span>
                {it.href ? (
                  <a
                    className="px-4 py-2 rounded bg-ultraviolet text-paperWhite hover:opacity-90"
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {it.status}
                  </a>
                ) : (
                  <span className="px-4 py-2 rounded border border-white/15 text-paperWhite/60">
                    {it.status}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="text-center">
        {merchCta ? (
          <GhostButton as="a" href={merchCta.href} target="_blank" rel="noopener noreferrer">
            {merchCta.label}
          </GhostButton>
        ) : (
          <span className="pill text-paperWhite/60">Full drop coming soon</span>
        )}
      </div>
    </section>
  );
}
