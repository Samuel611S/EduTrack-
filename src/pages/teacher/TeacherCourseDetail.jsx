import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import {
  attendanceLogs,
  getCourseById,
  getStudentById,
  getTeacherById,
} from "../../data/mockData.js";

export default function TeacherCourseDetail() {
  const { id } = useParams();
  const course = getCourseById(id);

  if (!course) {
    return (
      <DashboardLayout role="teacher" title="Course" subtitle="Not found">
        <p className="text-sm text-slate-600">
          Course not found.{" "}
          <Link to="/teacher/dashboard" className="font-medium text-slate-900 underline">
            Back to dashboard
          </Link>
        </p>
      </DashboardLayout>
    );
  }

  const teacher = getTeacherById(course.teacherId);
  const roster = course.enrolledStudentIds.map((sid) => getStudentById(sid)).filter(Boolean);
  const history = attendanceLogs
    .filter((a) => a.courseId === course.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout
      role="teacher"
      title={course.name}
      subtitle={`${course.courseCode} · ${course.semester}`}
    >
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-slate-500">Instructor</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{teacher?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-slate-500">Avg. attendance</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {course.averageAttendance}%
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Student list</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roster.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{s.studentId}</td>
                <td className="px-4 py-3 text-slate-600">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Attendance history</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((row) => {
              const st = getStudentById(row.studentId);
              return (
                <tr key={row.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-900">{st?.name}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">{st?.studentId}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">{row.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "Present"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-rose-50 text-rose-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
