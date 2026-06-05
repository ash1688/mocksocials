/**
 * Derive the five teachable sub-scores (and per-post gate flags) from a post's
 * actual content — the bridge between what a student composes and the validated
 * performanceScore() formula. These mappings ARE the curriculum.
 *
 * Pure and deterministic: no DB, no randomness, no wall-clock.
 */
import { PLATFORM_EXPECTS, type Platform } from "./types";
import type { SubScores, GateFlags } from "./performance-score";

export interface PostContent {
  platform: Platform;
  body: string;
  hasImage: boolean;
  hasVideo: boolean;
  hashtags: string[];
  callToAction: boolean;
  postingDay: number | null; // 0 = Mon .. 6 = Sun
  postingMinute: number | null; // minutes since midnight
  ageDays: number; // campaign-clock days since published (>= 0)
}

export interface DeriveContext {
  keywords: string[]; // campaign keyword terms (lowercased)
  missionTerms: string[]; // tokens from the campaign goal (lowercased)
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function formatScore(c: PostContent): { score: number; wrongFormat: boolean } {
  switch (PLATFORM_EXPECTS[c.platform]) {
    case "image":
      if (c.hasImage) return { score: 1, wrongFormat: false };
      if (c.hasVideo) return { score: 0.85, wrongFormat: false };
      return { score: 0.2, wrongFormat: true };
    case "video":
      if (c.hasVideo) return { score: 1, wrongFormat: false };
      if (c.hasImage) return { score: 0.6, wrongFormat: false };
      return { score: 0.15, wrongFormat: true };
    case "text":
    default:
      if (c.hasImage) return { score: 1, wrongFormat: false };
      if (c.hasVideo) return { score: 0.95, wrongFormat: false };
      return { score: 0.7, wrongFormat: false };
  }
}

function keywordScore(c: PostContent, ctx: DeriveContext): number {
  const haystack = c.body.toLowerCase() + " " + c.hashtags.join(" ").toLowerCase();
  if (ctx.keywords.length === 0) {
    return c.hashtags.length > 0 ? 0.6 : 0.45;
  }
  const matched = ctx.keywords.filter((k) => haystack.includes(k)).length;
  const presence = matched / ctx.keywords.length;
  return clamp01(0.3 + 0.7 * presence);
}

function timingScore(c: PostContent): number {
  if (c.postingDay === null || c.postingMinute === null) return 0.4;
  const hour = c.postingMinute / 60;
  const timeOfDay = Math.exp(-((hour - 18) ** 2) / (2 * 4 ** 2)); // peak 18:00
  const isWeekend = c.postingDay >= 5;
  const dayFactor = isWeekend ? 0.85 : 1;
  return clamp01(0.2 + 0.8 * timeOfDay * dayFactor);
}

function qualityScore(c: PostContent, ctx: DeriveContext): number {
  const len = c.body.trim().length;
  let lengthScore: number;
  if (len < 40) lengthScore = len / 40;
  else if (len <= 200) lengthScore = 1;
  else if (len <= 280) lengthScore = 0.85;
  else lengthScore = 0.65;

  const body = c.body.toLowerCase();
  const onMission =
    ctx.missionTerms.length > 0 &&
    ctx.missionTerms.some((t) => t.length > 3 && body.includes(t));

  return clamp01(
    0.25 + 0.45 * lengthScore + (c.callToAction ? 0.15 : 0) + (onMission ? 0.15 : 0),
  );
}

function freshnessScore(c: PostContent): number {
  const age = Math.max(0, c.ageDays);
  return clamp01(0.2 + 0.8 * Math.exp(-age / 10));
}

export interface Derived {
  subScores: SubScores;
  gates: GateFlags; // per-post gates only (wrongFormat, hashtagSpam)
}

export function deriveSubScores(c: PostContent, ctx: DeriveContext): Derived {
  const fmt = formatScore(c);
  return {
    subScores: {
      format: fmt.score,
      keywords: keywordScore(c, ctx),
      timing: timingScore(c),
      quality: qualityScore(c, ctx),
      freshness: freshnessScore(c),
    },
    gates: {
      wrongFormat: fmt.wrongFormat,
      hashtagSpam: c.hashtags.length > 8,
    },
  };
}

/** Tokenise the campaign goal into lowercased content words for on-mission cue. */
export function missionTerms(mission: string | null): string[] {
  if (!mission) return [];
  return mission
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3);
}
