import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roleLabels = {
  admin: "Administrator",
  teacher: "Instructor",
  student: "Student",
};

export default function Navbar({ title, subtitle, breadcrumbs }) {
  const { role, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-lms-border bg-lms-paper/95 backdrop-blur-md">
      <div className="bg-lms-paper">
        <div className="flex min-h-14 flex-col justify-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-slate-500">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-400">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-lms-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-serif text-xl font-semibold tracking-tight text-lms-navy sm:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {role && (
                <span className="hidden rounded-full border border-lms-border bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-lms-navy sm:inline">
                  {roleLabels[role]}
                </span>
              )}
              {role ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-lms-border bg-white px-3 py-1.5 text-xs font-semibold text-lms-navy shadow-sm transition hover:bg-lms-canvas"
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg bg-lms-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-lms-accent-hover"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
