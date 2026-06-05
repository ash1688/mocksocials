import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  date,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { platformEnum, metricEnum } from "./enums";
import { users } from "./users";

/**
 * A goal-driven campaign a student runs on their own account (overlay on the
 * faithful shared sandbox — no Organisation/Workspace). Many per student, but
 * only one Active at a time (enforced in app logic). Metrics are simulation-
 * driven and scoped to the campaign from a baseline.
 */
export const campaigns = pgTable(
  "campaigns",
  {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    goal: text("goal"),
    isActive: boolean("is_active").notNull().default(false),
    // Simulated date; advances only on Simulate. Starts at startDate.
    clock: date("clock").notNull(),
    startDate: date("start_date").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("campaigns_owner_idx").on(t.ownerId)],
);

/** Per-campaign baseline for each metric/platform (clean before/after). */
export const campaignBaselines = pgTable(
  "campaign_baselines",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    metric: metricEnum("metric").notNull(),
    value: integer("value").notNull().default(0),
  },
  (t) => [unique("baselines_unique").on(t.campaignId, t.platform, t.metric)],
);

/** Platforms the student enabled for this campaign (Active platform). */
export const activePlatforms = pgTable(
  "active_platforms",
  {
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
  },
  (t) => [unique("active_platforms_pk").on(t.campaignId, t.platform)],
);

/** A success criterion the student sets. Null platform = overall target. */
export const targets = pgTable(
  "targets",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    platform: platformEnum("platform"), // null = overall
    metric: metricEnum("metric").notNull(),
    targetValue: integer("target_value").notNull(),
  },
  (t) => [index("targets_campaign_idx").on(t.campaignId)],
);

/** Keywords/hashtags chosen for discoverability + search-ranking simulation. */
export const keywords = pgTable(
  "keywords",
  {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    term: text("term").notNull(),
  },
  (t) => [unique("keywords_unique").on(t.campaignId, t.term)],
);
