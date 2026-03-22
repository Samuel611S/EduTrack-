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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              University attendance
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              EduTrack+
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:border-slate-400 focus:bg-white focus:ring-2"
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:border-slate-400 focus:bg-white focus:ring-2"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Log in
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-center text-xs font-medium text-slate-500">Demo access</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => go("admin")}
                className="rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Login as Admin
              </button>
              <button
                type="button"
                onClick={() => go("teacher")}
                className="rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Login as Teacher
              </button>
              <button
                type="button"
                onClick={() => go("student")}
                className="rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50 sm:col-span-1"
              >
                Login as Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
