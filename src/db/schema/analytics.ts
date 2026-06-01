import {
  pgTable,
  uuid,
  integer,
  doublePrecision,
  date,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { campaigns, keywords } from "./campaign";
import { posts } from "./content";
import { platformEnum, metricEnum, simStepEnum } from "./enums";

/**
 * One advance of the Campaign clock (CONTEXT.md: Simulation). Engagement and
 * search rankings accrue deterministically from already-published content
 * (ADR-0001). Re-simulating unchanged content yields the same numbers.
 */
export const simulations = pgTable(
  "simulations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    step: simStepEnum("step").notNull().default("day"),
    fromClock: date("from_clock").notNull(),
    toClock: date("to_clock").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("simulations_campaign_idx").on(t.campaignId)],
);

/**
 * Per-post simulation output: the weighted performance score and the reach it
 * projected (ADR-0001). The factor breakdown is hidden from Students by default;
 * a teacher can reveal it (CONTEXT.md: Performance score / Hint chip).
 */
export const postMetrics = pgTable(
  "post_metrics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    simulationId: uuid("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),

    performanceScore: doublePrecision("performance_score").notNull(),
    reach: integer("reach").notNull().default(0),
    likes: integer("likes").notNull().default(0),
    shares: integer("shares").notNull().default(0),
    comments: integer("comments").notNull().default(0),
    followersGained: integer("followers_gained").notNull().default(0),

    // The five sub-scores + applied gate multiplier, for the teacher breakdown
    // and the qualitative hint chips. JSON keeps the scaffold flexible.
    factors: doublePrecision("factors_total"),
  },
  (t) => [
    unique("post_metrics_unique").on(t.postId, t.simulationId),
    index("post_metrics_sim_idx").on(t.simulationId),
  ],
);

/** Cumulative campaign metric value after each simulation, per platform — the
 *  actual-vs-target series the analytics dashboard plots (CONTEXT.md: Target). */
export const metricSnapshots = pgTable(
  "metric_snapshots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    simulationId: uuid("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    metric: metricEnum("metric").notNull(),
    value: integer("value").notNull(),
  },
  (t) => [
    unique("metric_snapshots_unique").on(
      t.simulationId,
      t.platform,
      t.metric,
    ),
    index("metric_snapshots_campaign_idx").on(t.campaignId),
  ],
);

/**
 * A simulated SERP position for a tracked keyword (CONTEXT.md: Search ranking).
 * Rises with keyword presence, freshness, engagement, and content volume/format
 * (ADR-0001). Tracked over Simulations to show movement (C.P7).
 */
export const searchRankings = pgTable(
  "search_rankings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    keywordId: uuid("keyword_id")
      .notNull()
      .references(() => keywords.id, { onDelete: "cascade" }),
    simulationId: uuid("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),
    position: integer("position").notNull(), // 1 = top of the mock SERP
  },
  (t) => [
    unique("search_rankings_unique").on(t.keywordId, t.simulationId),
    index("search_rankings_campaign_idx").on(t.campaignId),
  ],
);
