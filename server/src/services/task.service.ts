import Task from "@/models/task.model";
import { ITask, ITaskDto } from "@/types/task";

export class TaskService {
  static async createTask(taskData: ITaskDto, userId: string): Promise<ITask> {
    const task = new Task({
      ...taskData,
      metadata: {
        createdBy: userId,
        assignedTo: taskData.assignedTo,
      },
    });
    await task.save();
    return task;
  }

  static async getTasks(): Promise<ITask[]> {
    return Task.find({ isArchived: false });
  }

  static async getTaskById(taskId: string): Promise<ITask | null> {
    return Task.findById(taskId);
  }

  static async updateTask(
    taskId: string,
    updateData: Partial<ITaskDto>
  ): Promise<ITask | null> {
    return Task.findByIdAndUpdate(taskId, updateData, { new: true });
  }

  static async deleteTask(taskId: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(taskId);
  }
}
