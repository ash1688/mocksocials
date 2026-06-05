import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  simulations,
  metricSnapshots,
  searchRankings,
} from "@/db/schema";

/**
 * Drop all of a campaign's simulation output and rewind its clock to the start,
 * so a student can re-run cleanly for screenshots. Deleting the simulations
 * cascades post_metrics. The campaign's posts themselves are untouched.
 */
export async function resetCampaignSimulation(campaignId: number): Promise<void> {
  const campaign = (
    await db
      .select({ startDate: campaigns.startDate })
      .from(campaigns)
      .where(eq(campaigns.id, campaignId))
      .limit(1)
  )[0];
  if (!campaign) return;

  await db.transaction(async (tx) => {
    await tx.delete(metricSnapshots).where(eq(metricSnapshots.campaignId, campaignId));
    await tx.delete(searchRankings).where(eq(searchRankings.campaignId, campaignId));
    await tx.delete(simulations).where(eq(simulations.campaignId, campaignId)); // cascades post_metrics
    await tx
      .update(campaigns)
      .set({ clock: campaign.startDate })
      .where(eq(campaigns.id, campaignId));
  });
}
