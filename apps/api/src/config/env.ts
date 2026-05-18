import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../.env" });
config({ path: "../../.env.example" });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  WEB_URL: z.string().url().default("http://localhost:3000"),
  API_URL: z.string().url().default("http://localhost:4000"),
  DATABASE_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  COOKIE_SECRET: z.string().min(16),
  MEILISEARCH_HOST: z.string().url().default("http://localhost:7700"),
  MEILISEARCH_API_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional()
});

export const env = envSchema.parse(process.env);
