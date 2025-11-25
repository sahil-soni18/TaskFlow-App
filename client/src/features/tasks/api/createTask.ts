import { axiosInstance } from "../../../Axios/axiosInstance";
import { ITaskResponse, TaskFormData } from "../types";

export const createTask = async (
  taskData: TaskFormData
): Promise<ITaskResponse> => {
  const response = await axiosInstance.post<ITaskResponse>(
    "/tasks/create",
    taskData
  );
  return response.data;
};
