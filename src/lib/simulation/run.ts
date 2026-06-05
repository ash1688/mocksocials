/**
 * Simulation runner (ADR-0001). Advances a campaign's clock by a step and
 * computes engagement + search rankings deterministically from already-published
 * campaign posts. Seeded noise derives from stable inputs (post id, campaign id,
 * step index) — never real time — so re-running reproduces the numbers.
 *
 * Adapted for the faithful base: reads the student's own campaign-tagged posts
 * (no Workspace/Organisation); the on-mission cue comes from the campaign goal.
 */
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  activePlatforms,
  keywords as keywordsTable,
  posts as postsTable,
  campaignBaselines,
  simulations,
  postMetrics,
  metricSnapshots,
  searchRankings,
} from "@/db/schema";
import { deriveSubScores, missionTerms, type PostContent } from "./derive";
import { buildHintChips } from "./hints";
import {
  performanceScore,
  projectReach,
  PLATFORM_BASELINE,
  GHOSTING_DECAY_PER_DAY,
} from "./performance-score";
import { jitter } from "./rng";
import { type Platform } from "./types";
import { METRICS, type Metric } from "@/lib/campaign/constants";

const MAX_RANK = 50;
const DAY_MS = 86_400_000;

function addDays(dateStr: string, n: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function ageInDays(toClock: string, publishedOn: string | null): number {
  if (!publishedOn) return 0;
  const toMs = Date.parse(`${toClock}T00:00:00Z`);
  const pubMs = Date.parse(`${publishedOn.slice(0, 10)}T00:00:00Z`);
  return Math.max(0, Math.round((toMs - pubMs) / DAY_MS));
}

function extractHashtags(s: string): string[] {
  return (s.match(/#([\p{L}0-9_]+)/gu) ?? []).map((h) => h.slice(1).toLowerCase());
}

export interface SimulationSummary {
  fromClock: string;
  toClock: string;
  stepIndex: number;
  postsScored: number;
}

/** Run one simulation step for a campaign. Returns a short summary. */
export async function runSimulation(
  campaignId: number,
  step: "day" | "week",
): Promise<SimulationSummary> {
  const campaign = (
    await db.select().from(campaigns).where(eq(campaigns.id, campaignId)).limit(1)
  )[0];
  if (!campaign) throw new Error("campaign not found");

  const [actives, kws, posts, baselines, priorSims] = await Promise.all([
    db.select().from(activePlatforms).where(eq(activePlatforms.campaignId, campaignId)),
    db.select().from(keywordsTable).where(eq(keywordsTable.campaignId, campaignId)),
    db.select().from(postsTable).where(eq(postsTable.campaignId, campaignId)),
    db.select().from(campaignBaselines).where(eq(campaignBaselines.campaignId, campaignId)),
    db.select({ stepIndex: simulations.stepIndex }).from(simulations).where(eq(simulations.campaignId, campaignId)),
  ]);

  const stepIndex = priorSims.length; // 0 for the first simulation
  const days = step === "week" ? 7 : 1;
  const fromClock = campaign.clock;
  const toClock = addDays(fromClock, days);

  const activePlats = actives.map((a) => a.platform) as Platform[];
  const ctx = {
    keywords: kws.map((k) => k.term.toLowerCase()),
    missionTerms: missionTerms(campaign.goal ?? null),
  };

  // Per-post derived content (content -> body/hashtags, image_url -> image,
  // youtube -> video).
  const enriched = posts.map((p) => {
    const body = p.content ?? "";
    const content: PostContent = {
      platform: p.platform as Platform,
      body,
      hasImage: !!p.imageUrl,
      hasVideo: p.platform === "youtube",
      hashtags: extractHashtags(body),
      callToAction: p.callToAction,
      postingDay: p.postingDay,
      postingMinute: p.postingMinute,
      ageDays: ageInDays(toClock, p.campaignPublishedOn),
    };
    return { post: p, content };
  });

  // Platform-level fatigue: > 10 posts on a platform within the trailing 7 days.
  const recentByPlatform = new Map<Platform, number>();
  for (const { post, content } of enriched) {
    if (content.ageDays <= 7) {
      const pl = post.platform as Platform;
      recentByPlatform.set(pl, (recentByPlatform.get(pl) ?? 0) + 1);
    }
  }

  const gains = new Map<string, number>(); // `${platform}:${metric}` -> gain
  const addGain = (platform: Platform, metric: Metric, v: number) =>
    gains.set(`${platform}:${metric}`, (gains.get(`${platform}:${metric}`) ?? 0) + v);

  return db.transaction(async (tx) => {
    const sim = (
      await tx
        .insert(simulations)
        .values({ campaignId, stepIndex, step, fromClock, toClock })
        .returning({ id: simulations.id })
    )[0]!;
    const simId = sim.id;

    // --- Per-post scoring ---
    for (const { post, content } of enriched) {
      const platform = post.platform as Platform;
      const derived = deriveSubScores(content, ctx);
      const fatigued = (recentByPlatform.get(platform) ?? 0) > 10;
      const result = performanceScore(derived.subScores, {
        ...derived.gates,
        postingFatigue: fatigued,
      });

      const seed = [post.id, campaignId, stepIndex];
      const reach = projectReach(result.score, PLATFORM_BASELINE[platform], seed);
      const likes = Math.round(reach * 0.08 * result.score * jitter(0.15, "lk", ...seed));
      const shares = Math.round(reach * 0.025 * result.score * jitter(0.15, "sh", ...seed));
      const comments = Math.round(reach * 0.012 * result.score * jitter(0.15, "cm", ...seed));
      const followersGained = Math.round(reach * 0.02 * result.score * jitter(0.15, "fl", ...seed));

      await tx.insert(postMetrics).values({
        postId: post.id,
        simulationId: simId,
        performanceScore: result.score,
        reach,
        likes,
        shares,
        comments,
        followersGained,
        factors: result.base,
        hints: buildHintChips(content, derived, ctx),
      });

      addGain(platform, "reach", reach);
      addGain(platform, "likes", likes);
      addGain(platform, "shares", shares);
      addGain(platform, "comments", comments);
      addGain(platform, "followers", followersGained);
    }

    // --- Cumulative metric snapshots per active platform/metric ---
    const baselineOf = (platform: Platform, metric: Metric) =>
      baselines.find((b) => b.platform === platform && b.metric === metric)?.value ?? 0;
    const ghostDecay = Math.max(0, 1 - GHOSTING_DECAY_PER_DAY * days);

    for (const platform of activePlats) {
      const ghosted = !recentByPlatform.has(platform);
      for (const metric of METRICS) {
        const prev = (
          await tx
            .select({ value: metricSnapshots.value })
            .from(metricSnapshots)
            .innerJoin(simulations, eq(metricSnapshots.simulationId, simulations.id))
            .where(
              and(
                eq(metricSnapshots.campaignId, campaignId),
                eq(metricSnapshots.platform, platform),
                eq(metricSnapshots.metric, metric),
                eq(simulations.stepIndex, stepIndex - 1),
              ),
            )
            .limit(1)
        )[0];
        const start = prev ? prev.value : baselineOf(platform, metric);
        const value =
          ghosted && metric === "followers"
            ? Math.round(start * ghostDecay)
            : start + Math.round(gains.get(`${platform}:${metric}`) ?? 0);
        await tx.insert(metricSnapshots).values({
          campaignId,
          simulationId: simId,
          platform,
          metric,
          value,
        });
      }
    }

    // --- Search rankings per keyword ---
    const totalPosts = enriched.length;
    const cumulativeReach = activePlats.reduce(
      (acc, p) => acc + (gains.get(`${p}:reach`) ?? 0),
      0,
    );
    for (const kw of kws) {
      const term = kw.term.toLowerCase();
      const matching = enriched.filter((e) =>
        (e.content.body.toLowerCase() + " " + e.content.hashtags.join(" ")).includes(term),
      );
      const presence = totalPosts > 0 ? matching.length / totalPosts : 0;
      const volume = Math.min(1, totalPosts / 10);
      const freshness =
        matching.length > 0
          ? matching.reduce((a, e) => a + Math.exp(-e.content.ageDays / 10), 0) / matching.length
          : 0;
      const engagement = Math.min(1, cumulativeReach / (PLATFORM_BASELINE.facebook * 3));
      const strength = 0.4 * presence + 0.2 * volume + 0.2 * freshness + 0.2 * engagement;
      const noisy = strength * jitter(0.06, kw.id, campaignId, stepIndex);
      const position = Math.max(1, Math.min(MAX_RANK, Math.round(MAX_RANK - noisy * (MAX_RANK - 1))));
      await tx.insert(searchRankings).values({
        campaignId,
        keywordId: kw.id,
        simulationId: simId,
        position,
      });
    }

    await tx.update(campaigns).set({ clock: toClock }).where(eq(campaigns.id, campaignId));
    return { fromClock, toClock, stepIndex, postsScored: enriched.length };
  });
}
