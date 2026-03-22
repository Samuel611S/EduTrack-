export function isStudentEnrolledInCourse(course, studentId) {
  return Boolean(course?.enrolledStudentIds?.includes(studentId));
}

export function isLectureActive(lecture, now = new Date()) {
  const start = new Date(lecture.startsAt);
  const end = new Date(lecture.endsAt);
  return now >= start && now <= end;
}

export function getEffectiveRadiusMeters(lecture, settings) {
  if (typeof lecture.allowedRadiusMeters === "number") return lecture.allowedRadiusMeters;
  return settings.defaultAttendanceRadiusMeters;
}
