import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  activePlatforms,
  keywords,
  targets,
} from "@/db/schema";

export type Campaign = typeof campaigns.$inferSelect;

/** All campaigns in a workspace, newest first. */
export function listCampaigns(workspaceId: string) {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.workspaceId, workspaceId))
    .orderBy(desc(campaigns.createdAt));
}

/** The single Active campaign in a workspace, or null (CONTEXT.md). */
export async function getActiveCampaign(
  workspaceId: string,
): Promise<Campaign | null> {
  const [row] = await db
    .select()
    .from(campaigns)
    .where(
      and(
        eq(campaigns.workspaceId, workspaceId),
        eq(campaigns.isActive, true),
      ),
    )
    .limit(1);
  return row ?? null;
}

/** Load a campaign by id, scoped to its workspace (ownership check). */
export async function getCampaign(
  campaignId: string,
  workspaceId: string,
): Promise<Campaign | null> {
  const [row] = await db
    .select()
    .from(campaigns)
    .where(
      and(
        eq(campaigns.id, campaignId),
        eq(campaigns.workspaceId, workspaceId),
      ),
    )
    .limit(1);
  return row ?? null;
}

/** Whether a platform is enabled (Active platform) for a campaign. */
export async function isPlatformActive(
  campaignId: string,
  platform: (typeof activePlatforms.$inferSelect)["platform"],
): Promise<boolean> {
  const [row] = await db
    .select({ platform: activePlatforms.platform })
    .from(activePlatforms)
    .where(
      and(
        eq(activePlatforms.campaignId, campaignId),
        eq(activePlatforms.platform, platform),
      ),
    )
    .limit(1);
  return !!row;
}

/** A campaign plus its setup: active platforms, keywords, targets. */
export async function getCampaignSetup(
  campaignId: string,
  workspaceId: string,
) {
  const campaign = await getCampaign(campaignId, workspaceId);
  if (!campaign) return null;

  const [plats, kws, tgts] = await Promise.all([
    db
      .select()
      .from(activePlatforms)
      .where(eq(activePlatforms.campaignId, campaignId)),
    db.select().from(keywords).where(eq(keywords.campaignId, campaignId)),
    db.select().from(targets).where(eq(targets.campaignId, campaignId)),
  ]);

  return {
    campaign,
    platforms: plats.map((p) => p.platform),
    keywords: kws,
    targets: tgts,
  };
}
