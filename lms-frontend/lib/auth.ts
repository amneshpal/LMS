import { User } from "@/services/auth.service";

export const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("accessToken");
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const isLoggedIn = () => {
  return Boolean(getToken());
};

export const logout = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  window.location.href = "/login";
};