import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/deleteTask";
import { toast } from "react-hot-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: any) => {
      console.error("Delete task error:", JSON.stringify(error));
      console.log("Error Status:", error.status);
      if (error.status == 403) {
        console.log("Forbidden: You are not allowed to delete this task");
        toast.error("You are not allowed to delete this task");
      } else {
        toast.error("Failed to delete task");
      }
    },
  });
};
