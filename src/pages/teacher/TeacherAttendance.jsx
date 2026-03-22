import DashboardLayout from "../../components/DashboardLayout.jsx";
import TeacherAttendancePanel from "../../components/TeacherAttendancePanel.jsx";

const DEMO_TEACHER_ID = "t1";

export default function TeacherAttendance() {
  return (
    <DashboardLayout
      role="teacher"
      title="Attendance workspace"
      subtitle="GPS logs, manual marks, and edits — one row per student per lecture"
      breadcrumbs={[
        { label: "Teaching", to: "/teacher/dashboard" },
        { label: "Attendance" },
      ]}
    >
      <TeacherAttendancePanel teacherId={DEMO_TEACHER_ID} />
    </DashboardLayout>
  );
}
