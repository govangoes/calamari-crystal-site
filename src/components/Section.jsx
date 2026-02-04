import ScrollReveal from "./ScrollReveal";

// This component handles the layout and animation for every section
export default function Section({ id, title, subtitle, children, className = "" }) {
  return (
    <ScrollReveal 
      className={`section mx-auto max-w-6xl px-4 py-12 ${className}`} 
      id={id}
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-paperWhite">{title}</h2>
        {subtitle && <p className="mt-2 text-lg text-paperWhite/80 max-w-2xl">{subtitle}</p>}
      </div>
      
      {/* This renders whatever you put inside the <Section> tags */}
      <div className="content-wrapper">
        {children}
      </div>
    </ScrollReveal>
  );
}
