import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";

export const useRegister = () => {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    },
  });
  return mutation;
};
