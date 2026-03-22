import lecturesSeed from "./lectures.json";
import { loadExtraLectures } from "../utils/lecturesStore.js";

/**
 * Merged schedule: live demo window (recomputed each call), seed JSON, teacher-created lectures.
 */
export function getAllLectures() {
  const now = Date.now();
  const demoLive = {
    id: "lec-demo-live",
    courseId: "c1",
    title: "Live lecture window (GPS demo)",
    locationLabel: "Main Campus — Hall A-12 (demo coordinates: NYC)",
    latitude: 40.712776,
    longitude: -74.005974,
    allowedRadiusMeters: null,
    startsAt: new Date(now - 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 60 * 60 * 1000).toISOString(),
    isDemoAnchor: true,
  };
  return [demoLive, ...lecturesSeed, ...loadExtraLectures()];
}

export function getLectureById(id) {
  return getAllLectures().find((l) => l.id === id) ?? null;
}
