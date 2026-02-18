const VARIANT_CLASS_MAP = {
  pill: "crystal-badge crystal-badge--pill",
  chip: "crystal-badge crystal-badge--chip",
  tag: "crystal-badge crystal-badge--tag",
};

export default function CrystalBadge({
  as: Component = "span",
  variant = "pill",
  className = "",
  ...rest
}) {
  const variantClassName = VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP.pill;
  const composedClassName = [variantClassName, className].filter(Boolean).join(" ");
  return <Component className={composedClassName} {...rest} />;
}
