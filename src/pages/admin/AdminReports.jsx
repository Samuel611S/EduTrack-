import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import { attendanceTrend, courses } from "../../data/mockData.js";

export default function AdminReports() {
  const max = Math.max(...attendanceTrend.map((w) => w.rate), 1);

  return (
    <DashboardLayout
      role="admin"
      title="Reports"
      subtitle="Attendance trends and summaries"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Campus-wide avg." value="87%" hint="Rolling 6 weeks" icon="▤" />
        <StatsCard
          label="Courses tracked"
          value={String(courses.length)}
          hint="Spring 2025"
          icon="▣"
        />
        <StatsCard label="Compliance alerts" value="2" hint="Requires follow-up" icon="!" />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Attendance trend</h2>
        <p className="text-xs text-slate-500">Weekly average attendance rate</p>
        <div className="mt-6 flex items-end justify-between gap-2">
          {attendanceTrend.map((w) => (
            <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-[48px] rounded-t-md bg-slate-800 transition-all"
                style={{ height: `${(w.rate / max) * 160}px`, minHeight: "8px" }}
                title={`${w.week}: ${w.rate}%`}
              />
              <span className="text-[10px] font-medium text-slate-500">{w.week}</span>
              <span className="text-xs font-semibold tabular-nums text-slate-800">
                {w.rate}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
