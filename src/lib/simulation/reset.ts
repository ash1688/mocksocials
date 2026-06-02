import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  simulations,
  metricSnapshots,
  searchRankings,
  orgLikes,
  posts,
  comments,
} from "@/db/schema";

/**
 * Drop all of a campaign's simulation output and rewind its clock to the start.
 * Clears engagement entirely — received (persona comments) and given
 * (Organisation likes + replies) alike. Shared by the Student reset action and
 * the teacher admin reset.
 */
export async function resetCampaignSimulation(campaignId: string): Promise<void> {
  const [campaign] = await db
    .select({ startDate: campaigns.startDate })
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
    .limit(1);
  if (!campaign) return;

  await db.transaction(async (tx) => {
    const sims = await tx
      .select({ id: simulations.id })
      .from(simulations)
      .where(eq(simulations.campaignId, campaignId));
    const simIds = sims.map((s) => s.id);

    await tx.delete(metricSnapshots).where(eq(metricSnapshots.campaignId, campaignId));
    await tx.delete(searchRankings).where(eq(searchRankings.campaignId, campaignId));
    await tx.delete(orgLikes).where(eq(orgLikes.campaignId, campaignId));

    const postRows = await tx
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.campaignId, campaignId));
    const postIds = postRows.map((p) => p.id);
    if (postIds.length > 0) {
      await tx.delete(comments).where(inArray(comments.postId, postIds));
    }
    if (simIds.length > 0) {
      await tx.delete(simulations).where(inArray(simulations.id, simIds));
    }
    await tx
      .update(campaigns)
      .set({ clock: campaign.startDate })
      .where(eq(campaigns.id, campaignId));
  });
}
