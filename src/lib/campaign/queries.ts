import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  activePlatforms,
  keywords,
  targets,
} from "@/db/schema";
import type { Platform } from "@/lib/stats";

export type Campaign = typeof campaigns.$inferSelect;

export async function listCampaigns(ownerId: number): Promise<Campaign[]> {
  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.ownerId, ownerId))
    .orderBy(desc(campaigns.isActive), desc(campaigns.createdAt));
}

export async function getCampaign(
  id: number,
  ownerId: number,
): Promise<Campaign | null> {
  const row = (
    await db
      .select()
      .from(campaigns)
      .where(and(eq(campaigns.id, id), eq(campaigns.ownerId, ownerId)))
      .limit(1)
  )[0];
  return row ?? null;
}

export async function getActiveCampaign(
  ownerId: number,
): Promise<Campaign | null> {
  const row = (
    await db
      .select()
      .from(campaigns)
      .where(and(eq(campaigns.ownerId, ownerId), eq(campaigns.isActive, true)))
      .limit(1)
  )[0];
  return row ?? null;
}

export type CampaignSetup = {
  platforms: Platform[];
  keywords: { id: number; term: string }[];
  targets: {
    id: number;
    platform: Platform | null;
    metric: string;
    targetValue: number;
  }[];
};

export async function getCampaignSetup(
  campaignId: number,
): Promise<CampaignSetup> {
  const [plats, kws, tgts] = await Promise.all([
    db
      .select({ platform: activePlatforms.platform })
      .from(activePlatforms)
      .where(eq(activePlatforms.campaignId, campaignId)),
    db
      .select({ id: keywords.id, term: keywords.term })
      .from(keywords)
      .where(eq(keywords.campaignId, campaignId))
      .orderBy(asc(keywords.id)),
    db
      .select({
        id: targets.id,
        platform: targets.platform,
        metric: targets.metric,
        targetValue: targets.targetValue,
      })
      .from(targets)
      .where(eq(targets.campaignId, campaignId))
      .orderBy(asc(targets.id)),
  ]);
  return {
    platforms: plats.map((p) => p.platform as Platform),
    keywords: kws,
    targets: tgts.map((t) => ({ ...t, platform: t.platform as Platform | null })),
  };
}
