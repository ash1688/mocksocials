"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { runSimulation } from "./run";
import { resetCampaignSimulation } from "./reset";

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

  await resetCampaignSimulation(campaignId);
  revalidatePath(`/campaign/${campaignId}`);
}
