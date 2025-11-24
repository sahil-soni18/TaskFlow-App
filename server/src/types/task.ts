import { Types } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tags: string[];
  priority: number;
  isArchived: boolean;
  createdAt: Date;
  metadata: {
    createdBy: Types.ObjectId;
    assignedTo: Types.ObjectId;
  };
}

export interface ITaskDto {
  title: string;
  description: string;
  priority?: number;
  assignedTo?: string;
  tags?: string[];
}
