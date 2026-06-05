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
} from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";
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
