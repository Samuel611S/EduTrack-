import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAppData } from "../../context/AppDataContext.jsx";

export default function AdminSettings() {
  const { settings, updateSettings } = useAppData();
  const [radius, setRadius] = useState(String(settings.defaultAttendanceRadiusMeters));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setRadius(String(settings.defaultAttendanceRadiusMeters));
  }, [settings.defaultAttendanceRadiusMeters]);

  function handleSubmit(e) {
    e.preventDefault();
    const n = Number(radius);
    if (!Number.isFinite(n) || n <= 0) return;
    updateSettings({ defaultAttendanceRadiusMeters: Math.round(n) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <DashboardLayout
      role="admin"
      title="Attendance settings"
      subtitle="GPS radius for lecture check-in"
    >
      <div className="max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Students must be within this distance (in meters) of the lecture&apos;s defined
          coordinates to mark attendance. Individual lectures can override this value when
          teachers create a session.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="radius" className="block text-xs font-medium text-slate-700">
              Default attendance radius (meters)
            </label>
            <input
              id="radius"
              type="number"
              min={10}
              max={5000}
              step={10}
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-slate-500">Example: 100 meters</p>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save settings
          </button>
          {saved && (
            <p className="text-sm font-medium text-emerald-800">Settings saved.</p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
