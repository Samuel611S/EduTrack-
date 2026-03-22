import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const defaultHome = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
};

export default function ProtectedRoute({ role, children }) {
  const { role: current, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && current !== role) {
    return <Navigate to={defaultHome[current] || "/login"} replace />;
  }
  return children;
}
