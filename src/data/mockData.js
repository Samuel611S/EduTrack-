import studentsData from "./students.json";
import teachersData from "./teachers.json";
import coursesData from "./courses.json";
import attendanceLogsData from "./attendanceLogs.json";
import activityLogsData from "./activityLogs.json";
import upcomingLecturesData from "./upcomingLectures.json";
import attendanceTrendData from "./attendanceTrend.json";

export const students = studentsData;
export const teachers = teachersData;
export const courses = coursesData;
export const attendanceLogs = attendanceLogsData;
export const activityLogs = activityLogsData;
export const upcomingLectures = upcomingLecturesData;
export const attendanceTrend = attendanceTrendData;

export function getTeacherById(id) {
  return teachers.find((t) => t.id === id);
}

export function getCourseById(id) {
  return courses.find((c) => c.id === id);
}

export function getStudentById(id) {
  return students.find((s) => s.id === id);
}
