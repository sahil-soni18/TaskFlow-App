import { axiosInstance } from "../../../Axios/axiosInstance";
import { ITaskResponse, TaskFormData } from "../types";

export const updateTask = async (
  taskId: string,
  updatedData: Partial<TaskFormData>
): Promise<ITaskResponse> => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
  return response.data;
};
