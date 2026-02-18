import CrystalBadge from "./CrystalBadge.jsx";

const ALIGNMENT_CLASS_MAP = {
  left: "text-left",
  center: "text-center",
};

export default function SectionHeader({
  className = "",
  eyebrow,
  title,
  subtitle,
  align = "left",
  titleAs: TitleTag = "h2",
}) {
  const alignmentClassName = ALIGNMENT_CLASS_MAP[align] || ALIGNMENT_CLASS_MAP.left;

  return (
    <header className={["space-y-2", alignmentClassName, className].filter(Boolean).join(" ")}>
      {eyebrow && (
        <CrystalBadge variant="tag" className="border-white/15 bg-white/[0.04] text-paperWhite/70">
          {eyebrow}
        </CrystalBadge>
      )}
      {title && (
        <TitleTag className="text-2xl font-semibold text-paperWhite md:text-3xl">{title}</TitleTag>
      )}
      {subtitle && <p className="max-w-3xl text-sm text-muted md:text-base">{subtitle}</p>}
    </header>
  );
}
