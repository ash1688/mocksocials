import { pgEnum } from "drizzle-orm/pg-core";

/** The four mock social networks (CONTEXT.md: Platform). */
export const platformEnum = pgEnum("platform", [
  "mocktweet", // twitter
  "mockbook", // facebook
  "mockgram", // instagram
  "mocktube", // youtube
]);

/** Who authored a piece of content. The Organisation authors the Student's own
 *  posts; fake personas author the seeded community and engagement. */
export const authorKindEnum = pgEnum("author_kind", [
  "organisation",
  "persona",
]);

/** Metrics a Target can be set against (CONTEXT.md: Target). */
export const metricEnum = pgEnum("metric", [
  "followers",
  "likes",
  "shares",
  "reach",
  "comments",
]);

/** A simulation step granularity (CONTEXT.md: Campaign clock / Simulation). */
export const simStepEnum = pgEnum("sim_step", ["day", "week"]);

export const roleEnum = pgEnum("role", ["student", "teacher"]);
