import { useMutation } from "@tanstack/react-query";
import { Login } from "../api/login";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onSuccess: (data) => {
      console.log("Login successful:", JSON.stringify(data));
      console.log("User:", data.user);
      console.log("Token:", data.token);
      authLogin(data.user, data.token);
      navigate("/tasks", { replace: true });
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw new Error("Login failed");
    },
  });
  return mutation;
};
