import { axiosInstance } from "../../../Axios/axiosInstance";
import type { LoginResponse, RegisterFormData } from "../types";

export const register = async (
  userData: RegisterFormData
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/users/register",
    userData
  );
  return response.data;
};
