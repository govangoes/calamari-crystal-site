export default function CrystalInput({ className = "", ...props }) {
  return <input className={["crystal-input", className].filter(Boolean).join(" ")} {...props} />;
}
