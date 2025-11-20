import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default(3000),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(5),
})

export const env = envSchema.parse(process.env);