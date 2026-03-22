import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminStudents from "./pages/admin/AdminStudents.jsx";
import AdminTeachers from "./pages/admin/AdminTeachers.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import AdminReports from "./pages/admin/AdminReports.jsx";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import TeacherCourseDetail from "./pages/teacher/TeacherCourseDetail.jsx";
import TeacherAttendance from "./pages/teacher/TeacherAttendance.jsx";
import TeacherReports from "./pages/teacher/TeacherReports.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentCourseDetail from "./pages/student/StudentCourseDetail.jsx";
import StudentAttendance from "./pages/student/StudentAttendance.jsx";
import StudentMaterials from "./pages/student/StudentMaterials.jsx";

function HomeRedirect() {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  if (role === "student") return <Navigate to="/student/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeRedirect />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute role="admin">
            <AdminStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <ProtectedRoute role="admin">
            <AdminTeachers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute role="admin">
            <AdminCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute role="admin">
            <AdminReports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/course/:id"
        element={
          <ProtectedRoute role="teacher">
            <TeacherCourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/attendance"
        element={
          <ProtectedRoute role="teacher">
            <TeacherAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/reports"
        element={
          <ProtectedRoute role="teacher">
            <TeacherReports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/course/:id"
        element={
          <ProtectedRoute role="student">
            <StudentCourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute role="student">
            <StudentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/materials"
        element={
          <ProtectedRoute role="student">
            <StudentMaterials />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
