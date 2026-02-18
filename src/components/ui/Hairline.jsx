export default function Hairline({ className = "" }) {
  const composedClassName = ["crystal-hairline", className].filter(Boolean).join(" ");
  return <div aria-hidden="true" className={composedClassName} />;
}
