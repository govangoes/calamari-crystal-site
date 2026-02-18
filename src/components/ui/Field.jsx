export default function Field({
  className = "",
  label,
  htmlFor,
  help,
  error,
  required = false,
  children,
}) {
  return (
    <div className={["space-y-1.5", className].filter(Boolean).join(" ")}>
      {label && (
        <label className="crystal-field-label" htmlFor={htmlFor}>
          <span>{label}</span>
          {required && <span className="text-crystal"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="crystal-field-error">{error}</p>
      ) : help ? (
        <p className="crystal-field-help">{help}</p>
      ) : null}
    </div>
  );
}
