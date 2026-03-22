import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";

export default function CourseCard({
  variant,
  course,
  teacherName,
  courseProgress,
  attendancePct,
  grade,
  detailLink,
}) {
  if (variant === "teacher") {
    return (
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {course.courseCode}
          </p>
          <h3 className="text-base font-semibold text-slate-900">{course.name}</h3>
          <p className="text-sm text-slate-600">{course.semester}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Enrolled</p>
              <p className="font-medium tabular-nums text-slate-900">
                {course.enrolledStudentIds.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Avg. attendance</p>
              <p className="font-medium tabular-nums text-slate-900">
                {course.averageAttendance}%
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
          >
            Delete
          </button>
          <Link
            to={detailLink}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{course.name}</h3>
          <p className="text-sm text-slate-600">{teacherName}</p>
          <p className="mt-1 text-xs text-slate-500">{course.courseCode}</p>
        </div>
        {grade && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
            {grade}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-3">
        <ProgressBar label="Course progress" value={courseProgress} colorClass="bg-slate-800" />
        <ProgressBar
          label="Attendance rate"
          value={attendancePct}
          colorClass="bg-emerald-600"
        />
      </div>
      <Link
        to={detailLink}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
      >
        View Course Details
      </Link>
    </div>
  );
}
