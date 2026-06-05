import {
  pgTable,
  serial,
  integer,
  doublePrecision,
  jsonb,
  date,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import type { HintChip } from "@/lib/simulation/hints";

import { campaigns, keywords } from "./campaign";
import { posts } from "./posts";
import { platformEnum, metricEnum, simStepEnum } from "./enums";

/** One advance of the Campaign clock — engagement accrues deterministically
 *  from already-published content (ADR-0001). */
export const simulations = pgTable(
  "simulations",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    // Monotonic step number (0-based) — the orderable key for latest/previous.
    stepIndex: integer("step_index").notNull().default(0),
    step: simStepEnum("step").notNull().default("day"),
    fromClock: date("from_clock").notNull(),
    toClock: date("to_clock").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("simulations_campaign_idx").on(t.campaignId)],
);

/** Per-post simulation output. The score/factor breakdown is teacher-only;
 *  the hint chips are always student-visible. */
export const postMetrics = pgTable(
  "post_metrics",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    simulationId: integer("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),
    performanceScore: doublePrecision("performance_score").notNull(),
    reach: integer("reach").notNull().default(0),
    likes: integer("likes").notNull().default(0),
    shares: integer("shares").notNull().default(0),
    comments: integer("comments").notNull().default(0),
    followersGained: integer("followers_gained").notNull().default(0),
    factors: doublePrecision("factors_total"),
    hints: jsonb("hints").$type<HintChip[]>().notNull().default([]),
  },
  (t) => [
    unique("post_metrics_unique").on(t.postId, t.simulationId),
    index("post_metrics_sim_idx").on(t.simulationId),
  ],
);

/** Cumulative campaign metric value after each simulation, per platform — the
 *  actual-vs-target series the analytics dashboard plots. */
export const metricSnapshots = pgTable(
  "metric_snapshots",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    simulationId: integer("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    metric: metricEnum("metric").notNull(),
    value: integer("value").notNull(),
  },
  (t) => [
    unique("metric_snapshots_unique").on(t.simulationId, t.platform, t.metric),
    index("metric_snapshots_campaign_idx").on(t.campaignId),
  ],
);

/** A simulated SERP position for a tracked keyword (1 = top). Tracked over
 *  simulations to show movement. */
export const searchRankings = pgTable(
  "search_rankings",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    keywordId: integer("keyword_id")
      .notNull()
      .references(() => keywords.id, { onDelete: "cascade" }),
    simulationId: integer("simulation_id")
      .notNull()
      .references(() => simulations.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
  },
  (t) => [
    unique("search_rankings_unique").on(t.keywordId, t.simulationId),
    index("search_rankings_campaign_idx").on(t.campaignId),
  ],
);
