export default function StatsCard({ label, value, hint, icon }) {
  return (
    <div className="lms-panel p-4 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
          <p className="mt-1 font-serif text-2xl font-semibold tracking-tight text-lms-navy">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        {icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-lg text-lms-accent">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
