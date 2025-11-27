import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/createTask";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
