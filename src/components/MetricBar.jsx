export default function MetricBar({ label, value, score }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-paperWhite/70">{label}</span>
        <span className="text-paperWhite">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-yellow-300 to-pink-400"
          style={{ width: `${Math.round(score)}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
