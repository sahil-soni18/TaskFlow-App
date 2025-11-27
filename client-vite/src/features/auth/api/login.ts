import { axiosInstance } from "../../../Axios/axiosInstance";
import type { LoginFormData, LoginResponse } from "../types";

export const Login = async (
  userData: LoginFormData
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/users/login",
    userData
  );
  return response.data;
};
