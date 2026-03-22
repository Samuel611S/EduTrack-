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
      <div className="lms-panel flex flex-col p-5 transition hover:shadow-md">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-lms-accent">{course.courseCode}</p>
          <h3 className="font-serif text-lg font-semibold text-lms-navy">{course.name}</h3>
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
        <div className="mt-4 flex flex-wrap gap-2 border-t border-lms-border pt-4">
          <button
            type="button"
            className="rounded-lg border border-lms-border bg-white px-3 py-1.5 text-xs font-semibold text-lms-navy hover:bg-lms-canvas"
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
          >
            Delete
          </button>
          <Link
            to={detailLink}
            className="rounded-lg bg-lms-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-lms-navy-light"
          >
            Open course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lms-panel flex flex-col p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg font-semibold text-lms-navy">{course.name}</h3>
          <p className="text-sm text-slate-600">{teacherName}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{course.courseCode}</p>
        </div>
        {grade && (
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-lms-accent">
            {grade}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-3">
        <ProgressBar label="Course progress" value={courseProgress} colorClass="bg-lms-navy" />
        <ProgressBar
          label="Attendance rate"
          value={attendancePct}
          colorClass="bg-lms-accent"
        />
      </div>
      <Link
        to={detailLink}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-lms-accent py-2.5 text-sm font-semibold text-white hover:bg-lms-accent-hover"
      >
        Enter course
      </Link>
    </div>
  );
}
