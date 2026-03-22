import adminDefaults from "../data/adminSettings.json";

const KEY = "edutrack_admin_settings_override";

export function getSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      defaultAttendanceRadiusMeters:
        typeof parsed.defaultAttendanceRadiusMeters === "number"
          ? parsed.defaultAttendanceRadiusMeters
          : adminDefaults.defaultAttendanceRadiusMeters,
    };
  } catch {
    return { ...adminDefaults };
  }
}

export function saveSettings(partial) {
  const next = { ...getSettings(), ...partial };
  localStorage.setItem(
    KEY,
    JSON.stringify({
      defaultAttendanceRadiusMeters: next.defaultAttendanceRadiusMeters,
    })
  );
}
