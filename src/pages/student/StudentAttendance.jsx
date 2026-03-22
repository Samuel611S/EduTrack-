import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAppData } from "../../context/AppDataContext.jsx";
import { getCourseById, getLectureById, getStudentById } from "../../data/mockData.js";
import { formatGpsCell } from "../../utils/attendanceStore.js";

const DEMO_STUDENT_ID = "s1";

export default function StudentAttendance() {
  const { records } = useAppData();
  const student = getStudentById(DEMO_STUDENT_ID);
  const rows = records
    .filter((a) => a.student_id === DEMO_STUDENT_ID)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <DashboardLayout
      role="student"
      title="Attendance"
      subtitle="GPS-verified self check-ins"
    >
      <p className="mb-4 text-sm text-slate-600">
        You can check in with GPS during an active lecture, or your instructor may record attendance
        for you — both appear below.
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">attendance_id</th>
              <th className="whitespace-nowrap px-4 py-3">student_id</th>
              <th className="whitespace-nowrap px-4 py-3">course</th>
              <th className="whitespace-nowrap px-4 py-3">lecture</th>
              <th className="whitespace-nowrap px-4 py-3">timestamp</th>
              <th className="whitespace-nowrap px-4 py-3">GPS</th>
              <th className="whitespace-nowrap px-4 py-3">source</th>
              <th className="whitespace-nowrap px-4 py-3">status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-sm text-slate-500">
                  No attendance records yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
              const course = getCourseById(row.course_id);
              const lec = getLectureById(row.lecture_id);
              return (
                <tr key={row.attendance_id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{row.attendance_id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{row.student_id}</td>
                  <td className="px-4 py-3 text-slate-700">{course?.courseCode ?? row.course_id}</td>
                  <td className="px-4 py-3 text-slate-700">{lec?.title ?? row.lecture_id}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">
                    {new Date(row.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs tabular-nums text-slate-600">
                    {formatGpsCell(row)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {row.recorded_by === "teacher" ? "Instructor" : "GPS"}
                  </td>
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
            })
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Student: {student?.name} ({student?.studentId})
      </p>
    </DashboardLayout>
  );
}
