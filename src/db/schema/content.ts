import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { workspaces } from "./org";
import { campaigns } from "./campaign";
import { platformEnum, authorKindEnum } from "./enums";

/**
 * A fictional member of the public (CONTEXT.md: Fake persona). Personas never
 * log in. They are the audience that engages, and the authors of the seeded
 * community. Copied per Workspace so interactions never leak (ADR-0002).
 */
export const personas = pgTable(
  "personas",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    handle: text("handle").notNull(),
    displayName: text("display_name").notNull(),
    avatarUrl: text("avatar_url"),
  },
  (t) => [index("personas_workspace_idx").on(t.workspaceId)],
);

/**
 * A piece of content on a platform. The Student enacts their Content schedule
 * by publishing posts immediately, each stamped with a chosen posting day/time
 * (CONTEXT.md: Posting day/time). Organisation posts are the Student's own;
 * persona posts form the seeded community backdrop.
 */
export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    // Organisation posts belong to a campaign; seeded-community posts may not.
    campaignId: uuid("campaign_id").references(() => campaigns.id, {
      onDelete: "cascade",
    }),
    platform: platformEnum("platform").notNull(),

    authorKind: authorKindEnum("author_kind").notNull(),
    // Set when authorKind = 'persona'.
    personaId: uuid("persona_id").references(() => personas.id, {
      onDelete: "cascade",
    }),

    body: text("body").notNull(),
    hasImage: boolean("has_image").notNull().default(false),
    hasVideo: boolean("has_video").notNull().default(false),
    hashtags: text("hashtags").array().notNull().default([]),
    callToAction: boolean("call_to_action").notNull().default(false),

    // Posting day/time the timing factor reads (0=Mon..6=Sun, minutes 0..1439).
    postingDay: integer("posting_day"),
    postingMinute: integer("posting_minute"),

    // Whether this is seeded backdrop vs. Student-authored campaign content.
    isSeeded: boolean("is_seeded").notNull().default(false),

    // The campaign-clock date this post is stamped as published on.
    publishedOn: timestamp("published_on", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("posts_campaign_idx").on(t.campaignId),
    index("posts_workspace_platform_idx").on(t.workspaceId, t.platform),
  ],
);

/** Threaded comments by personas on a post (reused infra from CONTEXT.md). */
export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id"),
    personaId: uuid("persona_id")
      .notNull()
      .references(() => personas.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("comments_post_idx").on(t.postId)],
);
