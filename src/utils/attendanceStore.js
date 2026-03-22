import attendanceSeed from "../data/attendanceRecords.json";

const KEY = "edutrack_attendance_extra";
const EDITS_KEY = "edutrack_attendance_edits";

function loadExtraRecords() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadEdits() {
  try {
    const raw = localStorage.getItem(EDITS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveEdits(edits) {
  localStorage.setItem(EDITS_KEY, JSON.stringify(edits));
}

export function loadMergedAttendanceRecords() {
  const base = [...attendanceSeed, ...loadExtraRecords()];
  const edits = loadEdits();
  return base.map((r) => {
    const e = edits[r.attendance_id];
    return e ? { ...r, ...e } : r;
  });
}

export function appendAttendanceRecord(record) {
  const extra = loadExtraRecords();
  extra.push(record);
  localStorage.setItem(KEY, JSON.stringify(extra));
}

export function updateAttendanceRecord(attendanceId, patch) {
  const edits = loadEdits();
  edits[attendanceId] = { ...edits[attendanceId], ...patch };
  saveEdits(edits);
}

function newAttendanceId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `att-${crypto.randomUUID()}`;
  }
  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * One record per student per lecture; teacher marks update or create.
 */
export function upsertTeacherAttendance({
  student_id,
  course_id,
  lecture_id,
  teacher_id,
  status,
}) {
  const merged = loadMergedAttendanceRecords();
  const existing = merged.find(
    (r) => r.student_id === student_id && r.lecture_id === lecture_id
  );
  const patch = {
    status,
    recorded_by: "teacher",
    teacher_id,
    timestamp: new Date().toISOString(),
    student_latitude: null,
    student_longitude: null,
  };
  if (existing) {
    updateAttendanceRecord(existing.attendance_id, patch);
  } else {
    appendAttendanceRecord({
      attendance_id: newAttendanceId(),
      student_id,
      course_id,
      lecture_id,
      ...patch,
    });
  }
}

export function hasAttendanceForLecture(records, studentId, lectureId) {
  return records.some(
    (r) => r.student_id === studentId && r.lecture_id === lectureId
  );
}

export function formatGpsCell(record) {
  const lat = record.student_latitude;
  const lon = record.student_longitude;
  if (lat == null || lon == null) return "—";
  return `${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}`;
}
