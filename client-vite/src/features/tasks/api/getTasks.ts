import { axiosInstance } from "../../../Axios/axiosInstance";
import type { ITask } from "../types";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await axiosInstance.get<{ tasks: ITask[] }>("/tasks");
  return response.data.tasks;
};
