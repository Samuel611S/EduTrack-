import { NavLink } from "react-router-dom";
import {
  IconBook,
  IconChart,
  IconFolder,
  IconHome,
  IconMapPin,
  IconSettings,
  IconUsers,
} from "./LmsNavIcons.jsx";

const linkInactive =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white";
const linkActive = "flex items-center gap-3 rounded-lg bg-white/15 px-3 py-2.5 text-sm font-semibold text-white shadow-inner";

function Item({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? linkActive : linkInactive)}
    >
      <Icon className="h-5 w-5 shrink-0 opacity-90" />
      <span>{children}</span>
    </NavLink>
  );
}

function NavSection({ title, children }) {
  return (
    <div className="mb-5">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

export default function Sidebar({ role }) {
  const brand =
    role === "admin" ? "Admin" : role === "teacher" ? "Instructor" : "Student";

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col bg-lms-navy lg:flex">
      <div className="border-b border-white/10 px-4 py-5">
        <p className="font-serif text-lg font-semibold tracking-tight text-white">EduTrack+</p>
        <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-teal-300/90">
          LMS · GPS attendance
        </p>
        <span className="mt-3 inline-block rounded-md bg-lms-navy-light px-2.5 py-1 text-[11px] font-semibold text-teal-100">
          {brand} view
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {role === "admin" && (
          <>
            <NavSection title="Institution">
              <Item to="/admin/dashboard" icon={IconHome}>
                Overview
              </Item>
              <Item to="/admin/courses" icon={IconBook}>
                Courses &amp; catalog
              </Item>
              <Item to="/admin/reports" icon={IconChart}>
                Reports &amp; analytics
              </Item>
              <Item to="/admin/settings" icon={IconSettings}>
                Attendance settings
              </Item>
            </NavSection>
            <NavSection title="People">
              <Item to="/admin/students" icon={IconUsers}>
                Students
              </Item>
              <Item to="/admin/teachers" icon={IconUsers}>
                Faculty
              </Item>
            </NavSection>
          </>
        )}
        {role === "teacher" && (
          <>
            <NavSection title="Teaching">
              <Item to="/teacher/dashboard" icon={IconHome}>
                Course home
              </Item>
              <Item to="/teacher/lectures" icon={IconBook}>
                Lectures &amp; locations
              </Item>
            </NavSection>
            <NavSection title="Attendance &amp; data">
              <Item to="/teacher/attendance" icon={IconMapPin}>
                Attendance (GPS + manual)
              </Item>
              <Item to="/teacher/reports" icon={IconChart}>
                Reports
              </Item>
            </NavSection>
          </>
        )}
        {role === "student" && (
          <>
            <NavSection title="My learning">
              <Item to="/student/dashboard" icon={IconHome}>
                Dashboard
              </Item>
              <Item to="/student/materials" icon={IconFolder}>
                Course materials
              </Item>
            </NavSection>
            <NavSection title="Attendance">
              <Item to="/student/attendance" icon={IconMapPin}>
                GPS check-in log
              </Item>
            </NavSection>
          </>
        )}
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className="text-[10px] leading-relaxed text-slate-500">
          Prototype UI — wireframes implemented as a clickable LMS shell.
        </p>
      </div>
    </aside>
  );
}
