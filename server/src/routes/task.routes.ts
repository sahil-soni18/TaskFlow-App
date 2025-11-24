import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authenticate, requireRole } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post("/create", TaskController.createTask);
router.get("/", TaskController.getTasks);
router.get("/:id", TaskController.getTaskById);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", requireRole(["admin"]), TaskController.deleteTask);

export default router;
