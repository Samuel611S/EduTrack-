import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import {
  courses,
  getTeacherById,
  getStudentById,
  upcomingLectures,
} from "../../data/mockData.js";

const DEMO_STUDENT_ID = "s1";

export default function StudentDashboard() {
  const student = getStudentById(DEMO_STUDENT_ID);
  const enrolled = courses.filter((c) => c.enrolledStudentIds.includes(DEMO_STUDENT_ID));
  const avgAttendance = enrolled.length
    ? Math.round(
        enrolled.reduce((a, c) => a + c.averageAttendance, 0) / enrolled.length
      )
    : 0;
  const lectures = upcomingLectures.filter((u) =>
    student?.enrolledCourseIds.includes(u.courseId)
  );

  return (
    <DashboardLayout
      role="student"
      title="Student dashboard"
      subtitle={`Welcome back${student ? `, ${student.name.split(" ")[0]}` : ""}`}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Enrolled Courses"
          value={enrolled.length}
          icon="▣"
        />
        <StatsCard label="Average Attendance" value={`${avgAttendance}%`} icon="✓" />
        <StatsCard
          label="GPA"
          value={student ? student.gpa.toFixed(2) : "—"}
          icon="★"
        />
        <StatsCard label="Upcoming Lectures" value={lectures.length} hint="Next 7 days" icon="◷" />
      </div>

      {lectures.length > 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Upcoming lectures</h2>
          <ul className="mt-3 space-y-2">
            {lectures.map((u) => {
              const c = courses.find((x) => x.id === u.courseId);
              return (
                <li
                  key={u.id}
                  className="flex flex-col gap-1 border-b border-slate-100 py-2 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{u.title}</p>
                    <p className="text-xs text-slate-500">{c?.name}</p>
                  </div>
                  <div className="text-xs text-slate-600">
                    {new Date(u.when).toLocaleString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    · {u.room}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

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
