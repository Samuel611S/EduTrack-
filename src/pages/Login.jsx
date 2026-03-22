import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const destinations = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
};

export default function Login() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function go(role) {
    loginAs(role);
    navigate(from && from !== "/login" ? from : destinations[role], { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    go("student");
  }

  return (
    <div className="flex min-h-screen flex-col bg-lms-canvas lg:flex-row">
      <div className="flex flex-1 flex-col justify-center bg-lms-navy px-4 py-12 text-white sm:px-8 lg:max-w-[52%] lg:px-12">
        <div className="mx-auto max-w-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300/90">
            Chapter 4 · Wireframe prototype
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            EduTrack+
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            Learning Management System with GPS-verified attendance
          </p>
          <p className="mt-6 text-sm leading-relaxed text-slate-400">
            This build implements the wireframe flows as a clickable LMS: course shells, role-based
            navigation (Admin / Instructor / Student), and location-based attendance during scheduled
            lecture windows.
          </p>
          <ol className="mt-8 space-y-4 border-l border-white/20 pl-5">
            <li className="text-sm text-slate-200">
              <span className="font-semibold text-teal-300">1.</span> Enroll in courses and open
              materials
            </li>
            <li className="text-sm text-slate-200">
              <span className="font-semibold text-teal-300">2.</span> During a live lecture window,
              tap <strong className="text-white">Mark Attendance</strong> — the browser requests
              GPS
            </li>
            <li className="text-sm text-slate-200">
              <span className="font-semibold text-teal-300">3.</span> Check-in succeeds only inside
              the geofence radius defined for that session
            </li>
          </ol>
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
            <p className="font-semibold text-slate-300">Demo mode</p>
            <p className="mt-1">
              Use the role buttons to explore each persona. Data is mocked in JSON with local
              persistence for attendance actions.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lms-panel p-8 shadow-lg shadow-lms-navy/5">
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-wider text-lms-accent">
                Sign in to the LMS
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-lms-navy">
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Use your university email and password (demo)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-lms-navy">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2.5 text-sm outline-none ring-lms-accent/20 focus:border-lms-accent focus:ring-2"
                  placeholder="you@university.edu"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-lms-navy">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-lms-border bg-white px-3 py-2.5 text-sm outline-none ring-lms-accent/20 focus:border-lms-accent focus:ring-2"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-lms-accent py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lms-accent-hover"
              >
                Log in
              </button>
            </form>

            <div className="mt-8 border-t border-lms-border pt-6">
              <p className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Jump to persona (prototype)
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => go("admin")}
                  className="rounded-lg border border-lms-border bg-lms-paper py-2.5 text-xs font-semibold text-lms-navy shadow-sm hover:bg-lms-canvas"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => go("teacher")}
                  className="rounded-lg border border-lms-border bg-lms-paper py-2.5 text-xs font-semibold text-lms-navy shadow-sm hover:bg-lms-canvas"
                >
                  Instructor
                </button>
                <button
                  type="button"
                  onClick={() => go("student")}
                  className="rounded-lg border border-lms-border bg-lms-paper py-2.5 text-xs font-semibold text-lms-navy shadow-sm hover:bg-lms-canvas"
                >
                  Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
