import { axiosInstance } from "../../../Axios/axiosInstance";
import { LoginFormData } from "../../../utils/validations";
import { LoginResponse } from "../types";

export const Login = async (
  userData: LoginFormData
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/users/login",
    userData
  );
  return response.data;
};
