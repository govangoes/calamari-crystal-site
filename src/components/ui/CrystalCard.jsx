const CARD_BASE =
  "surface crystal-card relative isolate overflow-hidden rounded-[var(--cc-card-radius)] border text-paperWhite";

const VARIANT_CLASS_MAP = {
  solid: "crystal-card--solid",
  glass: "crystal-card--glass",
  outline: "crystal-card--outline",
};

export default function CrystalCard({
  as: Component = "div",
  variant = "solid",
  className = "",
  children,
  ...rest
}) {
  const variantClassName = VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP.solid;
  const composedClassName = [CARD_BASE, variantClassName, className].filter(Boolean).join(" ");

  return (
    <Component className={composedClassName} {...rest}>
      <span aria-hidden="true" className="crystal-card__edge" />
      <span aria-hidden="true" className="crystal-card__shine" />
      <div className="relative z-[1]">{children}</div>
    </Component>
  );
}
