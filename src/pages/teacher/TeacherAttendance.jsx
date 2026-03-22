import DashboardLayout from "../../components/DashboardLayout.jsx";
import TeacherAttendancePanel from "../../components/TeacherAttendancePanel.jsx";

const DEMO_TEACHER_ID = "t1";

export default function TeacherAttendance() {
  return (
    <DashboardLayout
      role="teacher"
      title="Attendance"
      subtitle="Mark, edit, and review student attendance"
    >
      <TeacherAttendancePanel teacherId={DEMO_TEACHER_ID} />
    </DashboardLayout>
  );
}
