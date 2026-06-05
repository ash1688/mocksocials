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
  targets as targetsTable,
} from "@/db/schema";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { METRICS, type Metric } from "@/lib/campaign/constants";
import type { HintChip } from "@/lib/simulation/hints";

export interface TargetProgress {
  metric: Metric;
  platform: Platform | null; // null = overall
  targetValue: number;
  actual: number;
}

export interface CampaignDashboard {
  simCount: number;
  platformTotals: { platform: Platform; metrics: Record<Metric, number> }[];
  overall: Record<Metric, number>;
  targets: TargetProgress[];
}

const emptyMetrics = (): Record<Metric, number> =>
  Object.fromEntries(METRICS.map((m) => [m, 0])) as Record<Metric, number>;

/** Actual-vs-target per platform + overall, from the latest snapshot. */
export async function getCampaignDashboard(
  campaignId: number,
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

  const targetsOut: TargetProgress[] = tgts.map((t) => {
    const metric = t.metric as Metric;
    const actual = t.platform ? valueOf(t.platform as Platform, metric) : overall[metric];
    return {
      metric,
      platform: (t.platform as Platform) ?? null,
      targetValue: t.targetValue,
      actual,
    };
  });

  return { simCount: sims.length, platformTotals, overall, targets: targetsOut };
}

export interface PostResult {
  postId: number;
  platform: Platform;
  body: string;
  score: number; // teacher-only
  reach: number;
  likes: number;
  shares: number;
  comments: number;
  hints: HintChip[];
}

/** Latest-simulation per-post results, best first. */
export async function getPostResults(campaignId: number): Promise<PostResult[]> {
  const latest = (
    await db
      .select({ id: simulations.id })
      .from(simulations)
      .where(eq(simulations.campaignId, campaignId))
      .orderBy(desc(simulations.stepIndex))
      .limit(1)
  )[0];
  if (!latest) return [];

  const rows = await db
    .select({
      postId: postMetrics.postId,
      platform: posts.platform,
      body: posts.content,
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
    .orderBy(desc(postMetrics.performanceScore));

  return rows.map((p) => ({
    postId: p.postId,
    platform: p.platform as Platform,
    body: p.body ?? "",
    score: p.score,
    reach: p.reach,
    likes: p.likes,
    shares: p.shares,
    comments: p.comments,
    hints: p.hints ?? [],
  }));
}

export interface KeywordRank {
  term: string;
  current: number;
  first: number;
  best: number;
}

/** Per-keyword SERP movement over simulations. Lower position is better. */
export async function getKeywordRankings(
  campaignId: number,
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
