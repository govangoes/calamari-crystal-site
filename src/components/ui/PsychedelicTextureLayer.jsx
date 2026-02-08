export default function PsychedelicTextureLayer({
  className = "",
  variant = "section",
  strength = "low",
}) {
  const variantClassName =
    variant === "hero" ? "psy-texture-layer--hero" : "psy-texture-layer--section";
  const strengthClassName =
    strength === "medium" ? "psy-texture-layer--medium" : "psy-texture-layer--low";
  const composedClassName = ["psy-texture-layer", variantClassName, strengthClassName, className]
    .filter(Boolean)
    .join(" ");

  return <span aria-hidden="true" className={composedClassName} />;
}
