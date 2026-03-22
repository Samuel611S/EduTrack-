import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import { attendanceTrend, courses } from "../../data/mockData.js";

const DEMO_TEACHER_ID = "t1";

export default function TeacherReports() {
  const my = courses.filter((c) => c.teacherId === DEMO_TEACHER_ID);
  const avg = my.length
    ? Math.round(my.reduce((a, c) => a + c.averageAttendance, 0) / my.length)
    : 0;
  const max = Math.max(...attendanceTrend.map((w) => w.rate), 1);

  return (
    <DashboardLayout role="teacher" title="Reports" subtitle="Your section trends">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Section avg. attendance" value={`${avg}%`} icon="✓" />
        <StatsCard label="Active courses" value={String(my.length)} icon="▣" />
        <StatsCard label="At-risk sessions" value="1" hint="Below 80% target" icon="!" />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Attendance trend</h2>
        <p className="text-xs text-slate-500">Weekly rate for your assigned courses (mock)</p>
        <div className="mt-6 flex items-end justify-between gap-2 overflow-x-auto pb-2">
          {attendanceTrend.map((w) => (
            <div key={w.week} className="flex min-w-[52px] flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-[40px] rounded-t-md bg-slate-700"
                style={{ height: `${(w.rate / max) * 140}px`, minHeight: "8px" }}
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
