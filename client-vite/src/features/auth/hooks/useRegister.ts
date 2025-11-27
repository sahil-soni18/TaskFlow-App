import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      authLogin(data.user, data.token);
      navigate("/tasks", { replace: true });
    },
    onError: (error) => {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    },
  });
  return mutation;
};
