import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

function MobileNav({ role, onClose }) {
  const items =
    role === "admin"
      ? [
          ["/admin/dashboard", "Dashboard"],
          ["/admin/students", "Students"],
          ["/admin/teachers", "Teachers"],
          ["/admin/courses", "Courses"],
          ["/admin/reports", "Reports"],
          ["/admin/settings", "Settings"],
        ]
      : role === "teacher"
        ? [
            ["/teacher/dashboard", "Dashboard"],
            ["/teacher/lectures", "Lectures"],
            ["/teacher/attendance", "Attendance"],
            ["/teacher/reports", "Reports"],
          ]
        : [
            ["/student/dashboard", "Dashboard"],
            ["/student/attendance", "Attendance"],
            ["/student/materials", "Materials"],
          ];

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-slate-200 bg-white shadow-xl">
        <div className="flex h-14 items-center border-b border-slate-200 px-4">
          <span className="text-sm font-semibold">EduTrack+</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default function DashboardLayout({ title, subtitle, role, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={role} />
      {menuOpen && <MobileNav role={role} onClose={() => setMenuOpen(false)} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="text-lg">☰</span>
          </button>
          <span className="text-sm font-semibold text-slate-900">EduTrack+</span>
        </div>
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
