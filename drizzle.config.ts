import { defineConfig } from "drizzle-kit";

// Migrations are SQL-first and live under ./drizzle (ADR-0004: Drizzle stays
// close to hand-written SQL). Generate with `npm run db:generate`.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});
