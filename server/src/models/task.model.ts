import { model, Schema } from "mongoose";
import { ITask, TaskStatus } from "../types/task";

const taskScheme = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 3,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    metadata: {
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

taskScheme.index({ title: 1 });

const Task = model("Task", taskScheme);
export default Task;
