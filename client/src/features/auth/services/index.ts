import { axiosInstance } from "../../../Axios/axiosInstance";
import { LoginFormData, RegisterFormData, AuthResponse } from "../types/auth";

export const authService = {
  login: async (credentials: LoginFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  register: async (userData: RegisterFormData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      userData
    );
    return response.data;
  },
};
