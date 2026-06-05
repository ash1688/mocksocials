import { pgEnum } from "drizzle-orm/pg-core";

// Faithful port of the PHP MockSocial enums (docs/mocksocial_php.sql).

/** The four mock networks. Stored with their original platform keys; the
 *  Mock* wordmarks (MockTweet/MockBook/MockGram/MockTube) are display-only. */
export const platformEnum = pgEnum("platform", [
  "twitter",
  "facebook",
  "instagram",
  "youtube",
]);

/** community_notes.status */
export const noteStatusEnum = pgEnum("note_status", ["visible", "removed"]);

/** group_members.role */
export const groupRoleEnum = pgEnum("group_role", ["member", "admin"]);

/** youtube_meta.stats_profile */
export const ytStatsProfileEnum = pgEnum("yt_stats_profile", [
  "low",
  "moderate",
  "high",
  "hyped",
  "viral",
]);

// --- Campaign / simulation layer (overlay on the faithful base) --------------

/** Metrics a Target can be set against / the simulation accrues. */
export const metricEnum = pgEnum("metric", [
  "followers",
  "likes",
  "shares",
  "reach",
  "comments",
]);

/** Simulation step granularity (Campaign clock advance). */
export const simStepEnum = pgEnum("sim_step", ["day", "week"]);
