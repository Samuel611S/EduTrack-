import { useState } from "react";
import { useAppData } from "../context/AppDataContext.jsx";
import { haversineMeters } from "../utils/haversine.js";
import { getCurrentPosition } from "../utils/geolocation.js";
import {
  getEffectiveRadiusMeters,
  isLectureActive,
  isStudentEnrolledInCourse,
} from "../utils/attendanceRules.js";
import { hasAttendanceForLecture } from "../utils/attendanceStore.js";

function newAttendanceId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `att-${crypto.randomUUID()}`;
  }
  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function LectureMarkAttendanceCard({ lecture, course, studentId }) {
  const { records, settings, appendRecord } = useAppData();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const enrolled = isStudentEnrolledInCourse(course, studentId);
  const active = isLectureActive(lecture);
  const already = hasAttendanceForLecture(records, studentId, lecture.id);

  const canAttempt = enrolled && active && !already && !success;

  const timeRange = `${new Date(lecture.startsAt).toLocaleString()} – ${new Date(
    lecture.endsAt
  ).toLocaleString()}`;

  async function handleMark() {
    setError(null);
    setSuccess(false);

    if (!enrolled) {
      setError("You are not enrolled in this course.");
      return;
    }
    if (!active) {
      setError("This lecture is not active. You can only mark attendance during the scheduled time.");
      return;
    }
    if (already || hasAttendanceForLecture(records, studentId, lecture.id)) {
      setError("You have already marked attendance for this lecture.");
      return;
    }

    setLoading(true);
    try {
      const position = await getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const radius = getEffectiveRadiusMeters(lecture, settings);
      const distance = haversineMeters(lat, lon, lecture.latitude, lecture.longitude);

      if (distance > radius) {
        setError("You must be inside the lecture location to mark attendance.");
        return;
      }

      appendRecord({
        attendance_id: newAttendanceId(),
        student_id: studentId,
        course_id: course.id,
        lecture_id: lecture.id,
        timestamp: new Date().toISOString(),
        student_latitude: lat,
        student_longitude: lon,
        status: "Present",
        recorded_by: "student",
      });
      setSuccess(true);
    } catch (e) {
      if (e?.code === 1) {
        setError("Location access is required to mark attendance.");
      } else {
        setError(e?.message || "Could not read your location.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{lecture.title}</h3>
          <p className="text-xs text-slate-500">{course.courseCode} · {course.name}</p>
        </div>
        {lecture.isDemoAnchor && (
          <span className="mt-1 text-[10px] font-medium uppercase text-sky-700 sm:mt-0">
            Demo window
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-600">
        <span className="font-medium text-slate-700">Time:</span> {timeRange}
      </p>
      <p className="mt-1 text-xs text-slate-600">
        <span className="font-medium text-slate-700">Location:</span> {lecture.locationLabel}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        GPS check: within {getEffectiveRadiusMeters(lecture, settings)} m of lecture coordinates
      </p>

      {!enrolled && (
        <p className="mt-3 text-xs text-amber-800">You are not enrolled in this course.</p>
      )}
      {!active && enrolled && (
        <p className="mt-3 text-xs text-slate-600">
          This lecture is not in the active time window.
        </p>
      )}
      {already && !success && (
        <p className="mt-3 text-xs text-emerald-800">Attendance already recorded for this lecture.</p>
      )}

      {success && (
        <p className="mt-3 text-sm font-medium text-emerald-800">
          Attendance recorded successfully.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}

      <button
        type="button"
        disabled={!canAttempt || loading}
        onClick={handleMark}
        className="mt-4 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Getting location…" : "Mark Attendance"}
      </button>
    </div>
  );
}
