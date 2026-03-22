import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import LectureMarkAttendanceCard from "../../components/LectureMarkAttendanceCard.jsx";
import {
  courses,
  getTeacherById,
  getStudentById,
  getAllLectures,
} from "../../data/mockData.js";

const DEMO_STUDENT_ID = "s1";

export default function StudentDashboard() {
  const student = getStudentById(DEMO_STUDENT_ID);
  const enrolled = courses.filter((c) => c.enrolledStudentIds.includes(DEMO_STUDENT_ID));
  const enrolledIds = new Set(student?.enrolledCourseIds ?? []);
  const avgAttendance = enrolled.length
    ? Math.round(
        enrolled.reduce((a, c) => a + c.averageAttendance, 0) / enrolled.length
      )
    : 0;

  const lecturesForStudent = getAllLectures()
    .filter((l) => enrolledIds.has(l.courseId))
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  return (
    <DashboardLayout
      role="student"
      title="Learning dashboard"
      subtitle={`Welcome back${student ? `, ${student.name.split(" ")[0]}` : ""} · Your courses and GPS attendance`}
      breadcrumbs={[
        { label: "Home", to: "/student/dashboard" },
        { label: "Dashboard" },
      ]}
    >
      <div className="lms-panel mb-8 overflow-hidden border-l-4 border-lms-accent">
        <div className="border-b border-lms-border bg-white/90 px-5 py-4">
          <h2 className="font-serif text-lg font-semibold text-lms-navy">Course overview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Wireframe zone: <strong>summary</strong> — enrollment, grades, and attendance snapshot
            (mock data).
          </p>
        </div>
        <div className="grid gap-4 bg-lms-paper p-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard label="Enrolled courses" value={enrolled.length} icon="▣" />
          <StatsCard label="Average attendance" value={`${avgAttendance}%`} icon="✓" />
          <StatsCard label="GPA" value={student ? student.gpa.toFixed(2) : "—"} icon="★" />
          <StatsCard
            label="Lecture sessions"
            value={lecturesForStudent.length}
            hint="Eligible for GPS check-in"
            icon="◷"
          />
        </div>
      </div>

      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-lms-navy">GPS attendance</h2>
          <p className="mt-1 text-sm text-slate-600">
            Wireframe zone: <strong>live check-in</strong> — browser location must fall inside the
            lecture geofence during the scheduled window.
          </p>
        </div>
      </div>
      <p className="mb-4 text-xs text-slate-500">
        Instructors can also record or adjust attendance from their view; your GPS check-in
        appears in the log with coordinates when successful.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {lecturesForStudent.map((lec) => {
          const c = courses.find((x) => x.id === lec.courseId);
          if (!c) return null;
          return (
            <LectureMarkAttendanceCard
              key={lec.id}
              lecture={lec}
              course={c}
              studentId={DEMO_STUDENT_ID}
            />
          );
        })}
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-lms-navy">My courses</h2>
        <p className="mt-1 text-sm text-slate-600">
          Wireframe zone: <strong>course cards</strong> — progress, attendance, and entry to the
          course workspace.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {enrolled.map((c) => {
            const teacher = getTeacherById(c.teacherId);
            const grade = c.currentGradeByStudent?.[DEMO_STUDENT_ID] ?? "—";
            const courseProgress = 62 + (c.id.charCodeAt(1) % 30);
            return (
              <CourseCard
                key={c.id}
                variant="student"
                course={c}
                teacherName={teacher?.name ?? "—"}
                courseProgress={courseProgress}
                attendancePct={c.averageAttendance}
                grade={grade}
                detailLink={`/student/course/${c.id}`}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
