import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import {
  accounts,
  workspaces,
  organisations,
  campaigns,
  keywords,
  posts,
  postMetrics,
  simulations,
} from "@/db/schema";
import { deriveSubScores, missionTerms, type PostContent } from "@/lib/simulation/derive";
import type { SubScores, GateFlags } from "@/lib/simulation/performance-score";
import type { Platform } from "@/lib/simulation/types";

const DAY_MS = 86_400_000;
function ageInDays(toClock: string, publishedOn: Date | null): number {
  if (!publishedOn) return 0;
  const toMs = Date.parse(`${toClock}T00:00:00Z`);
  const pubMs = Date.parse(`${publishedOn.toISOString().slice(0, 10)}T00:00:00Z`);
  return Math.max(0, Math.round((toMs - pubMs) / DAY_MS));
}

export interface AdminStudent {
  accountId: string;
  username: string;
  displayName: string;
  campaigns: { id: string; name: string; isActive: boolean }[];
}

/** Every student with their campaigns, for the teacher's admin list. */
export async function listStudentsForAdmin(): Promise<AdminStudent[]> {
  const rows = await db
    .select({
      accountId: accounts.id,
      username: accounts.username,
      displayName: accounts.displayName,
      campaignId: campaigns.id,
      campaignName: campaigns.name,
      isActive: campaigns.isActive,
    })
    .from(accounts)
    .leftJoin(workspaces, eq(workspaces.accountId, accounts.id))
    .leftJoin(campaigns, eq(campaigns.workspaceId, workspaces.id))
    .where(eq(accounts.role, "student"))
    .orderBy(accounts.username);

  const byStudent = new Map<string, AdminStudent>();
  for (const r of rows) {
    let s = byStudent.get(r.accountId);
    if (!s) {
      s = {
        accountId: r.accountId,
        username: r.username,
        displayName: r.displayName,
        campaigns: [],
      };
      byStudent.set(r.accountId, s);
    }
    if (r.campaignId) {
      s.campaigns.push({
        id: r.campaignId,
        name: r.campaignName!,
        isActive: r.isActive!,
      });
    }
  }
  return [...byStudent.values()];
}

/** A campaign with its owning student + org, accessible to a teacher (not
 *  workspace-scoped to the teacher). */
export async function getCampaignForAdmin(campaignId: string) {
  const [row] = await db
    .select({
      campaign: campaigns,
      studentName: accounts.displayName,
      org: organisations,
    })
    .from(campaigns)
    .innerJoin(workspaces, eq(campaigns.workspaceId, workspaces.id))
    .innerJoin(accounts, eq(workspaces.accountId, accounts.id))
    .innerJoin(organisations, eq(workspaces.organisationId, organisations.id))
    .where(eq(campaigns.id, campaignId))
    .limit(1);
  return row ?? null;
}

export interface FactorRow {
  postId: string;
  platform: Platform;
  body: string;
  subScores: SubScores;
  gates: GateFlags;
  gateMultiplier: number; // derived: score / geometric base
  score: number; // teacher-only numeric performance score
  reach: number;
}

/**
 * The hidden factor breakdown for a teacher to demonstrate cause and effect
 * (ADR-0001/0005): per post, the five recomputed sub-scores, the applied gate
 * multiplier (derived from the stored score ÷ geometric base), the numeric
 * score, and reach — all from the latest snapshot.
 */
export async function getCampaignFactorBreakdown(
  campaignId: string,
): Promise<{ clock: string; rows: FactorRow[] }> {
  const detail = await getCampaignForAdmin(campaignId);
  if (!detail) return { clock: "", rows: [] };

  const [kws, sims] = await Promise.all([
    db.select().from(keywords).where(eq(keywords.campaignId, campaignId)),
    db
      .select()
      .from(simulations)
      .where(eq(simulations.campaignId, campaignId))
      .orderBy(desc(simulations.stepIndex))
      .limit(1),
  ]);
  const latest = sims[0];
  if (!latest) return { clock: detail.campaign.clock, rows: [] };

  const ctx = {
    keywords: kws.map((k) => k.term.toLowerCase()),
    missionTerms: missionTerms(detail.org.mission),
  };

  const rows = await db
    .select({ post: posts, m: postMetrics })
    .from(posts)
    .innerJoin(
      postMetrics,
      and(eq(postMetrics.postId, posts.id), eq(postMetrics.simulationId, latest.id)),
    )
    .where(
      and(
        eq(posts.campaignId, campaignId),
        eq(posts.authorKind, "organisation"),
        eq(posts.isSeeded, false),
      ),
    );

  const out: FactorRow[] = rows.map(({ post, m }) => {
    const content: PostContent = {
      platform: post.platform as Platform,
      body: post.body,
      hasImage: post.hasImage,
      hasVideo: post.hasVideo,
      hashtags: post.hashtags,
      callToAction: post.callToAction,
      postingDay: post.postingDay,
      postingMinute: post.postingMinute,
      ageDays: ageInDays(latest.toClock, post.publishedOn),
    };
    const derived = deriveSubScores(content, ctx);
    const base = m.factors ?? 0;
    const gateMultiplier = base > 0 ? m.performanceScore / base : 1;
    return {
      postId: post.id,
      platform: post.platform as Platform,
      body: post.body,
      subScores: derived.subScores,
      gates: derived.gates,
      gateMultiplier,
      score: m.performanceScore,
      reach: m.reach,
    };
  });

  return { clock: latest.toClock, rows: out };
}
