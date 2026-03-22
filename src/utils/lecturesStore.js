const KEY = "edutrack_lectures_extra";

export function loadExtraLectures() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function appendExtraLecture(lecture) {
  const list = loadExtraLectures();
  list.push(lecture);
  localStorage.setItem(KEY, JSON.stringify(list));
}
