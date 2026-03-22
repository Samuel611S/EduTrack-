import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import { courses, students } from "../../data/mockData.js";

const DEMO_TEACHER_ID = "t1";

export default function TeacherDashboard() {
  const myCourses = courses.filter((c) => c.teacherId === DEMO_TEACHER_ID);
  const totalStudents = new Set(myCourses.flatMap((c) => c.enrolledStudentIds)).size;
  const avgAttendance = myCourses.length
    ? Math.round(
        myCourses.reduce((a, c) => a + c.averageAttendance, 0) / myCourses.length
      )
    : 0;

  return (
    <DashboardLayout
      role="teacher"
      title="Teacher dashboard"
      subtitle="Your courses and attendance snapshot"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">My courses</h2>
          <p className="text-xs text-slate-500">Spring 2025 · Demo instructor (CS)</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
        >
          + Add Course
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Total Students" value={totalStudents} icon="◎" />
        <StatsCard label="Average Attendance" value={`${avgAttendance}%`} icon="✓" />
        <StatsCard label="Active Courses" value={myCourses.length} icon="▣" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {myCourses.map((c) => (
          <CourseCard
            key={c.id}
            variant="teacher"
            course={c}
            detailLink={`/teacher/course/${c.id}`}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Viewing as instructor with {students.length} students university-wide in mock data.
      </p>
    </DashboardLayout>
  );
}
