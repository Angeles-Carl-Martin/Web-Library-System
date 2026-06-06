import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("library_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("library_token", data.token);
    localStorage.setItem("library_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("library_token");
    localStorage.removeItem("library_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
