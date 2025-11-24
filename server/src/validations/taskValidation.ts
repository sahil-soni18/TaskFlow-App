import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(1, "Description is required"),
  priority: z.number().min(1).max(5).optional().default(3),
  status: z
    .enum(["pending", "in-progress", "completed", "cancelled"])
    .optional(),
  assignedTo: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isArchived: z.boolean().optional().default(false),
});

export const updateTaskSchema = createTaskSchema.partial();
