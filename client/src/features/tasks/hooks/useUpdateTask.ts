import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskFormData } from "../types";
import { updateTask } from "../api/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

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
    },
  });
};
