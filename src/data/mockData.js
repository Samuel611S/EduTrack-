import studentsData from "./students.json";
import teachersData from "./teachers.json";
import coursesData from "./courses.json";
import activityLogsData from "./activityLogs.json";
import attendanceTrendData from "./attendanceTrend.json";

export const students = studentsData;
export const teachers = teachersData;
export const courses = coursesData;
export const activityLogs = activityLogsData;
export const attendanceTrend = attendanceTrendData;

export { getAllLectures, getLectureById } from "./lecturesMerged.js";

export function getTeacherById(id) {
  return teachers.find((t) => t.id === id);
}

export function getCourseById(id) {
  return courses.find((c) => c.id === id);
}

export function getStudentById(id) {
  return students.find((s) => s.id === id);
}
