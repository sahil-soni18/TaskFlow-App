import type { IUser } from "../../../types";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "user";
}

export interface LoginResponse {
  user: IUser;
  token: string;
}
