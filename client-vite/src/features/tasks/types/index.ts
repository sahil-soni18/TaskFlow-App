export type ITaskStatus = "pending" | "in-progress" | "completed";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: ITaskStatus;
  tags: string[];
  priority: number;
  isArchived: boolean;
  createdAt: Date | string;
  metadata: {
    createdBy: string;
    assignedTo: string;
  };
  dueDate?: Date | string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority?: number;
  tags?: string | string[];
  assignedTo?: string;
  dueDate?: Date | string;
}

export interface ITaskResponse {
  success?: boolean;
  task: ITask;
  message: string;
}
