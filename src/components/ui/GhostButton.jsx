const BASE_CLASS = "ui-btn ghost-button";

export default function GhostButton({
  as: Component = "button",
  className = "",
  children,
  type,
  ...props
}) {
  const resolvedType = Component === "button" ? (type ?? "button") : undefined;
  const composedClassName = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  return (
    <Component className={composedClassName} type={resolvedType} {...props}>
      <span className="relative z-[1]">{children}</span>
    </Component>
  );
}
