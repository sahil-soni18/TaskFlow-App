import React, { useEffect, useState } from "react";
import { getStoredUser } from "../utils/getCurrentUser";
import { AuthContext, type AuthContextType } from "./AuthContext";
import type { IUser } from "../types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: IUser, token?: string) => {
    localStorage.setItem("user", JSON.stringify(userData));

    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
