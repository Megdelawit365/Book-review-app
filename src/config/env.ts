import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
    DATABASE_URL: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(32),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(5000),
    FRONTEND_ORIGIN: z.url()
})

export const env = envSchema.parse(process.env)