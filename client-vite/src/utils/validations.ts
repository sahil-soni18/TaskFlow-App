import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address..."),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["admin", "user"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(1, "Description is required"),
  priority: z.number().min(1).max(5).optional().default(3),
  status: z
    .enum(["pending", "in-progress", "completed", "cancelled"])
    .optional(),
  assignedTo: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  isArchived: z.boolean().optional().default(false),
  dueDate: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
