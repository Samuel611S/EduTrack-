import DashboardLayout from "../../components/DashboardLayout.jsx";
import { teachers } from "../../data/mockData.js";

export default function AdminTeachers() {
  return (
    <DashboardLayout role="admin" title="Teachers" subtitle="Faculty roster">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">{t.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{t.department}</p>
            <p className="mt-2 text-xs text-slate-500">{t.email}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
