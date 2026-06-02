/**
 * Simulation runner (ADR-0001). Advances a campaign's clock by a step and
 * computes engagement + search rankings deterministically from already-published
 * content. Seeded noise derives from stable inputs (post id, campaign id,
 * keyword, step index) — never real time — so re-running reproduces the numbers.
 */
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  campaigns,
  workspaces,
  organisations,
  activePlatforms,
  keywords as keywordsTable,
  posts as postsTable,
  personas as personasTable,
  comments as commentsTable,
  campaignBaselines,
  simulations,
  postMetrics,
  metricSnapshots,
  searchRankings,
} from "@/db/schema";
import { deriveSubScores, missionTerms, type PostContent } from "./derive";
import { buildHintChips } from "./hints";
import { buildPersonaComments } from "./persona-comments";
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

function ageInDays(toClock: string, publishedOn: Date | null): number {
  if (!publishedOn) return 0;
  const toMs = Date.parse(`${toClock}T00:00:00Z`);
  const pubMs = Date.parse(`${publishedOn.toISOString().slice(0, 10)}T00:00:00Z`);
  return Math.max(0, Math.round((toMs - pubMs) / DAY_MS));
}

export interface SimulationSummary {
  fromClock: string;
  toClock: string;
  stepIndex: number;
  postsScored: number;
}

