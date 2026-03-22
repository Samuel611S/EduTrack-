import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import LectureMarkAttendanceCard from "../../components/LectureMarkAttendanceCard.jsx";
import { useAppData } from "../../context/AppDataContext.jsx";
import {
  getCourseById,
  getStudentById,
  getTeacherById,
  getAllLectures,
  getLectureById,
} from "../../data/mockData.js";
import { formatGpsCell } from "../../utils/attendanceStore.js";

const DEMO_STUDENT_ID = "s1";

export default function StudentCourseDetail() {
  const { id } = useParams();
  const { records } = useAppData();
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

  const courseLectures = getAllLectures()
    .filter((l) => l.courseId === course.id)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  const myLogs = records
    .filter((a) => a.student_id === DEMO_STUDENT_ID && a.course_id === course.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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

      <h2 className="mt-8 text-sm font-semibold text-slate-900">Lectures &amp; attendance</h2>
      <p className="mt-1 text-xs text-slate-500">
        Use <strong>Mark Attendance</strong> during the scheduled window while on site. Attendance
        is verified with GPS.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {courseLectures.map((lec) => (
          <LectureMarkAttendanceCard
            key={lec.id}
            lecture={lec}
            course={course}
            studentId={DEMO_STUDENT_ID}
          />
        ))}
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
          <h2 className="text-sm font-semibold text-slate-900">Your attendance history (GPS)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">Lecture</th>
                <th className="whitespace-nowrap px-4 py-3">Timestamp</th>
                <th className="whitespace-nowrap px-4 py-3">Your GPS</th>
                <th className="whitespace-nowrap px-4 py-3">Source</th>
                <th className="whitespace-nowrap px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-500">
                    No attendance records yet for this course.
                  </td>
                </tr>
              ) : (
                myLogs.map((row) => {
                  const lec = getLectureById(row.lecture_id);
                  return (
                    <tr key={row.attendance_id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 text-slate-900">{lec?.title ?? row.lecture_id}</td>
                      <td className="px-4 py-3 tabular-nums text-slate-600">
                        {new Date(row.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-xs tabular-nums text-slate-600">
                        {formatGpsCell(row)}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {row.recorded_by === "teacher" ? "Instructor" : "You (GPS)"}
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
      </div>
    </DashboardLayout>
  );
}
