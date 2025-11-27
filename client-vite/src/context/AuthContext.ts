import { createContext } from "react";
import type { IUser } from "../types";

export interface AuthContextType {
  user: IUser | null;
  login: (user: IUser, token?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
