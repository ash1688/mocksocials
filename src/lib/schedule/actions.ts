"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { scheduleEntries } from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { parseTimeToMinute } from "@/lib/posts/constants";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";

function isPlatform(v: string): v is Platform {
  return (PLATFORMS as readonly string[]).includes(v);
}

export async function addScheduleEntry(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");

  const platform = String(formData.get("platform") ?? "");
  const frequency = String(formData.get("frequency") ?? "").trim();
  const theme = String(formData.get("theme") ?? "").trim();
  const dayRaw = String(formData.get("postingDay") ?? "");
  const postingDay = dayRaw === "" ? null : Number(dayRaw);
  const postingMinute = parseTimeToMinute(String(formData.get("time") ?? ""));

  if (isPlatform(platform) && frequency && theme) {
    await db.insert(scheduleEntries).values({
      campaignId,
      platform,
      frequency,
      theme,
      postingDay:
        postingDay !== null && postingDay >= 0 && postingDay <= 6
          ? postingDay
          : null,
      postingMinute,
    });
  }
  revalidatePath(`/campaign/${campaignId}/schedule`);
}

export async function removeScheduleEntry(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const entryId = String(formData.get("entryId") ?? "");
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");

  await db
    .delete(scheduleEntries)
    .where(
      and(
        eq(scheduleEntries.id, entryId),
        eq(scheduleEntries.campaignId, campaignId),
      ),
    );
  revalidatePath(`/campaign/${campaignId}/schedule`);
}
