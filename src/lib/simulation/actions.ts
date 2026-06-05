"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { runSimulation } from "./run";
import { resetCampaignSimulation } from "./reset";

/** Advance the campaign clock by a step. Only the Active campaign simulates. */
export async function simulateStep(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const step = String(formData.get("step") ?? "day") === "week" ? "week" : "day";
  const me = await requireUser();
  const campaign = await getCampaign(campaignId, me.id);
  if (!campaign) redirect("/campaigns");
  if (!campaign.isActive) {
    revalidatePath(`/campaign/${campaignId}`);
    return;
  }
  await runSimulation(campaignId, step);
  revalidatePath(`/campaign/${campaignId}`);
  revalidatePath(`/campaign/${campaignId}/analytics`);
}

/** Reset a campaign to baseline: drop simulation output, rewind the clock. */
export async function resetSimulation(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const me = await requireUser();
  const campaign = await getCampaign(campaignId, me.id);
  if (!campaign) redirect("/campaigns");
  await resetCampaignSimulation(campaignId);
  revalidatePath(`/campaign/${campaignId}`);
  revalidatePath(`/campaign/${campaignId}/analytics`);
}
