import { and, eq, desc, asc } from "drizzle-orm";

import { db } from "@/db";
import {
  simulations,
  metricSnapshots,
  postMetrics,
  searchRankings,
  posts,
  keywords,
  activePlatforms,
} from "@/db/schema";
import { targets as targetsTable } from "@/db/schema";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { METRICS, type Metric } from "@/lib/campaign/constants";
import type { HintChip } from "@/lib/simulation/hints";

export interface SimSummary {
  simCount: number;
  /** latest cumulative value per platform/metric */
  snapshots: { platform: Platform; metric: Metric; value: number }[];
  /** latest per-post performance, best first */
  postResults: {
    postId: string;
    platform: Platform;
    body: string;
    score: number; // teacher-only; not shown to students
    reach: number;
    likes: number;
    shares: number;
    comments: number;
    hints: HintChip[];
  }[];
  /** latest search-ranking position per keyword */
  rankings: { term: string; position: number }[];
}

export interface TargetProgress {
  metric: Metric;
  platform: Platform | null; // null = overall
  targetValue: number;
  actual: number;
}

export interface CampaignDashboard {
  simCount: number;
  /** Active platforms, with each metric's latest-snapshot value. */
  platformTotals: { platform: Platform; metrics: Record<Metric, number> }[];
  /** Overall (summed across active platforms) per metric. */
  overall: Record<Metric, number>;
  /** Targets with their actual-vs-target progress (CONTEXT.md: Target). */
  targets: TargetProgress[];
}

const emptyMetrics = (): Record<Metric, number> =>
  Object.fromEntries(METRICS.map((m) => [m, 0])) as Record<Metric, number>;

/**
 * Workspace-level analysis for one campaign (ADR-0005): actual-vs-target per
 * platform and overall, read from the campaign's single latest snapshot.
 */
export async function getCampaignDashboard(
  campaignId: string,
): Promise<CampaignDashboard> {
  const sims = await db
    .select({ id: simulations.id })
    .from(simulations)
    .where(eq(simulations.campaignId, campaignId))
    .orderBy(desc(simulations.stepIndex));
  const latest = sims[0];

  const [actives, tgts, snaps] = await Promise.all([
    db
      .select({ platform: activePlatforms.platform })
      .from(activePlatforms)
      .where(eq(activePlatforms.campaignId, campaignId)),
    db.select().from(targetsTable).where(eq(targetsTable.campaignId, campaignId)),
    latest
      ? db
          .select()
          .from(metricSnapshots)
          .where(
            and(
              eq(metricSnapshots.campaignId, campaignId),
              eq(metricSnapshots.simulationId, latest.id),
            ),
          )
      : Promise.resolve([]),
  ]);

  // value[platform][metric]
  const value = new Map<string, number>();
  for (const s of snaps) value.set(`${s.platform}:${s.metric}`, s.value);
  const valueOf = (p: Platform, m: Metric) => value.get(`${p}:${m}`) ?? 0;

  const activePlats = actives
    .map((a) => a.platform as Platform)
    .sort((a, b) => PLATFORMS.indexOf(a) - PLATFORMS.indexOf(b));

  const platformTotals = activePlats.map((platform) => {
    const metrics = emptyMetrics();
    for (const m of METRICS) metrics[m] = valueOf(platform, m);
    return { platform, metrics };
  });

  const overall = emptyMetrics();
  for (const m of METRICS)
    overall[m] = activePlats.reduce((sum, p) => sum + valueOf(p, m), 0);

  const targets: TargetProgress[] = tgts.map((t) => {
    const metric = t.metric as Metric;
    const actual = t.platform
      ? valueOf(t.platform as Platform, metric)
      : overall[metric];
    return { metric, platform: (t.platform as Platform) ?? null, targetValue: t.targetValue, actual };
  });

  return { simCount: sims.length, platformTotals, overall, targets };
}

export interface KeywordRank {
  term: string;
  current: number; // 1 = top of the SERP
  first: number;
  best: number;
}

/** Per-keyword search-rank movement over simulations (CONTEXT.md: Search
 *  ranking; C.P7). Lower position is better. */
export async function getKeywordRankings(
  campaignId: string,
): Promise<KeywordRank[]> {
  const rows = await db
    .select({
      term: keywords.term,
      position: searchRankings.position,
      step: simulations.stepIndex,
    })
    .from(searchRankings)
    .innerJoin(keywords, eq(searchRankings.keywordId, keywords.id))
    .innerJoin(simulations, eq(searchRankings.simulationId, simulations.id))
    .where(eq(searchRankings.campaignId, campaignId))
    .orderBy(asc(simulations.stepIndex));

  const byTerm = new Map<string, number[]>();
  for (const r of rows) {
    const list = byTerm.get(r.term) ?? [];
    list.push(r.position);
    byTerm.set(r.term, list);
  }
  return [...byTerm.entries()].map(([term, positions]) => ({
    term,
    current: positions[positions.length - 1]!,
    first: positions[0]!,
    best: Math.min(...positions),
  }));
}

/** Compact analytics for the latest simulation of a campaign. Full dashboards
 *  and the mock SERP come in the analytics slice; this drives the readout that
 *  lets a Student see the optimise loop working. */
export async function getSimSummary(campaignId: string): Promise<SimSummary> {
  const sims = await db
    .select()
    .from(simulations)
    .where(eq(simulations.campaignId, campaignId))
    .orderBy(desc(simulations.stepIndex));

  const latest = sims[0];
  if (!latest) {
    return { simCount: 0, snapshots: [], postResults: [], rankings: [] };
  }

  const [snaps, pms, ranks] = await Promise.all([
    db
      .select()
      .from(metricSnapshots)
      .where(
        and(
          eq(metricSnapshots.campaignId, campaignId),
          eq(metricSnapshots.simulationId, latest.id),
        ),
      ),
    db
      .select({
        postId: postMetrics.postId,
        platform: posts.platform,
        body: posts.body,
        score: postMetrics.performanceScore,
        reach: postMetrics.reach,
        likes: postMetrics.likes,
        shares: postMetrics.shares,
        comments: postMetrics.comments,
        hints: postMetrics.hints,
      })
      .from(postMetrics)
      .innerJoin(posts, eq(postMetrics.postId, posts.id))
      .where(eq(postMetrics.simulationId, latest.id))
      .orderBy(desc(postMetrics.performanceScore)),
    db
      .select({ term: keywords.term, position: searchRankings.position })
      .from(searchRankings)
      .innerJoin(keywords, eq(searchRankings.keywordId, keywords.id))
      .where(eq(searchRankings.simulationId, latest.id))
      .orderBy(searchRankings.position),
  ]);

  return {
    simCount: sims.length,
    snapshots: snaps.map((s) => ({
      platform: s.platform as Platform,
      metric: s.metric as Metric,
      value: s.value,
    })),
    postResults: pms.map((p) => ({
      postId: p.postId,
      platform: p.platform as Platform,
      body: p.body,
      score: p.score,
      reach: p.reach,
      likes: p.likes,
      shares: p.shares,
      comments: p.comments,
      hints: p.hints ?? [],
    })),
    rankings: ranks,
  };
}
