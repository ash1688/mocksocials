"use server";

import { revalidatePath } from "next/cache";

import { requireTeacher } from "@/lib/auth/guards";
import { resetCampaignSimulation } from "@/lib/simulation/reset";

/** Teacher reset of any campaign (e.g. to re-run a demonstration). */
export async function adminResetCampaign(formData: FormData): Promise<void> {
  await requireTeacher();
  const campaignId = String(formData.get("campaignId") ?? "");
  if (!campaignId) return;
  await resetCampaignSimulation(campaignId);
  revalidatePath(`/admin/campaign/${campaignId}`);
}
