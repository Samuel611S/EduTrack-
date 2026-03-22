import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import LmsPrototypeFooter from "./LmsPrototypeFooter.jsx";

function MobileNav({ role, onClose }) {
  const items =
    role === "admin"
      ? [
          ["/admin/dashboard", "Overview"],
          ["/admin/students", "Students"],
          ["/admin/teachers", "Faculty"],
          ["/admin/courses", "Courses"],
          ["/admin/reports", "Reports"],
          ["/admin/settings", "Settings"],
        ]
      : role === "teacher"
        ? [
            ["/teacher/dashboard", "Course home"],
            ["/teacher/lectures", "Lectures"],
            ["/teacher/attendance", "Attendance"],
            ["/teacher/reports", "Reports"],
          ]
        : [
            ["/student/dashboard", "Dashboard"],
            ["/student/attendance", "GPS log"],
            ["/student/materials", "Materials"],
          ];

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-lms-navy/50"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-white/10 bg-lms-navy shadow-xl">
        <div className="border-b border-white/10 px-4 py-4">
          <p className="font-serif text-lg font-semibold text-white">EduTrack+</p>
          <p className="text-[11px] text-teal-200/90">LMS prototype</p>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {items.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
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

export default function DashboardLayout({ title, subtitle, role, breadcrumbs, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-lms-canvas">
      <div className="flex min-h-0 flex-1">
        <Sidebar role={role} />
        {menuOpen && <MobileNav role={role} onClose={() => setMenuOpen(false)} />}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-lms-border bg-lms-navy px-4 py-3 lg:hidden">
            <button
              type="button"
              className="rounded-lg p-2 text-white hover:bg-white/10"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <p className="font-serif text-sm font-semibold text-white">EduTrack+</p>
              <p className="text-[10px] text-teal-200/80">LMS · GPS attendance</p>
            </div>
          </div>
          <Navbar title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />
          <main className="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl flex-1">{children}</div>
            <LmsPrototypeFooter />
          </main>
        </div>
      </div>
    </div>
  );
}
