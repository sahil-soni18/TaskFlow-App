import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/updateTask";
import type { TaskFormData } from "../types";
import { useNavigate } from "react-router-dom";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: ({
      taskId,
      updatedData,
    }: {
      taskId: string;
      updatedData: Partial<TaskFormData>;
    }) => updateTask(taskId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks");
    },
  });
};
