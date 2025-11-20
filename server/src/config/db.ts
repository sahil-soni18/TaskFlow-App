import mongoose from "mongoose"
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(env.DATABASE_URL);
        console.log(`Database connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}