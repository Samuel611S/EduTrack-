import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roleLabels = {
  admin: "Administrator",
  teacher: "Teacher",
  student: "Student",
};

export default function Navbar({ title, subtitle }) {
  const { role, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden text-xs text-slate-500 sm:block">{subtitle}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {role && (
            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 sm:inline">
              {roleLabels[role]}
            </span>
          )}
          {role ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
