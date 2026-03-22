export default function ProgressBar({
  label,
  value,
  max = 100,
  colorClass = "bg-slate-900",
}) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
          <span>{label}</span>
          <span className="font-medium tabular-nums text-slate-800">{pct}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
