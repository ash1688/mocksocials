"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  simulations,
  metricSnapshots,
  searchRankings,
  posts,
  comments,
} from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { runSimulation } from "./run";

/** Advance the Active campaign's clock by a step (CONTEXT.md: Simulation).
 *  Only the Active campaign accrues simulations. */
export async function simulateStep(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const step = String(formData.get("step") ?? "day") === "week" ? "week" : "day";
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");
  if (!campaign.isActive) {
    // Activate-then-simulate is a deliberate choice; ignore otherwise.
    revalidatePath(`/campaign/${campaignId}`);
    return;
  }

  await runSimulation(campaignId, step);
  revalidatePath(`/campaign/${campaignId}`);
}

/** Reset a campaign to its baseline: drop all simulation output and rewind the
 *  clock to the start. Lets a Student re-run cleanly for screenshots. */
export async function resetSimulation(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");

  await db.transaction(async (tx) => {
    const sims = await tx
      .select({ id: simulations.id })
      .from(simulations)
      .where(eq(simulations.campaignId, campaignId));
    const simIds = sims.map((s) => s.id);
    // post_metrics cascade-delete via simulations; snapshots/rankings are
    // scoped by campaign, remove explicitly.
    await tx.delete(metricSnapshots).where(eq(metricSnapshots.campaignId, campaignId));
    await tx.delete(searchRankings).where(eq(searchRankings.campaignId, campaignId));
    // Clear simulation-generated persona comments on this campaign's posts.
    const postRows = await tx
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.campaignId, campaignId));
    const postIds = postRows.map((p) => p.id);
    if (postIds.length > 0) {
      await tx
        .delete(comments)
        .where(
          and(
            inArray(comments.postId, postIds),
            eq(comments.authorKind, "persona"),
          ),
        );
    }
    if (simIds.length > 0) {
      await tx.delete(simulations).where(inArray(simulations.id, simIds));
    }
    await tx
      .update(campaigns)
      .set({ clock: campaign.startDate })
      .where(eq(campaigns.id, campaignId));
  });

  revalidatePath(`/campaign/${campaignId}`);
}
