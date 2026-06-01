"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { posts, activePlatforms } from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { parseTimeToMinute, parseHashtags } from "./constants";

function isPlatform(v: string): v is Platform {
  return (PLATFORMS as readonly string[]).includes(v);
}

/**
 * Publish a post for the Organisation (CONTEXT.md). The Student enacts their
 * content schedule by publishing immediately, stamped with a chosen posting
 * day/time. Validates the platform is Active for this campaign.
 */
export async function publishPost(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");

  const platform = String(formData.get("platform") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const postingDay = Number(formData.get("postingDay"));
  const postingMinute = parseTimeToMinute(String(formData.get("time") ?? ""));
  const hashtags = parseHashtags(String(formData.get("hashtags") ?? ""));
  const hasImage = formData.get("hasImage") === "on";
  const hasVideo = formData.get("hasVideo") === "on";
  const callToAction = formData.get("callToAction") === "on";

  const basicsValid =
    body.length > 0 &&
    Number.isInteger(postingDay) &&
    postingDay >= 0 &&
    postingDay <= 6 &&
    postingMinute !== null;

  if (!isPlatform(platform) || !basicsValid || postingMinute === null) {
    revalidatePath(`/campaign/${campaignId}`);
    return;
  }

  // Platform must be one the Student enabled for this campaign.
  const [active] = await db
    .select()
    .from(activePlatforms)
    .where(
      and(
        eq(activePlatforms.campaignId, campaignId),
        eq(activePlatforms.platform, platform),
      ),
    )
    .limit(1);
  if (!active) {
    revalidatePath(`/campaign/${campaignId}`);
    return;
  }

  await db.insert(posts).values({
    workspaceId: workspace.id,
    campaignId,
    platform,
    authorKind: "organisation",
    body,
    hasImage,
    hasVideo,
    hashtags,
    callToAction,
    postingDay,
    postingMinute,
    isSeeded: false,
    // Stamp with the campaign clock — the simulated "now" (CONTEXT.md).
    publishedOn: new Date(campaign.clock),
  });

  revalidatePath(`/campaign/${campaignId}`);
}

export async function deletePost(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const postId = String(formData.get("postId") ?? "");
  const { workspace } = await requireStudentWorkspace();
  // Scope the delete to the Student's workspace (ownership).
  await db
    .delete(posts)
    .where(and(eq(posts.id, postId), eq(posts.workspaceId, workspace.id)));
  revalidatePath(`/campaign/${campaignId}`);
}
