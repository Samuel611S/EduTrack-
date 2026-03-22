import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import ActivityFeed from "../../components/ActivityFeed.jsx";
import {
  students,
  teachers,
  courses,
  activityLogs,
} from "../../data/mockData.js";

const modules = [
  {
    to: "/admin/students",
    title: "Manage Students",
    desc: "Enrollments, profiles, and academic records.",
    icon: "◎",
  },
  {
    to: "/admin/teachers",
    title: "Manage Teachers",
    desc: "Faculty roster and department assignments.",
    icon: "◇",
  },
  {
    to: "/admin/reports",
    title: "Attendance Reports",
    desc: "Trends, exports, and compliance summaries.",
    icon: "▤",
  },
  {
    to: "/admin/courses",
    title: "Manage Courses",
    desc: "Sections, schedules, and capacity planning.",
    icon: "▣",
  },
  {
    to: "/admin/settings",
    title: "Attendance radius",
    desc: "Default GPS check-in distance for all lectures.",
    icon: "⌖",
  },
  {
    to: "/admin/settings",
    title: "System settings",
    desc: "Attendance rules and campus defaults.",
    icon: "⚙",
  },
];

export default function AdminDashboard() {
  const avgAttendance = Math.round(
    courses.reduce((a, c) => a + c.averageAttendance, 0) / courses.length
  );

  return (
    <DashboardLayout
      role="admin"
      title="EduTrack+ Admin"
      subtitle="Overview and quick actions"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total Students" value={students.length} icon="◎" />
        <StatsCard label="Active Teachers" value={teachers.length} icon="◇" />
        <StatsCard
          label="Average Attendance"
          value={`${avgAttendance}%`}
          hint="Across all active courses"
          icon="✓"
        />
        <StatsCard label="Active Courses" value={courses.length} icon="▣" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">Management modules</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {modules.map((m) => (
              <Link
                key={m.title}
                to={m.to}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg text-slate-700 group-hover:bg-slate-900 group-hover:text-white">
                    {m.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{m.title}</h3>
                    <p className="mt-1 text-xs text-slate-600">{m.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed items={activityLogs} />
        </div>
      </div>
    </DashboardLayout>
  );
}
