import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

// Unit tests for pure logic (the simulation engine especially). DB-backed
// integration tests run separately once a test database is wired.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
