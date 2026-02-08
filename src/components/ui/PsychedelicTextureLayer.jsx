export default function PsychedelicTextureLayer({ className = "" }) {
  const composedClassName = className ? `psy-texture-layer ${className}` : "psy-texture-layer";

  return <span aria-hidden="true" className={composedClassName} />;
}
