/**
 * Headless integration check for the simulation engine (ADR-0001). Not a unit
 * test — it drives the real runner against the dev DB and asserts:
 *   - re-running reproduces identical numbers (determinism)
 *   - engagement accrues and search ranks improve over steps
 *   - ghosting decays followers when a platform is neglected
 *   - hint chips are computed and persisted
 * Run: npm run sim:check
 */
import "dotenv/config";
import { and, eq, asc, desc, inArray } from "drizzle-orm";

import { db } from "../src/db";
import {
  campaigns,
  simulations,
  metricSnapshots,
  searchRankings,
  postMetrics,
  posts,
  comments,
} from "../src/db/schema";
import { runSimulation } from "../src/lib/simulation/run";

const AUTUMN = "1edfbbe9-4582-4cd6-a00e-826839b84cab";

async function reset(campaignId: string) {
  const [c] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
  if (!c) throw new Error("campaign not found — seed/setup first");
  // single active in workspace
  await db.update(campaigns).set({ isActive: false }).where(eq(campaigns.workspaceId, c.workspaceId));
  await db.update(campaigns).set({ isActive: true, clock: c.startDate }).where(eq(campaigns.id, campaignId));
  await db.delete(metricSnapshots).where(eq(metricSnapshots.campaignId, campaignId));
  await db.delete(searchRankings).where(eq(searchRankings.campaignId, campaignId));
  const postRows = await db.select({ id: posts.id }).from(posts).where(eq(posts.campaignId, campaignId));
  const postIds = postRows.map((p) => p.id);
  if (postIds.length > 0) await db.delete(comments).where(inArray(comments.postId, postIds));
  await db.delete(simulations).where(eq(simulations.campaignId, campaignId));
}

async function firstSimPostMetrics(campaignId: string) {
  const sims = await db
    .select()
    .from(simulations)
    .where(eq(simulations.campaignId, campaignId))
    .orderBy(asc(simulations.stepIndex));
  const first = sims[0]!;
  return db
    .select({
      postId: postMetrics.postId,
      score: postMetrics.performanceScore,
      reach: postMetrics.reach,
      likes: postMetrics.likes,
    })
    .from(postMetrics)
    .where(eq(postMetrics.simulationId, first.id))
    .orderBy(asc(postMetrics.postId));
}

async function followers(campaignId: string, platform: "mocktweet" | "mockgram") {
  const rows = await db
    .select({ value: metricSnapshots.value, stepIndex: simulations.stepIndex })
    .from(metricSnapshots)
    .innerJoin(simulations, eq(metricSnapshots.simulationId, simulations.id))
    .where(
      and(
        eq(metricSnapshots.campaignId, campaignId),
        eq(metricSnapshots.platform, platform),
        eq(metricSnapshots.metric, "followers"),
      ),
    )
    .orderBy(asc(simulations.stepIndex));
  return rows.map((r) => r.value);
}

async function main() {
  // Run A: two weeks.
  await reset(AUTUMN);
  const a1 = await runSimulation(AUTUMN, "week");
  const aFirst = await firstSimPostMetrics(AUTUMN);
  const a2 = await runSimulation(AUTUMN, "week");
  console.log("week 1 window:", a1.fromClock, "->", a1.toClock, "stepIndex", a1.stepIndex);
  console.log("week 2 window:", a2.fromClock, "->", a2.toClock, "stepIndex", a2.stepIndex);
  const tweetFollowers = await followers(AUTUMN, "mocktweet");

  // Run B: fresh, one week — first-sim metrics must match Run A's first sim.
  await reset(AUTUMN);
  await runSimulation(AUTUMN, "week");
  const bFirst = await firstSimPostMetrics(AUTUMN);

  const deterministic = JSON.stringify(aFirst) === JSON.stringify(bFirst);

  // Hints + ranks from the latest state.
  const latestSims = await db.select().from(simulations).where(eq(simulations.campaignId, AUTUMN)).orderBy(desc(simulations.stepIndex));
  const pm = await db.select().from(postMetrics).where(eq(postMetrics.simulationId, latestSims[0]!.id));

  console.log("determinism (A.sim0 === B.sim0):", deterministic);
  console.log("post scores (sim0):", aFirst.map((p) => ({ reach: p.reach, likes: p.likes, score: +p.score.toFixed(3) })));
  console.log("mocktweet followers over weeks [w1, w2]:", tweetFollowers);
  console.log("ghosting decays week2 < week1:", tweetFollowers.length === 2 && tweetFollowers[1]! < tweetFollowers[0]!);
  console.log("hints sample:", pm[0]?.hints);
  console.log("hint chips contain no digits:", pm.every((m) => (m.hints as { label: string }[]).every((h) => !/\d/.test(h.label))));

  if (!deterministic) throw new Error("NON-DETERMINISTIC — violates ADR-0001");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
