"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  activePlatforms,
  campaignBaselines,
  keywords,
  targets,
} from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "./queries";
import { SCENARIO_START_DATE, METRICS } from "./constants";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";

function isPlatform(v: string): v is Platform {
  return (PLATFORMS as readonly string[]).includes(v);
}

/** Resolve the current workspace and assert it owns the campaign. */
async function ownedCampaign(campaignId: string) {
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");
  return { workspaceId: workspace.id, campaign };
}

export async function createCampaign(formData: FormData): Promise<void> {
  const { workspace } = await requireStudentWorkspace();
  const name = String(formData.get("name") ?? "").trim();
  const goal = String(formData.get("goal") ?? "").trim() || null;
  if (!name) redirect("/dashboard");

  const [created] = await db
    .insert(campaigns)
    .values({
      workspaceId: workspace.id,
      name,
      goal,
      clock: SCENARIO_START_DATE,
      startDate: SCENARIO_START_DATE,
      isActive: false,
    })
    .returning();

  redirect(`/campaign/${created!.id}`);
}

/** Make a campaign the single Active one in its workspace (CONTEXT.md). */
export async function activateCampaign(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const { workspaceId } = await ownedCampaign(campaignId);

  await db.transaction(async (tx) => {
    await tx
      .update(campaigns)
      .set({ isActive: false })
      .where(
        and(
          eq(campaigns.workspaceId, workspaceId),
          ne(campaigns.id, campaignId),
        ),
      );
    await tx
      .update(campaigns)
      .set({ isActive: true })
      .where(eq(campaigns.id, campaignId));
  });

  revalidatePath("/dashboard");
  revalidatePath(`/campaign/${campaignId}`);
}

/** Enable/disable a Platform for a campaign (CONTEXT.md: Active platform).
 *  Enabling seeds zero baselines per metric so the campaign has a defined
 *  before/after start (ADR-0002). */
export async function toggleActivePlatform(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const platform = String(formData.get("platform") ?? "");
  if (!isPlatform(platform)) redirect("/dashboard");
  await ownedCampaign(campaignId);

  const [existing] = await db
    .select()
    .from(activePlatforms)
    .where(
      and(
        eq(activePlatforms.campaignId, campaignId),
        eq(activePlatforms.platform, platform),
      ),
    )
    .limit(1);

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
        .values(
          METRICS.map((metric) => ({
            campaignId,
            platform,
            metric,
            value: 0,
          })),
        )
        .onConflictDoNothing();
    });
  }

  revalidatePath(`/campaign/${campaignId}`);
}

export async function addKeyword(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const term = String(formData.get("term") ?? "")
    .trim()
    .replace(/^#/, "");
  await ownedCampaign(campaignId);
  if (term) {
    await db
      .insert(keywords)
      .values({ campaignId, term })
      .onConflictDoNothing();
  }
  revalidatePath(`/campaign/${campaignId}`);
}

export async function removeKeyword(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const keywordId = String(formData.get("keywordId") ?? "");
  await ownedCampaign(campaignId);
  await db
    .delete(keywords)
    .where(and(eq(keywords.id, keywordId), eq(keywords.campaignId, campaignId)));
  revalidatePath(`/campaign/${campaignId}`);
}

export async function addTarget(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const metric = String(formData.get("metric") ?? "");
  const platformRaw = String(formData.get("platform") ?? "");
  const value = Number(formData.get("targetValue"));
  await ownedCampaign(campaignId);

  const validMetric = (METRICS as readonly string[]).includes(metric);
  const platform = platformRaw && isPlatform(platformRaw) ? platformRaw : null;
  if (validMetric && Number.isFinite(value) && value > 0) {
    await db.insert(targets).values({
      campaignId,
      metric: metric as (typeof METRICS)[number],
      platform,
      targetValue: Math.round(value),
    });
  }
  revalidatePath(`/campaign/${campaignId}`);
}

export async function removeTarget(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const targetId = String(formData.get("targetId") ?? "");
  await ownedCampaign(campaignId);
  await db
    .delete(targets)
    .where(and(eq(targets.id, targetId), eq(targets.campaignId, campaignId)));
  revalidatePath(`/campaign/${campaignId}`);
}
