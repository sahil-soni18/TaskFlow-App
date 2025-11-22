import { IUser } from "@/types/user";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolena> {
  return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
