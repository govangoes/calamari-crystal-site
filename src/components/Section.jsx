import ScrollReveal from "./ScrollReveal.jsx";

/**
 * Reusable section with ScrollReveal animation, heading, description, and content area.
 */
export default function Section({
  id,
  eyebrow,
  title,
  description,
  descriptionClassName = "",
  contentClassName = "",
  children,
}) {
  return (
    <ScrollReveal className="section mx-auto max-w-6xl px-4 py-12 md:py-16" id={id}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.4em] text-paperWhite/60">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-paperWhite">{title}</h2>
      {description && (
        <p className={`mt-2 text-sm md:text-base text-paperWhite/70 ${descriptionClassName}`}>
          {description}
        </p>
      )}
      {children && (
        <div className={contentClassName ? `mt-6 ${contentClassName}` : "mt-6"}>{children}</div>
      )}
    </ScrollReveal>
  );
}
