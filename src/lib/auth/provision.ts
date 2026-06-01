/**
 * Workspace provisioning (CONTEXT.md: Workspace; ADR-0002: one private,
 * isolated Workspace per Student). Called on login so a Student always lands in
 * their own Workspace. The seeded community is copied per Workspace so one
 * Student's interactions never leak into another's.
 */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { organisations, workspaces, personas } from "@/db/schema";

/** Personas copied into every new Workspace as the seeded-community backdrop. */
const SEED_PERSONAS = [
  { handle: "samjones", displayName: "Sam Jones" },
  { handle: "priyapatel", displayName: "Priya Patel" },
  { handle: "leeo", displayName: "Lee O'Connor" },
  { handle: "techie_max", displayName: "Max Bright" },
  { handle: "communitykate", displayName: "Kate Fielding" },
] as const;

/** The fixed scenario Organisation (CONTEXT.md). Seeded once; looked up here. */
async function getScenarioOrganisation() {
  const [org] = await db.select().from(organisations).limit(1);
  if (!org) {
    throw new Error(
      "No Organisation seeded — run `npm run db:seed` to provision the scenario.",
    );
  }
  return org;
}

/** Return the Student's Workspace, creating it (and its seeded community) the
 *  first time. Idempotent. */
export async function getOrCreateWorkspace(accountId: string) {
  const existing = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.accountId, accountId))
    .limit(1);
  if (existing[0]) return existing[0];

  const org = await getScenarioOrganisation();

  return db.transaction(async (tx) => {
    const [workspace] = await tx
      .insert(workspaces)
      .values({ accountId, organisationId: org.id })
      .returning();

    await tx.insert(personas).values(
      SEED_PERSONAS.map((p) => ({
        workspaceId: workspace!.id,
        handle: p.handle,
        displayName: p.displayName,
      })),
    );

    return workspace!;
  });
}