/** Run one simulation step for a campaign. Returns a short summary. */
export async function runSimulation(
  campaignId: string,
  step: "day" | "week",
): Promise<SimulationSummary> {
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.id, campaignId))
    .limit(1);
  if (!campaign) throw new Error("campaign not found");

  const [ws] = await db
    .select()
    .from(workspaces)
    .where(eq(workspaces.id, campaign.workspaceId))
    .limit(1);
  const org = ws
    ? (
        await db
          .select()
          .from(organisations)
          .where(eq(organisations.id, ws.organisationId))
          .limit(1)
      )[0]
    : undefined;

  const [actives, kws, posts, baselines, priorSims, personaRows] =
    await Promise.all([
      db.select().from(activePlatforms).where(eq(activePlatforms.campaignId, campaignId)),
      db.select().from(keywordsTable).where(eq(keywordsTable.campaignId, campaignId)),
      db
        .select()
        .from(postsTable)
        .where(
          and(
            eq(postsTable.campaignId, campaignId),
            eq(postsTable.authorKind, "organisation"),
            eq(postsTable.isSeeded, false),
          ),
        ),
      db.select().from(campaignBaselines).where(eq(campaignBaselines.campaignId, campaignId)),
      db.select().from(simulations).where(eq(simulations.campaignId, campaignId)),
      db.select({ id: personasTable.id }).from(personasTable).where(eq(personasTable.workspaceId, campaign.workspaceId)),
    ]);
  const personaIds = personaRows.map((p) => p.id);

  const stepIndex = priorSims.length; // 0 for the first simulation
  const days = step === "week" ? 7 : 1;
  const fromClock = campaign.clock;
  const toClock = addDays(fromClock, days);

  const activePlats = actives.map((a) => a.platform) as Platform[];
  const ctx = {
    keywords: kws.map((k) => k.term.toLowerCase()),
    missionTerms: missionTerms(org?.mission ?? null),
  };

  // Platform-level fatigue: more than 10 posts on a platform within the last
  // 7 clock-days of the step is posting fatigue (ADR-0001 gate).
  const recentByPlatform = new Map<Platform, number>();
  for (const p of posts) {
    if (ageInDays(toClock, p.publishedOn) <= 7) {
      recentByPlatform.set(
        p.platform as Platform,
        (recentByPlatform.get(p.platform as Platform) ?? 0) + 1,
      );
    }
  }

  // Gains accrued this step, per platform/metric.
  const gains = new Map<string, number>(); // key `${platform}:${metric}`
  const addGain = (platform: Platform, metric: Metric, v: number) =>
    gains.set(`${platform}:${metric}`, (gains.get(`${platform}:${metric}`) ?? 0) + v);

  return db.transaction(async (tx) => {
    const [sim] = await tx
      .insert(simulations)
      .values({ campaignId, stepIndex, step, fromClock, toClock })
      .returning();
    const simId = sim!.id;

    // --- Per-post scoring ---
    for (const post of posts) {
      const platform = post.platform as Platform;
      const content: PostContent = {
        platform,
        body: post.body,
        hasImage: post.hasImage,
        hasVideo: post.hasVideo,
        hashtags: post.hashtags,
        callToAction: post.callToAction,
        postingDay: post.postingDay,
        postingMinute: post.postingMinute,
        ageDays: ageInDays(toClock, post.publishedOn),
      };
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
      const followersGained = Math.round(
        reach * 0.02 * result.score * jitter(0.15, "fl", ...seed),
      );

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

      // Audience comments this post received (CONTEXT.md). Sampled + capped,
      // with stable ids so re-simulation upserts the same rows (and the Org's
      // replies/likes survive). Upsert — never destroy Student-authored data.
      const personaComments = buildPersonaComments(post.id, comments, personaIds);
      if (personaComments.length > 0) {
        await tx
          .insert(commentsTable)
          .values(
            personaComments.map((c) => ({
              id: c.id,
              postId: post.id,
              authorKind: "persona" as const,
              personaId: c.personaId,
              body: c.body,
            })),
          )
          .onConflictDoNothing();
      }

      addGain(platform, "reach", reach);
      addGain(platform, "likes", likes);
      addGain(platform, "shares", shares);
      addGain(platform, "comments", comments);
      addGain(platform, "followers", followersGained);
    }

    // --- Cumulative metric snapshots per active platform/metric ---
    const baselineOf = (platform: Platform, metric: Metric) =>
      baselines.find((b) => b.platform === platform && b.metric === metric)?.value ?? 0;

    // Ghosting: an Active platform with no posts in the trailing week loses
    // followers (ADR-0001 gate, applied at platform level).
    const ghostDecay = Math.max(0, 1 - GHOSTING_DECAY_PER_DAY * days);

    for (const platform of activePlats) {
      const ghosted = !recentByPlatform.has(platform);
      for (const metric of METRICS) {
        // Previous cumulative value = the most recent prior simulation's
        // snapshot for this platform/metric. Order by stepIndex (NOT row id,
        // which is a random UUID).
        const [prev] = await tx
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
          .limit(1);
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
    const totalPosts = posts.length;
    const cumulativeReach = activePlats.reduce((acc, p) => {
      // approximate signal: this step's reach gain across platforms
      return acc + (gains.get(`${p}:reach`) ?? 0);
    }, 0);

    for (const kw of kws) {
      const term = kw.term.toLowerCase();
      const matchingPosts = posts.filter((p) =>
        (p.body.toLowerCase() + " " + p.hashtags.join(" ").toLowerCase()).includes(term),
      );
      const presence = totalPosts > 0 ? matchingPosts.length / totalPosts : 0;
      const volume = Math.min(1, totalPosts / 10);
      const freshness =
        matchingPosts.length > 0
          ? matchingPosts.reduce(
              (a, p) => a + Math.exp(-ageInDays(toClock, p.publishedOn) / 10),
              0,
            ) / matchingPosts.length
          : 0;
      const engagement = Math.min(1, cumulativeReach / (PLATFORM_BASELINE.mockbook * 3));

      const strength =
        0.4 * presence + 0.2 * volume + 0.2 * freshness + 0.2 * engagement;
      const noisy = strength * jitter(0.06, kw.id, campaignId, stepIndex);
      const position = Math.max(
        1,
        Math.min(MAX_RANK, Math.round(MAX_RANK - noisy * (MAX_RANK - 1))),
      );

      await tx.insert(searchRankings).values({
        campaignId,
        keywordId: kw.id,
        simulationId: simId,
        position,
      });
    }

    // Advance the campaign clock.
    await tx.update(campaigns).set({ clock: toClock }).where(eq(campaigns.id, campaignId));

    return { fromClock, toClock, stepIndex, postsScored: posts.length };
  });
}
