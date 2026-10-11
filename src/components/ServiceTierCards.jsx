import { Link } from "react-router-dom";
import { Mic, Sliders, Speaker } from "lucide-react";
import CrystalBadge from "./ui/CrystalBadge.jsx";
import CrystalCard from "./ui/CrystalCard.jsx";
import GhostButton from "./ui/GhostButton.jsx";
import { SERVICE_TIERS } from "../content/services.js";

const ICONS = { Mic, Sliders, Speaker };

/**
 * The three service tiers as cards.
 * `detailed` adds the full list of what's included and how it works (Services page).
 * The compact version (Home page) keeps the summary and one button.
 */
export default function ServiceTierCards({ detailed = false, className = "" }) {
  const rootClassName = ["grid gap-5 lg:grid-cols-3", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      {SERVICE_TIERS.map((tier) => {
        const Icon = ICONS[tier.icon];
        return (
          <CrystalCard
            key={tier.id}
            variant="glass"
            className="group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1"
          >
            <div className="flex h-full flex-col">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-crystal/20 text-crystal transition-transform group-hover:scale-110">
                {Icon && <Icon size={24} aria-hidden="true" />}
              </div>

              <CrystalBadge variant="tag" className="self-start text-crystal">
                {tier.eyebrow}
              </CrystalBadge>
              <h3 className="mt-3 text-xl font-bold text-paperWhite">{tier.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tier.summary}</p>

              {detailed && (
                <>
                  <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-paperWhite/90">
                    {tier.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-[11px] uppercase tracking-wider text-muted">Best for</p>
                    <p className="mt-1 text-sm text-paperWhite/90">{tier.bestFor}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-wider text-muted">How it works</p>
                    <p className="mt-1 text-sm text-muted">{tier.howItWorks}</p>
                  </div>
                </>
              )}

              <div className="mt-auto pt-6">
                <GhostButton as={Link} to={tier.cta.to}>
                  {tier.cta.label}
                </GhostButton>
              </div>
            </div>
          </CrystalCard>
        );
      })}
    </div>
  );
}
