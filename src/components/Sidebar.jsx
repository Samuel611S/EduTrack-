import { NavLink } from "react-router-dom";

const linkBase =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition";

function Item({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${linkBase} ${
          isActive
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <span className="text-lg leading-none opacity-90">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
}

const adminNav = [
  { to: "/admin/dashboard", icon: "◆", label: "Dashboard" },
  { to: "/admin/students", icon: "◎", label: "Students" },
  { to: "/admin/teachers", icon: "◇", label: "Teachers" },
  { to: "/admin/courses", icon: "▣", label: "Courses" },
  { to: "/admin/reports", icon: "▤", label: "Reports" },
];

const teacherNav = [
  { to: "/teacher/dashboard", icon: "◆", label: "Dashboard" },
  { to: "/teacher/attendance", icon: "✓", label: "Attendance" },
  { to: "/teacher/reports", icon: "▤", label: "Reports" },
];

const studentNav = [
  { to: "/student/dashboard", icon: "◆", label: "Dashboard" },
  { to: "/student/attendance", icon: "✓", label: "Attendance" },
  { to: "/student/materials", icon: "▤", label: "Materials" },
];

export default function Sidebar({ role }) {
  const items =
    role === "admin" ? adminNav : role === "teacher" ? teacherNav : studentNav;
  const brand =
    role === "admin"
      ? "Admin"
      : role === "teacher"
        ? "Teacher"
        : "Student";

  return (
    <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-14 items-center border-b border-slate-200 px-4">
        <span className="text-sm font-semibold text-slate-900">EduTrack+</span>
        <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {brand}
        </span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {items.map((n) => (
          <Item key={n.to} to={n.to} icon={n.icon}>
            {n.label}
          </Item>
        ))}
      </nav>
    </aside>
  );
}
