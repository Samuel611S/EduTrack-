import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "edutrack_role";

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => sessionStorage.getItem(STORAGE_KEY) || null);

  useEffect(() => {
    if (role) sessionStorage.setItem(STORAGE_KEY, role);
    else sessionStorage.removeItem(STORAGE_KEY);
  }, [role]);

  const value = useMemo(
    () => ({
      role,
      isAuthenticated: Boolean(role),
      loginAs: (nextRole) => setRole(nextRole),
      logout: () => setRole(null),
    }),
    [role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
