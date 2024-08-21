import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.VITE_DRIZZLE_DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
