import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  appendAttendanceRecord,
  loadMergedAttendanceRecords,
  updateAttendanceRecord,
  upsertTeacherAttendance,
} from "../utils/attendanceStore.js";
import { getSettings, saveSettings } from "../utils/settingsStore.js";
import { appendExtraLecture } from "../utils/lecturesStore.js";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [version, setVersion] = useState(0);
  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const records = useMemo(() => loadMergedAttendanceRecords(), [version]);
  const settings = useMemo(() => getSettings(), [version]);

  const appendRecord = useCallback(
    (r) => {
      appendAttendanceRecord(r);
      refresh();
    },
    [refresh]
  );

  const updateSettings = useCallback(
    (partial) => {
      saveSettings(partial);
      refresh();
    },
    [refresh]
  );

  const addTeacherLecture = useCallback(
    (lecture) => {
      appendExtraLecture(lecture);
      refresh();
    },
    [refresh]
  );

  const updateRecord = useCallback(
    (attendanceId, patch) => {
      updateAttendanceRecord(attendanceId, patch);
      refresh();
    },
    [refresh]
  );

  const upsertTeacherRecord = useCallback(
    (payload) => {
      upsertTeacherAttendance(payload);
      refresh();
    },
    [refresh]
  );

  const value = useMemo(
    () => ({
      records,
      settings,
      appendRecord,
      updateRecord,
      upsertTeacherRecord,
      updateSettings,
      addTeacherLecture,
      refresh,
    }),
    [
      records,
      settings,
      appendRecord,
      updateRecord,
      upsertTeacherRecord,
      updateSettings,
      addTeacherLecture,
      refresh,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
