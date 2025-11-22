import { IUser } from "@/types/user";
import { User } from "@/models/user.model";
import { generateToken } from "@/utils/jwtService";

export class UserService {
  static async Register(userData: {
    email: string;
    password: string;
    role: "admin" | "user";
    name: string;
  }): Promise<{ user: IUser; token: string }> {
    const existingUser = await User.fineOne({ email: userData.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = new User(userData);
    await user.save();

    const token = await generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return { user, token };
  }

  static async Login(userCreds: {
    email: string,
    password: string,
  }): Promise<{ user: IUser; token: string }> {

    const user = await User.fineOne({ email: userCreds.email });

    if (!user ) {
        throw new Error('User Not Found...');
    }

    const isPasswordCorrect = await user.comparePassword(userCreds.password);

    if ( !isPasswordCorrect ) {
        throw new Error("Invalid Credentails...");
    }

    const token = await generateToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role
    });

    return { user, token };
  }
}
