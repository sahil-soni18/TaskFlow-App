import { useQuery } from "@tanstack/react-query";
import { getTask } from "../api/getTask";

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId),
  });
};
