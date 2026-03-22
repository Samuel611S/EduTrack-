function formatWhen(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const typeDot = {
  registration: "bg-emerald-500",
  attendance: "bg-sky-500",
  course: "bg-violet-500",
  settings: "bg-amber-500",
  staff: "bg-rose-500",
};

export default function ActivityFeed({ items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
        <p className="text-xs text-slate-500">Latest changes across the platform</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 px-4 py-3">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${typeDot[item.type] || "bg-slate-400"}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-800">{item.message}</p>
              <p className="mt-0.5 text-xs text-slate-500">{formatWhen(item.at)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
