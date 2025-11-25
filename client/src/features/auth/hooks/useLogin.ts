import { useMutation } from "@tanstack/react-query";
import { Login } from "../api/login";

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw new Error("Login failed");
    },
  });
  return mutation;
};
