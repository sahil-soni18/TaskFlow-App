import type { IUser } from "../types";

export const getStoredUser = (): IUser | null => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
