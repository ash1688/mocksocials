import {
  pgTable,
  serial,
  integer,
  bigint,
  smallint,
  varchar,
  text,
  boolean,
  timestamp,
  unique,
  index,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

import { platformEnum, noteStatusEnum, ytStatsProfileEnum } from "./enums";
import { users } from "./users";
import { fakeUsers } from "./personas";
import { groups } from "./groups";
import { campaigns } from "./campaign";

/**
 * A post on any platform (PHP `posts`). Authored by EITHER a real user
 * (`userId`) or a persona (`fakeUserId`). Retweets/quotes/replies point at a
 * parent via `parentId`; quote text lives in `quoteText`.
 */
export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    fakeUserId: integer("fake_user_id").references(() => fakeUsers.id, {
      onDelete: "cascade",
    }),
    platform: platformEnum("platform").notNull(),
    content: text("content"),
    imageUrl: varchar("image_url", { length: 255 }).default(""),
    parentId: integer("parent_id").references((): AnyPgColumn => posts.id),
    groupId: integer("group_id").references(() => groups.id),
    quoteText: text("quote_text"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    // --- Campaign overlay (nullable; set only on campaign-tagged posts) ---
    campaignId: integer("campaign_id").references(() => campaigns.id, {
      onDelete: "set null",
    }),
    postingDay: integer("posting_day"), // 0 = Mon .. 6 = Sun
    postingMinute: integer("posting_minute"), // minutes since midnight
    callToAction: boolean("call_to_action").notNull().default(false),
  },
  (t) => [
    index("idx_platform_created").on(t.platform, t.createdAt),
    index("posts_user_idx").on(t.userId),
    index("posts_parent_idx").on(t.parentId),
    index("posts_group_idx").on(t.groupId),
    index("posts_campaign_idx").on(t.campaignId),
  ],
);

/** Likes on posts. Real liker (`userId`) or persona (`fakeUserId`). */
export const likes = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    fakeUserId: integer("fake_user_id").references(() => fakeUsers.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    unique("uniq_like").on(t.postId, t.userId),
    index("likes_user_idx").on(t.userId),
  ],
);

/** Comments/replies on posts; one-level threads via `parentCommentId`. */
export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    parentCommentId: integer("parent_comment_id").references(
      (): AnyPgColumn => comments.id,
    ),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    fakeUserId: integer("fake_user_id").references(() => fakeUsers.id, {
      onDelete: "cascade",
    }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("comments_post_idx").on(t.postId),
    index("idx_comments_parent").on(t.parentCommentId),
  ],
);

/** Likes on comments. */
export const commentLikes = pgTable(
  "comment_likes",
  {
    id: serial("id").primaryKey(),
    commentId: integer("comment_id")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    fakeUserId: integer("fake_user_id").references(() => fakeUsers.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [unique("uniq_comment_like").on(t.commentId, t.userId)],
);

/** Community Notes attached to posts (Twitter-style fact checks). */
export const communityNotes = pgTable("community_notes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  fakeUserId: integer("fake_user_id").references(() => fakeUsers.id, {
    onDelete: "cascade",
  }),
  noteText: text("note_text").notNull(),
  status: noteStatusEnum("status").notNull().default("visible"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Ephemeral Instagram-style stories (PHP `stories`). */
export const stories = pgTable(
  "stories",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    caption: varchar("caption", { length: 255 }).default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (t) => [
    index("idx_stories_active").on(t.expiresAt),
    index("idx_stories_user").on(t.userId),
  ],
);

/** Extra metadata for MockTube (YouTube) video posts (PHP `youtube_meta`). */
export const youtubeMeta = pgTable("youtube_meta", {
  postId: integer("post_id")
    .primaryKey()
    .references(() => posts.id, { onDelete: "cascade" }),
  videoTitle: varchar("video_title", { length: 255 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 255 }).default(""),
  durationDisplay: varchar("duration_display", { length: 10 }).default("0:00"),
  statsProfile: ytStatsProfileEnum("stats_profile").notNull().default("low"),
  premiumViewPct: smallint("premium_view_pct").notNull().default(27),
  seedViews: bigint("seed_views", { mode: "number" }).notNull().default(0),
  seedLikes: bigint("seed_likes", { mode: "number" }).notNull().default(0),
  seedComments: bigint("seed_comments", { mode: "number" }).notNull().default(0),
  seedSubBoost: bigint("seed_sub_boost", { mode: "number" })
    .notNull()
    .default(0),
});
