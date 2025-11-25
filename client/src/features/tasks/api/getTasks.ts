import { axiosInstance } from "../../../Axios/axiosInstance";
import { ITask } from "../types";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await axiosInstance.get<{ tasks: ITask[] }>("/tasks");
  return response.data.tasks;
};
