import DashboardLayout from "../../components/DashboardLayout.jsx";
import { students } from "../../data/mockData.js";

export default function AdminStudents() {
  return (
    <DashboardLayout role="admin" title="Students" subtitle="Directory and records">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">GPA</th>
              <th className="px-4 py-3">Courses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{s.studentId}</td>
                <td className="px-4 py-3 text-slate-600">{s.email}</td>
                <td className="px-4 py-3 tabular-nums text-slate-800">{s.gpa.toFixed(2)}</td>
                <td className="px-4 py-3 text-slate-600">{s.enrolledCourseIds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
