import DashboardLayout from "../../components/DashboardLayout.jsx";
import { courses } from "../../data/mockData.js";

const DEMO_STUDENT_ID = "s1";

const materials = [
  { id: "m1", title: "Syllabus — Spring 2025", type: "PDF", size: "240 KB" },
  { id: "m2", title: "Lecture slides — Week 8", type: "PPTX", size: "1.2 MB" },
  { id: "m3", title: "Assignment 3 — rubric", type: "PDF", size: "88 KB" },
];

export default function StudentMaterials() {
  const enrolled = courses.filter((c) => c.enrolledStudentIds.includes(DEMO_STUDENT_ID));

  return (
    <DashboardLayout role="student" title="Materials" subtitle="Course resources (demo)">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Enrolled</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {enrolled.map((c) => (
                <li key={c.id} className="flex justify-between gap-2 border-b border-slate-100 py-2 last:border-0">
                  <span className="font-medium">{c.courseCode}</span>
                  <span className="truncate text-slate-500">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-900">Downloads</h2>
              <p className="text-xs text-slate-500">Mock files — buttons are non-functional</p>
            </div>
            <ul className="divide-y divide-slate-100">
              {materials.map((m) => (
                <li
                  key={m.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{m.title}</p>
                    <p className="text-xs text-slate-500">
                      {m.type} · {m.size}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
