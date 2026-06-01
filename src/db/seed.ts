/**
 * Seed script (`npm run db:seed`). Provisions the fixed scenario Organisation
 * (the charity "Technicians Initiative") and a demo Student workspace with its
 * seeded community — copied per Workspace so it never leaks (ADR-0002).
 *
 * Scaffold: wire the inserts once auth/provisioning is built. Kept runnable so
 * the npm script and tsx toolchain are exercised early.
 */
import { db } from "./index";

async function main() {
  console.log("Seeding MockSocial…");
  // TODO: insert organisations, a demo account + workspace, personas, and the
  // seeded community posts. Idempotent (upsert on natural keys).
  void db;
  console.log("Seed complete (scaffold no-op).");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
