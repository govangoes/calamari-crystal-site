import ScrollReveal from "./ScrollReveal.jsx";
import PsychedelicTextureLayer from "./ui/PsychedelicTextureLayer.jsx";
import SectionHeader from "./ui/SectionHeader.jsx";

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
  withTexture = false,
  textureVariant = "section",
  textureStrength = "low",
  textureClassName = "",
  children,
}) {
  return (
    <ScrollReveal className="section section-shell mx-auto isolate px-4">
      {withTexture && (
        <PsychedelicTextureLayer
          variant={textureVariant}
          strength={textureStrength}
          className={textureClassName}
        />
      )}
      <div id={id} className="relative z-[1]">
        {(eyebrow || title || description) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={description}
            className={descriptionClassName}
          />
        )}
        {children && (
          <div className={contentClassName ? `mt-6 ${contentClassName}` : "mt-6"}>{children}</div>
        )}
      </div>
    </ScrollReveal>
  );
}
