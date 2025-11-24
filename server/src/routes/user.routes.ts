import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

export default router;
