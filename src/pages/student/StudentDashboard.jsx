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
      title="Student dashboard"
      subtitle={`Welcome back${student ? `, ${student.name.split(" ")[0]}` : ""}`}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Enrolled Courses" value={enrolled.length} icon="▣" />
        <StatsCard label="Average Attendance" value={`${avgAttendance}%`} icon="✓" />
        <StatsCard
          label="GPA"
          value={student ? student.gpa.toFixed(2) : "—"}
          icon="★"
        />
        <StatsCard
          label="Scheduled lectures"
          value={lecturesForStudent.length}
          hint="GPS self check-in"
          icon="◷"
        />
      </div>

      <h2 className="mt-10 text-sm font-semibold text-slate-900">Mark attendance (GPS)</h2>
      <p className="mt-1 text-xs text-slate-500">
        You must be within the allowed radius during the lecture window. Teachers cannot mark
        attendance for you.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
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

      <h2 className="mt-10 text-sm font-semibold text-slate-900">My courses</h2>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
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
    </DashboardLayout>
  );
}
