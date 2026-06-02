import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import {
  simulations,
  metricSnapshots,
  postMetrics,
  searchRankings,
  posts,
  keywords,
} from "@/db/schema";
import type { Platform } from "@/lib/simulation/types";
import type { Metric } from "@/lib/campaign/constants";
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
