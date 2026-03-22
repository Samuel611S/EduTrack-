import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import TeacherAttendancePanel from "../../components/TeacherAttendancePanel.jsx";
import {
  getCourseById,
  getStudentById,
  getTeacherById,
  getAllLectures,
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

  const scheduledLectures = getAllLectures()
    .filter((l) => l.courseId === course.id)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  return (
    <DashboardLayout
      role="teacher"
      title={course.name}
      subtitle={`${course.courseCode} · ${course.semester} · Instructor course shell`}
      breadcrumbs={[
        { label: "Teaching", to: "/teacher/dashboard" },
        { label: course.courseCode },
      ]}
    >
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase text-slate-500">Instructor</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{teacher?.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase text-slate-500">Avg. attendance (mock)</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {course.averageAttendance}%
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-slate-600">
          You can <strong>mark or edit attendance</strong> below, or let students check in with GPS.
          Manage lecture times and coordinates under{" "}
          <Link to="/teacher/lectures" className="font-medium text-slate-900 underline">
            Lectures
          </Link>
          .
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">Scheduled lectures (location)</h2>
          <p className="text-xs text-slate-500">Coordinates used for student GPS check-in</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {scheduledLectures.length === 0 ? (
            <li className="px-4 py-6 text-sm text-slate-500">No lectures scheduled.</li>
          ) : (
            scheduledLectures.map((l) => (
              <li key={l.id} className="px-4 py-3">
                <p className="text-sm font-medium text-slate-900">{l.title}</p>
                <p className="text-xs text-slate-600">{l.locationLabel}</p>
                <p className="mt-1 text-xs tabular-nums text-slate-500">
                  {new Date(l.startsAt).toLocaleString()} — {new Date(l.endsAt).toLocaleString()}
                </p>
                <p className="text-xs tabular-nums text-slate-500">
                  Lat {l.latitude}, Lng {l.longitude}
                  {typeof l.allowedRadiusMeters === "number"
                    ? ` · radius ${l.allowedRadiusMeters} m`
                    : " · default campus radius"}
                </p>
              </li>
            ))
          )}
        </ul>
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

      <div className="mt-8">
        <TeacherAttendancePanel courseId={course.id} teacherId={course.teacherId} />
      </div>
    </DashboardLayout>
  );
}
