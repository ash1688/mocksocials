import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  date,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { workspaces } from "./org";
import { platformEnum, metricEnum } from "./enums";

/**
 * A goal-driven, self-contained run a Student executes for the Organisation
 * (CONTEXT.md: Campaign). Many per Workspace, but only one is Active at a time.
 * Every engagement metric is scoped to a Campaign and starts from a baseline
 * (ADR-0002).
 */
export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    goal: text("goal"),
    isActive: boolean("is_active").notNull().default(false),
    // The simulated date within the Workspace; advances only on Simulate
    // (CONTEXT.md: Campaign clock). Starts at startDate.
    clock: date("clock").notNull(),
    startDate: date("start_date").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("campaigns_workspace_idx").on(t.workspaceId),
    // At most one active campaign per workspace is enforced in app logic /
    // a partial unique index added in a migration.
  ],
);

/** Per-campaign baseline for each metric/platform, so a new Campaign is a clean
 *  before/after run (ADR-0002). */
export const campaignBaselines = pgTable(
  "campaign_baselines",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    metric: metricEnum("metric").notNull(),
    value: integer("value").notNull().default(0),
  },
  (t) => [unique("baselines_unique").on(t.campaignId, t.platform, t.metric)],
);

/** Platforms the Student has enabled for this Campaign (CONTEXT.md: Active
 *  platform). All four exist; unused ones are simply absent here. */
export const activePlatforms = pgTable(
  "active_platforms",
  {
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
  },
  (t) => [unique("active_platforms_pk").on(t.campaignId, t.platform)],
);

/** A success criterion the Student sets (CONTEXT.md: Target). Actuals are
 *  simulation-driven; this stores only the goal. Null platform = overall. */
export const targets = pgTable(
  "targets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform"), // null = overall target
    metric: metricEnum("metric").notNull(),
    targetValue: integer("target_value").notNull(),
  },
  (t) => [index("targets_campaign_idx").on(t.campaignId)],
);

/**
 * A Content schedule entry (CONTEXT.md: Content schedule) — a separate Aim B
 * PLANNING artifact documenting what the Organisation intends to post: on which
 * platform, how often, on which day/time, and the content theme. It is NOT an
 * executable queue — the Student enacts it by publishing posts (compose-on-
 * render). Pure documentation, never read by the Simulation.
 */
export const scheduleEntries = pgTable(
  "schedule_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    frequency: text("frequency").notNull(), // e.g. "Twice a week"
    postingDay: integer("posting_day"), // 0 = Mon .. 6 = Sun, optional
    postingMinute: integer("posting_minute"), // minutes since midnight, optional
    theme: text("theme").notNull(), // what the post is about
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("schedule_entries_campaign_idx").on(t.campaignId)],
);

/** Keywords/hashtags chosen to make content discoverable (CONTEXT.md: Keyword
 *  strategy). Used on-platform and by the search-ranking simulation. */
export const keywords = pgTable(
  "keywords",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    term: text("term").notNull(),
  },
  (t) => [unique("keywords_unique").on(t.campaignId, t.term)],
);
