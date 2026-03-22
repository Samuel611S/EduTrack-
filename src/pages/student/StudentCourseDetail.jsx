import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import {
  attendanceLogs,
  getCourseById,
  getStudentById,
  getTeacherById,
} from "../../data/mockData.js";

const DEMO_STUDENT_ID = "s1";

export default function StudentCourseDetail() {
  const { id } = useParams();
  const course = getCourseById(id);
  const me = getStudentById(DEMO_STUDENT_ID);

  if (!course || !course.enrolledStudentIds.includes(DEMO_STUDENT_ID)) {
    return (
      <DashboardLayout role="student" title="Course" subtitle="Not available">
        <p className="text-sm text-slate-600">
          You are not enrolled in this course (demo uses student s1).{" "}
          <Link to="/student/dashboard" className="font-medium text-slate-900 underline">
            Back to dashboard
          </Link>
        </p>
      </DashboardLayout>
    );
  }

  const teacher = getTeacherById(course.teacherId);
  const roster = course.enrolledStudentIds.map((sid) => getStudentById(sid)).filter(Boolean);
  const myLogs = attendanceLogs
    .filter((a) => a.courseId === course.id && a.studentId === DEMO_STUDENT_ID)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout
      role="student"
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
            <dt className="text-xs font-medium uppercase text-slate-500">Your grade (mock)</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {course.currentGradeByStudent?.[DEMO_STUDENT_ID] ?? "—"}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate-500">Signed in as {me?.name} (demo).</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Class roster</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Student ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roster.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{s.studentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Your attendance history</h2>
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {myLogs.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-sm text-slate-500">
                  No rows for this course in mock data.
                </td>
              </tr>
            ) : (
              myLogs.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 tabular-nums text-slate-800">{row.date}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
