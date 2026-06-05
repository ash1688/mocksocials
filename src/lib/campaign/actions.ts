"use server";

import { and, eq, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import {
  campaigns,
  activePlatforms,
  campaignBaselines,
  keywords,
  targets,
  posts,
  youtubeMeta,
} from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";
import { youtubeSeed, type YtProfile } from "@/lib/stats";
import { getCampaign } from "./queries";
import { SCENARIO_START_DATE, METRICS, isPlatform, isMetric } from "./constants";

/** Resolve the current user and assert they own the campaign. */
async function ownedCampaign(campaignId: number) {
  const me = await requireUser();
  const campaign = await getCampaign(campaignId, me.id);
  if (!campaign) redirect("/campaigns");
  return { ownerId: me.id, campaign };
}

export async function createCampaign(formData: FormData): Promise<void> {
  const me = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const goal = String(formData.get("goal") ?? "").trim() || null;
  if (!name) redirect("/campaigns");

  const created = (
    await db
      .insert(campaigns)
      .values({
        ownerId: me.id,
        name,
        goal,
        clock: SCENARIO_START_DATE,
        startDate: SCENARIO_START_DATE,
        isActive: false,
      })
      .returning({ id: campaigns.id })
  )[0]!;
  redirect(`/campaign/${created.id}`);
}

/** Make a campaign the single Active one for this student. */
export async function activateCampaign(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const { ownerId } = await ownedCampaign(campaignId);
  await db.transaction(async (tx) => {
    await tx
      .update(campaigns)
      .set({ isActive: false })
      .where(and(eq(campaigns.ownerId, ownerId), ne(campaigns.id, campaignId)));
    await tx
      .update(campaigns)
      .set({ isActive: true })
      .where(eq(campaigns.id, campaignId));
  });
  revalidatePath("/campaigns");
  revalidatePath(`/campaign/${campaignId}`);
}

/** Enable/disable a platform; enabling seeds zero baselines per metric. */
export async function toggleActivePlatform(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const platform = String(formData.get("platform") ?? "");
  if (!isPlatform(platform)) redirect("/campaigns");
  await ownedCampaign(campaignId);

  const existing = (
    await db
      .select()
      .from(activePlatforms)
      .where(
        and(
          eq(activePlatforms.campaignId, campaignId),
          eq(activePlatforms.platform, platform),
        ),
      )
      .limit(1)
  )[0];

  if (existing) {
    await db.transaction(async (tx) => {
      await tx
        .delete(activePlatforms)
        .where(
          and(
            eq(activePlatforms.campaignId, campaignId),
            eq(activePlatforms.platform, platform),
          ),
        );
      await tx
        .delete(campaignBaselines)
        .where(
          and(
            eq(campaignBaselines.campaignId, campaignId),
            eq(campaignBaselines.platform, platform),
          ),
        );
    });
  } else {
    await db.transaction(async (tx) => {
      await tx.insert(activePlatforms).values({ campaignId, platform });
      await tx
        .insert(campaignBaselines)
        .values(METRICS.map((metric) => ({ campaignId, platform, metric, value: 0 })))
        .onConflictDoNothing();
    });
  }
  revalidatePath(`/campaign/${campaignId}`);
}

export async function addKeyword(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const term = String(formData.get("term") ?? "").trim().replace(/^#/, "");
  await ownedCampaign(campaignId);
  if (term) {
    await db.insert(keywords).values({ campaignId, term }).onConflictDoNothing();
  }
  revalidatePath(`/campaign/${campaignId}`);
}

export async function removeKeyword(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const keywordId = Number(formData.get("keywordId"));
  await ownedCampaign(campaignId);
  await db
    .delete(keywords)
    .where(and(eq(keywords.id, keywordId), eq(keywords.campaignId, campaignId)));
  revalidatePath(`/campaign/${campaignId}`);
}

export async function addTarget(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const metric = String(formData.get("metric") ?? "");
  const platformRaw = String(formData.get("platform") ?? "");
  const value = Number(formData.get("targetValue"));
  await ownedCampaign(campaignId);

  const platform = platformRaw && isPlatform(platformRaw) ? platformRaw : null;
  if (isMetric(metric) && Number.isFinite(value) && value > 0) {
    await db
      .insert(targets)
      .values({ campaignId, metric, platform, targetValue: Math.round(value) });
  }
  revalidatePath(`/campaign/${campaignId}`);
}

export async function removeTarget(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const targetId = Number(formData.get("targetId"));
  await ownedCampaign(campaignId);
  await db
    .delete(targets)
    .where(and(eq(targets.id, targetId), eq(targets.campaignId, campaignId)));
  revalidatePath(`/campaign/${campaignId}`);
}

/** Parse "HH:MM" into minutes since midnight, or null. */
function toMinutes(v: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!m) return null;
  const mins = Number(m[1]) * 60 + Number(m[2]);
  return mins >= 0 && mins < 1440 ? mins : null;
}

/**
 * C2 composer: publish a real post into the shared feed AND tag it to the
 * active campaign with the scoring metadata the simulation reads. The post is
 * authored by the student (their own account), so it appears like any other.
 */
export async function publishCampaignPost(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId"));
  const { ownerId, campaign } = await ownedCampaign(campaignId);
  const platform = String(formData.get("platform") ?? "");
  if (!isPlatform(platform)) redirect(`/campaign/${campaignId}/compose`);

  // Only allow posting to a platform enabled on this campaign.
  const enabled = (
    await db
      .select({ p: activePlatforms.platform })
      .from(activePlatforms)
      .where(
        and(
          eq(activePlatforms.campaignId, campaignId),
          eq(activePlatforms.platform, platform),
        ),
      )
      .limit(1)
  )[0];
  if (!enabled) redirect(`/campaign/${campaignId}/compose`);

  const content = String(formData.get("content") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const dayRaw = String(formData.get("posting_day") ?? "");
  const postingDay = dayRaw === "" ? null : Number(dayRaw);
  const postingMinute = toMinutes(String(formData.get("posting_time") ?? ""));
  const callToAction = !!formData.get("call_to_action");

  if (!content && !imageUrl) redirect(`/campaign/${campaignId}/compose`);

  const created = (
    await db
      .insert(posts)
      .values({
        userId: ownerId,
        platform,
        content,
        imageUrl,
        campaignId,
        postingDay,
        postingMinute,
        callToAction,
        // Stamp the campaign clock at publish so freshness/fatigue work.
        campaignPublishedOn: campaign.clock,
      })
      .returning({ id: posts.id })
  )[0]!;

  // MockTube posts need youtube_meta to render in the faithful feed.
  if (platform === "youtube") {
    const profile = (String(formData.get("stats_profile") ?? "low") ||
      "low") as YtProfile;
    const seed = youtubeSeed(profile);
    await db.insert(youtubeMeta).values({
      postId: created.id,
      videoTitle: String(formData.get("title") ?? "").trim() || content.slice(0, 80) || "Untitled",
      thumbnailUrl: imageUrl || "",
      durationDisplay: String(formData.get("duration") ?? "").trim() || "10:00",
      statsProfile: profile,
      premiumViewPct: 27,
      seedViews: seed.views,
      seedLikes: seed.likes,
      seedComments: seed.comments,
      seedSubBoost: seed.subBoost,
    });
  }

  redirect(`/campaign/${campaignId}/compose`);
}
