import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/deleteTask";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
