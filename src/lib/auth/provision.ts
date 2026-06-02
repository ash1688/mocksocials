/**
 * Workspace provisioning (CONTEXT.md: Workspace; ADR-0002: one private,
 * isolated Workspace per Student). Called on login so a Student always lands in
 * their own Workspace. The seeded community is copied per Workspace so one
 * Student's interactions never leak into another's.
 */
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { organisations, workspaces, personas, posts } from "@/db/schema";
import type { Platform } from "@/lib/simulation/types";

/** Personas copied into every new Workspace as the seeded-community backdrop. */
const SEED_PERSONAS = [
  { handle: "samjones", displayName: "Sam Jones" },
  { handle: "priyapatel", displayName: "Priya Patel" },
  { handle: "leeo", displayName: "Lee O'Connor" },
  { handle: "techie_max", displayName: "Max Bright" },
  { handle: "communitykate", displayName: "Kate Fielding" },
] as const;

/**
 * Ambient persona-authored content present from the start (CONTEXT.md: Seeded
 * community), so platforms feel populated rather than empty. Copied per
 * Workspace. personaIdx indexes into SEED_PERSONAS; stamped before the scenario
 * start so it reads as pre-existing background. Not campaign-scoped, never
 * scored.
 */
const SEED_COMMUNITY: {
  platform: Platform;
  personaIdx: number;
  body: string;
  hasImage?: boolean;
}[] = [
  { platform: "mocktweet", personaIdx: 0, body: "Anyone know where to learn welding round here? Asking for me 😅" },
  { platform: "mocktweet", personaIdx: 4, body: "Our town needs more hands-on training for young people. #skills" },
  { platform: "mockbook", personaIdx: 1, body: "Proud of my daughter for starting her electrical apprenticeship this week!", hasImage: true },
  { platform: "mockbook", personaIdx: 2, body: "Great turnout at the community careers fair today." },
  { platform: "mockgram", personaIdx: 3, body: "Workshop vibes 🔧 #makersgonnamake", hasImage: true },
  { platform: "mockgram", personaIdx: 0, body: "First day in the workshop and loving it.", hasImage: true },
  { platform: "mocktube", personaIdx: 2, body: "How I got into plumbing — my story" },
];

/** Date the seeded community predates the campaign by (fixed, reproducible). */
const SEED_PUBLISHED_ON = new Date("2025-08-20T12:00:00Z");

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
    const workspaceId = workspace!.id;

    const insertedPersonas = await tx
      .insert(personas)
      .values(
        SEED_PERSONAS.map((p) => ({
          workspaceId,
          handle: p.handle,
          displayName: p.displayName,
        })),
      )
      .returning({ id: personas.id });

    // Seeded community backdrop — persona-authored, not campaign-scoped.
    await tx.insert(posts).values(
      SEED_COMMUNITY.map((s) => ({
        workspaceId,
        campaignId: null,
        platform: s.platform,
        authorKind: "persona" as const,
        personaId: insertedPersonas[s.personaIdx]!.id,
        body: s.body,
        hasImage: s.hasImage ?? false,
        isSeeded: true,
        publishedOn: SEED_PUBLISHED_ON,
      })),
    );

    return workspace!;
  });
}
