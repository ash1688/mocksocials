import type { Platform } from "@/lib/simulation/types";

/**
 * Fixed scenario start for the Campaign clock (CONTEXT.md: Campaign clock).
 * A fixed date — not the real "today" — keeps simulations reproducible and
 * screenshots consistent across students (ADR-0001: never derive from real
 * wall-clock time).
 */
export const SCENARIO_START_DATE = "2025-09-01";

export const PLATFORM_LABELS: Record<Platform, string> = {
  mocktweet: "MockTweet",
  mockbook: "MockBook",
  mockgram: "MockGram",
  mocktube: "MockTube",
};

export const METRICS = [
  "followers",
  "likes",
  "shares",
  "reach",
  "comments",
] as const;

export type Metric = (typeof METRICS)[number];

export const METRIC_LABELS: Record<Metric, string> = {
  followers: "Followers",
  likes: "Likes",
  shares: "Shares",
  reach: "Reach",
  comments: "Comments",
};
