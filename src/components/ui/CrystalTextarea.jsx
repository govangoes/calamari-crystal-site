export default function CrystalTextarea({ className = "", ...props }) {
  return (
    <textarea className={["crystal-textarea", className].filter(Boolean).join(" ")} {...props} />
  );
}
