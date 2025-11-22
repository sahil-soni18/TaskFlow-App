import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(100, "Title too long"),
    description: z.string().min(1, "Description is required"),
    priority: z.number().min(1).max(5).optional().default(3),
    status: z
      .enum(["pending", "in-progress", "completed", "cancelled"])
      .optional(),
    metadata: z.object({
      createdBy: z.string().min(1, "Created by is required"),
      assignedTo: z.string().min(1, "Assigned to is required"),
    }),
    isArchived: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const updateTaskSchema = createTaskSchema.partial();
