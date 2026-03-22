import DashboardLayout from "../../components/DashboardLayout.jsx";
import {
  attendanceLogs,
  courses,
  getStudentById,
  getCourseById,
} from "../../data/mockData.js";

const DEMO_TEACHER_ID = "t1";

export default function TeacherAttendance() {
  const teacherCourseIds = new Set(
    courses.filter((c) => c.teacherId === DEMO_TEACHER_ID).map((c) => c.id)
  );

  const rows = attendanceLogs
    .filter((a) => teacherCourseIds.has(a.courseId))
    .map((a) => ({
      ...a,
      student: getStudentById(a.studentId),
      course: getCourseById(a.courseId),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <DashboardLayout role="teacher" title="Attendance" subtitle="Mark and review records">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">{row.student?.name}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">
                  {row.student?.studentId}
                </td>
                <td className="px-4 py-3 text-slate-600">{row.course?.courseCode}</td>
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
                <td className="px-4 py-3 tabular-nums text-slate-600">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
