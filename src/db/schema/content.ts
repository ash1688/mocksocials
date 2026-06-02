import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  index,
  unique,
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
    // MockTube video length, rendered as an MM:SS badge (ADR-0005). Null unless
    // hasVideo. Image media is hot-linked from seeded Picsum at render time.
    durationSeconds: integer("duration_seconds"),
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

/**
 * Comments on a post. Persona comments are simulation-generated (the audience);
 * an Organisation reply is Student-authored community management (ADR-0005:
 * Organisation engagement). authorKind distinguishes them; personaId is set only
 * for persona comments. Threads cap at one level — a persona comment may receive
 * at most one Organisation reply, enforced in app logic (CONTEXT.md).
 */
export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id"), // the persona comment an Org reply hangs under
    authorKind: authorKindEnum("author_kind").notNull(),
    // Set when authorKind = 'persona'; null for an Organisation reply.
    personaId: uuid("persona_id").references(() => personas.id, {
      onDelete: "cascade",
    }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("comments_post_idx").on(t.postId)],
);

/**
 * Student-given likes issued as the Organisation (ADR-0005: Organisation
 * engagement) — onto persona/seeded-community posts or onto comments. Cosmetic:
 * DELIBERATELY excluded from every analytics/Target rollup. The Organisation may
 * never like its own posts (anti-cheat, enforced in app logic).
 */
export const orgLikes = pgTable(
  "org_likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaigns.id, { onDelete: "cascade" }),
    // Exactly one of postId / commentId is set (the liked target).
    postId: uuid("post_id").references(() => posts.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id").references(() => comments.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // One like per target per workspace (NULLs are distinct in PG, so post-likes
    // and comment-likes don't collide on the unused column).
    unique("org_likes_post_unique").on(t.workspaceId, t.postId),
    unique("org_likes_comment_unique").on(t.workspaceId, t.commentId),
    index("org_likes_campaign_idx").on(t.campaignId),
  ],
);
