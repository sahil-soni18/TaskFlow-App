import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(5),
});

console.log("Validating environment variables...");
console.log(process.env.DATABASE_URL);
console.log(process.env.JWT_SECRET);

export const env = envSchema.parse(process.env);
