import ScrollReveal from "./ScrollReveal.jsx";

/**
 * Reusable section with ScrollReveal animation, heading, description, and content area.
 */
export default function Section({
  id,
  title,
  description,
  descriptionClassName = "",
  contentClassName = "",
  children,
}) {
  return (
    <ScrollReveal className="section mx-auto max-w-6xl px-4" id={id}>
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && (
        <p className={`mt-2 opacity-80 ${descriptionClassName}`}>{description}</p>
      )}
      {children && (
        <div className={contentClassName ? `mt-6 ${contentClassName}` : "mt-6"}>
          {children}
        </div>
      )}
    </ScrollReveal>
  );
}
