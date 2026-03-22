import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAppData } from "../../context/AppDataContext.jsx";
import { courses, getCourseById } from "../../data/mockData.js";
import { getAllLectures } from "../../data/lecturesMerged.js";
import { getCurrentPosition } from "../../utils/geolocation.js";

const DEMO_TEACHER_ID = "t1";

export default function TeacherLectures() {
  const { addTeacherLecture } = useAppData();
  const myCourses = courses.filter((c) => c.teacherId === DEMO_TEACHER_ID);
  const [courseId, setCourseId] = useState(myCourses[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  if (myCourses.length === 0) {
    return (
      <DashboardLayout role="teacher" title="Lectures" subtitle="No courses assigned">
        <p className="text-sm text-slate-600">You have no courses in the demo dataset.</p>
      </DashboardLayout>
    );
  }

  const lectures = getAllLectures().filter((l) => {
    const c = getCourseById(l.courseId);
    return c?.teacherId === DEMO_TEACHER_ID;
  });

  function fillLocation() {
    setErr(null);
    getCurrentPosition()
      .then((pos) => {
        setLatitude(String(pos.coords.latitude));
        setLongitude(String(pos.coords.longitude));
      })
      .catch((e) => {
        if (e?.code === 1) setErr("Location access is required to fill coordinates.");
        else setErr(e?.message || "Could not read location.");
      });
  }

  function handleCreate(e) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (!courseId || !title.trim() || !locationLabel.trim()) {
      setErr("Course, title, and location are required.");
      return;
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      setErr("Valid latitude and longitude are required.");
      return;
    }
    if (!startsAt || !endsAt) {
      setErr("Start and end time are required.");
      return;
    }
    const start = new Date(startsAt);
    const end = new Date(endsAt);
    if (end <= start) {
      setErr("End time must be after start time.");
      return;
    }

    addTeacherLecture({
      id: `lec-${Date.now()}`,
      courseId,
      title: title.trim(),
      locationLabel: locationLabel.trim(),
      latitude: lat,
      longitude: lon,
      allowedRadiusMeters: radius === "" ? null : Number(radius),
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      createdByTeacherId: DEMO_TEACHER_ID,
    });
    setMsg("Lecture created. Students can mark attendance only during the scheduled window when on site.");
    setTitle("");
    setLocationLabel("");
    setLatitude("");
    setLongitude("");
    setRadius("");
    setStartsAt("");
    setEndsAt("");
  }

  return (
    <DashboardLayout
      role="teacher"
      title="Lectures"
      subtitle="Create sessions and define GPS check-in locations"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Create lecture</h2>
          <p className="mt-1 text-xs text-slate-500">
            Students may self check-in with GPS during the active window, or you can record
            attendance on the Attendance page or course page.
          </p>
          <form onSubmit={handleCreate} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {myCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.courseCode} — {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Lecture title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="e.g. Week 9 — Trees and heaps"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">Location label</label>
              <input
                value={locationLabel}
                onChange={(e) => setLocationLabel(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Building and room"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700">Latitude</label>
                <input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="40.712776"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">Longitude</label>
                <input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder="-74.005974"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={fillLocation}
              className="text-xs font-semibold text-slate-800 underline"
            >
              Use my current location
            </button>
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Radius override (meters, optional)
              </label>
              <input
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Leave blank for campus default"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700">Starts</label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">Ends</label>
                <input
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
            {err && <p className="text-sm text-rose-700">{err}</p>}
            {msg && <p className="text-sm text-emerald-800">{msg}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Create lecture
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">Your lectures (GPS)</h2>
            <p className="text-xs text-slate-500">Includes seed data and lectures you add</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {lectures.length === 0 ? (
              <li className="px-4 py-6 text-sm text-slate-500">No lectures yet.</li>
            ) : (
              lectures.map((l) => {
                const c = getCourseById(l.courseId);
                return (
                  <li key={l.id} className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900">{l.title}</p>
                    <p className="text-xs text-slate-500">{c?.courseCode}</p>
                    <p className="mt-1 text-xs text-slate-600">{l.locationLabel}</p>
                    <p className="text-xs tabular-nums text-slate-500">
                      {new Date(l.startsAt).toLocaleString()} — {new Date(l.endsAt).toLocaleString()}
                    </p>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
