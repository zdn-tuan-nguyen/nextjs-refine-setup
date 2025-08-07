import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  API_BASE_URL: z.url().default("http://localhost:8080"),
  NEXTAUTH_SECRET: z.string().default("blackmagic"),
  NEXTAUTH_URL: z.url().optional(),
});

const _env = {
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.API_BASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const env = serverEnvSchema.parse(_env);
