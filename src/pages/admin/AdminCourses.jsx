import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import { courses, getTeacherById } from "../../data/mockData.js";

export default function AdminCourses() {
  return (
    <DashboardLayout role="admin" title="Courses" subtitle="Catalog overview">
      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((c) => {
          const teacher = getTeacherById(c.teacherId);
          return (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">{c.courseCode}</p>
                  <h3 className="text-base font-semibold text-slate-900">{c.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.semester}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {c.averageAttendance}% avg
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Instructor: {teacher?.name ?? "—"}
              </p>
              <p className="text-sm text-slate-600">
                Enrolled: {c.enrolledStudentIds.length} students
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  to={`/teacher/course/${c.id}`}
                  className="text-xs font-medium text-slate-900 underline-offset-2 hover:underline"
                >
                  Preview as course page
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
