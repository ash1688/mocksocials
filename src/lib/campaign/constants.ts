import type { Platform } from "@/lib/stats";

/**
 * Fixed scenario start for the Campaign clock. A fixed date (not real "today")
 * keeps simulations reproducible and screenshots consistent (ADR-0001).
 */
export const SCENARIO_START_DATE = "2025-09-01";

/** The faithful platform keys (shared with the rest of the app). */
export const PLATFORMS: Platform[] = [
  "twitter",
  "facebook",
  "instagram",
  "youtube",
];

export const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: "MockTweet",
  facebook: "MockBook",
  instagram: "MockGram",
  youtube: "MockTube",
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

export function isPlatform(v: string): v is Platform {
  return (PLATFORMS as string[]).includes(v);
}
export function isMetric(v: string): v is Metric {
  return (METRICS as readonly string[]).includes(v);
}
