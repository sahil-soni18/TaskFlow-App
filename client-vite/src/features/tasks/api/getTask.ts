import { axiosInstance } from "../../../Axios/axiosInstance";
import type { ITask } from "../types";

export const getTask = async (taskId: string): Promise<ITask> => {
  const response = await axiosInstance.get<ITask>(`/tasks/${taskId}`);
  return response.data;
};
