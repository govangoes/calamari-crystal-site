const VARIANT_CLASS_MAP = {
  hero: "psy-texture-layer--hero",
  section: "psy-texture-layer--section",
};

const STRENGTH_CLASS_MAP = {
  low: "psy-texture-layer--low",
  medium: "psy-texture-layer--medium",
};

export default function PsychedelicTextureLayer({
  className = "",
  variant = "section",
  strength = "low",
}) {
  const variantClassName = VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP.section;
  const strengthClassName = STRENGTH_CLASS_MAP[strength] || STRENGTH_CLASS_MAP.low;
  const composedClassName = ["psy-texture-layer", variantClassName, strengthClassName, className]
    .filter(Boolean)
    .join(" ");

  return <span aria-hidden="true" className={composedClassName} />;
}
