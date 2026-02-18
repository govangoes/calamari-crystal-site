import CrystalBadge from "./ui/CrystalBadge.jsx";
import CrystalCard from "./ui/CrystalCard.jsx";

const PROOF_ITEMS = [
  {
    label: "Showcase",
    text: "Coast 2 Coast Showcase — Top 3 (Philadelphia)",
  },
  {
    label: "Press",
    text: "Press: Rap Fiesta + Orlando Voyager",
  },
  {
    label: "Mix & Master",
    text: "Mix/Master: notes welcome, clear revisions",
  },
  {
    label: "Comms",
    text: "Fast comms: direct feedback, clean handoff",
  },
  {
    label: "Tools",
    text: "Tools: Rap Map + Open Mics directory",
  },
];

export default function ProofGrid({ className = "" }) {
  const rootClassName = ["grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-label="Trust proof highlights" className={rootClassName}>
      {PROOF_ITEMS.map((item) => (
        <CrystalCard key={item.text} variant="outline" className="p-4">
          <CrystalBadge variant="tag" className="mb-3">
            {item.label}
          </CrystalBadge>
          <p className="text-sm leading-relaxed text-strong">{item.text}</p>
        </CrystalCard>
      ))}
    </section>
  );
}
