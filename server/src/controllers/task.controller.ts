import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { createTaskSchema } from "../validations/taskValidation";
export class TaskController {
  static async createTask(
    req: Request & { user?: { userId: string } },
    res: Response
  ): Promise<void> {
    try {
      const validation = createTaskSchema.safeParse(req.body);
      if (!validation.success) {
        res
          .status(400)
          .json({ message: "Validation Error", errors: "Invalid Data" });
        return;
      }

      const task = await TaskService.createTask(
        validation.data,
        req.user!.userId
      );
      res.status(201).json({ message: "Task Created", task });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await TaskService.getTasks();
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
      }
      const task = await TaskService.getTaskById(id);
      if (!task) {
        res.status(404).json({ message: "Task Not Found" });
        return;
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
      }
      const updateData = req.body;
      const updatedTask = await TaskService.updateTask(id, updateData);
      res.json({
        success: true,
        message: "Task updated successfully",
        data: { task: updatedTask },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
      }
      await TaskService.deleteTask(id);
      res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
