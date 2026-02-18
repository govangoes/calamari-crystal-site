export default function CrystalSelect({ className = "", ...props }) {
  return <select className={["crystal-select", className].filter(Boolean).join(" ")} {...props} />;
}
