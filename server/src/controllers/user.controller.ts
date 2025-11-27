import { UserService } from "../services/user.service";
import { loginSchema, registerSchema } from "../validations/userValidation";
import { Request, Response } from "express";

export class UserController {
  static async Register(req: Request, res: Response): Promise<void> {
    try {
      const validatiion = registerSchema.safeParse(req.body);
      if (!validatiion.success) {
        res
          .status(400)
          .json({ message: "Validation Error", errors: "Invalid Data" });
        return;
      }
      const { user, token } = await UserService.Register(validatiion.data);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async Login(req: Request, res: Response): Promise<void> {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        res
          .status(400)
          .json({ message: "Validation Error", errors: "Invalid Data" });
        return;
      }
      const { user, token } = await UserService.Login(validation.data);
      res.status(200).json({
        success: true,
        message: "Login Successful",
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
