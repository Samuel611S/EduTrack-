import { useMemo, useState } from "react";
import { useAppData } from "../context/AppDataContext.jsx";
import { courses, getCourseById, getStudentById, getLectureById } from "../data/mockData.js";
import { getAllLectures } from "../data/lecturesMerged.js";
import { formatGpsCell } from "../utils/attendanceStore.js";

export default function TeacherAttendancePanel({ courseId: lockedCourseId, teacherId }) {
  const { records, upsertTeacherRecord, updateRecord } = useAppData();
  const teacherCourses = useMemo(
    () => courses.filter((c) => c.teacherId === teacherId),
    [teacherId]
  );
  const [selectedCourseId, setSelectedCourseId] = useState(
    lockedCourseId ?? teacherCourses[0]?.id ?? ""
  );
  const [lectureId, setLectureId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [formMsg, setFormMsg] = useState(null);

  const effectiveCourseId = lockedCourseId ?? selectedCourseId;
  const course = getCourseById(effectiveCourseId);
  const lecturesForCourse = getAllLectures().filter((l) => l.courseId === effectiveCourseId);
  const roster = course
    ? course.enrolledStudentIds.map((id) => getStudentById(id)).filter(Boolean)
    : [];

  const teacherCourseIds = useMemo(
    () => new Set(teacherCourses.map((c) => c.id)),
    [teacherCourses]
  );

  const tableRows = useMemo(
    () =>
      records
        .filter(
          (r) =>
            teacherCourseIds.has(r.course_id) &&
            (!lockedCourseId || r.course_id === lockedCourseId)
        )
        .map((r) => ({
          ...r,
          student: getStudentById(r.student_id),
          course: getCourseById(r.course_id),
          lecture: getLectureById(r.lecture_id),
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [records, teacherCourseIds, lockedCourseId]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setFormMsg(null);
    if (!effectiveCourseId || !lectureId || !studentId) {
      setFormMsg("Select lecture and student.");
      return;
    }
    if (!course?.enrolledStudentIds.includes(studentId)) {
      setFormMsg("Student is not enrolled in this course.");
      return;
    }
    upsertTeacherRecord({
      student_id: studentId,
      course_id: effectiveCourseId,
      lecture_id: lectureId,
      teacher_id: teacherId,
      status,
    });
    setFormMsg("Attendance saved.");
    setTimeout(() => setFormMsg(null), 3000);
  }

  function handleRowStatusChange(row, nextStatus) {
    updateRecord(row.attendance_id, {
      status: nextStatus,
      recorded_by: "teacher",
      teacher_id: teacherId,
      timestamp: new Date().toISOString(),
    });
  }

  const colCount = lockedCourseId ? 6 : 7;

  return (
    <div className="space-y-6">
      <div className="lms-panel p-4 sm:p-6">
        <h2 className="font-serif text-base font-semibold text-lms-navy">Mark or update attendance</h2>
        <p className="mt-1 text-xs text-slate-600">
          Record <strong>Present</strong> or <strong>Absent</strong> for any enrolled student and
          scheduled lecture. One row per student per lecture — this merges with student GPS
          check-ins.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {!lockedCourseId && (
              <div>
                <label className="block text-xs font-semibold text-lms-navy">Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setLectureId("");
                    setStudentId("");
                  }}
                  className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2 text-sm"
                >
                  {teacherCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.courseCode} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-lms-navy">Lecture</label>
              <select
                value={lectureId}
                onChange={(e) => setLectureId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Select lecture</option>
                {lecturesForCourse.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-lms-navy">Student</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Select student</option>
                {roster.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.studentId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-lms-navy">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2 text-sm"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-lg bg-lms-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-lms-navy-light"
            >
              Save attendance
            </button>
          </div>
        </form>
        {formMsg && <p className="mt-3 text-sm font-medium text-emerald-800">{formMsg}</p>}
      </div>

      <div className="lms-panel overflow-hidden">
        <div className="lms-panel-header">
          <h2 className="font-serif text-sm font-semibold text-lms-navy">Attendance records</h2>
          <p className="text-xs text-slate-500">
            Use the status dropdown to edit. Teacher updates are labeled in Source.
          </p>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-lms-border bg-lms-canvas/80 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="whitespace-nowrap px-4 py-3">Student</th>
              {!lockedCourseId && (
                <th className="whitespace-nowrap px-4 py-3">Course</th>
              )}
              <th className="whitespace-nowrap px-4 py-3">Lecture</th>
              <th className="whitespace-nowrap px-4 py-3">Timestamp</th>
              <th className="whitespace-nowrap px-4 py-3">GPS</th>
              <th className="whitespace-nowrap px-4 py-3">Source</th>
              <th className="whitespace-nowrap px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lms-border">
            {tableRows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="px-4 py-6 text-center text-slate-500">
                  No records yet.
                </td>
              </tr>
            ) : (
              tableRows.map((row) => (
                <tr key={row.attendance_id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.student?.name}</td>
                  {!lockedCourseId && (
                    <td className="px-4 py-3 text-slate-600">{row.course?.courseCode}</td>
                  )}
                  <td className="px-4 py-3 text-slate-700">
                    {row.lecture?.title ?? row.lecture_id}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-slate-600">
                    {new Date(row.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs tabular-nums text-slate-600">
                    {formatGpsCell(row)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {row.recorded_by === "teacher" ? "Teacher" : "Student (GPS)"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      onChange={(e) => handleRowStatusChange(row, e.target.value)}
                      className="rounded-lg border border-lms-border bg-white px-2 py-1 text-xs font-medium"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
