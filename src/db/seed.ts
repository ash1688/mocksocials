/**
 * Seed script (`npm run db:seed`). Provisions the fixed scenario Organisation
 * (the charity "Technicians Initiative") and demo accounts. Idempotent — safe
 * to re-run. Student Workspaces (and their seeded community) are provisioned
 * lazily on first login (see src/lib/auth/provision.ts), not here.
 */
import "dotenv/config";
import { eq } from "drizzle-orm";

import { db } from "./index";
import { organisations, accounts } from "./schema";
import { hashPassword } from "../lib/auth/password";

const ORG = {
  name: "Technicians Initiative",
  handle: "technicians-initiative",
  tagline: "Hands-on skills for the next generation.",
  mission:
    "A charity getting young people into skilled technical trades through workshops, mentoring and equipment grants.",
  accentColor: "#2563eb",
};

// Fixed-password internal accounts (ADR-0004). Change for real deployments.
const DEMO_ACCOUNTS = [
  { username: "teacher", password: "teacher", role: "teacher" as const, displayName: "Demo Teacher" },
  { username: "student", password: "student", role: "student" as const, displayName: "Demo Student" },
  { username: "student2", password: "student2", role: "student" as const, displayName: "Demo Student Two" },
];

async function upsertOrganisation() {
  const [existing] = await db
    .select()
    .from(organisations)
    .where(eq(organisations.handle, ORG.handle))
    .limit(1);
  if (existing) {
    console.log(`  org "${ORG.name}" already present`);
    return;
  }
  await db.insert(organisations).values(ORG);
  console.log(`  + organisation "${ORG.name}"`);
}

async function upsertAccount(a: (typeof DEMO_ACCOUNTS)[number]) {
  const [existing] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.username, a.username))
    .limit(1);
  if (existing) {
    console.log(`  account "${a.username}" already present`);
    return;
  }
  await db.insert(accounts).values({
    username: a.username,
    passwordHash: await hashPassword(a.password),
    role: a.role,
    displayName: a.displayName,
  });
  console.log(`  + ${a.role} "${a.username}" (password: ${a.password})`);
}

async function main() {
  console.log("Seeding MockSocial…");
  await upsertOrganisation();
  for (const a of DEMO_ACCOUNTS) await upsertAccount(a);
  console.log("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
