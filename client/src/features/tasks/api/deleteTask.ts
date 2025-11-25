import { axiosInstance } from "../../../Axios/axiosInstance";

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};
