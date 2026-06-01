/**
 * Performance score — the per-post weighted score the Simulation computes from
 * teachable levers (CONTEXT.md: Performance score). The weighting *is* the
 * curriculum (ADR-0001), so changing these constants changes what the unit
 * rewards. Keep them tunable and in one place.
 *
 * Validated model shape (ADR-0001 prototype, 2026-06-01):
 *   1. Aggregate the five sub-scores as a WEIGHTED GEOMETRIC MEAN (not a sum —
 *      a sum is too forgiving; a broken post still scored ~0.86).
 *   2. Layer explicit GATE PENALTY multipliers for category-broken posts — the
 *      teachable cliffs the mean alone won't express.
 *   3. Project reach with a LOW FLOOR and a STEEP slope, or weak posts still
 *      look successful in the evidence students screenshot.
 *
 * Exact weights, gate multipliers and baselines remain tunable (ADR-0001).
 * NOTE: this is a scaffold port — re-validate against the prototype before use.
 */

import { jitter } from "./rng";
import type { Platform } from "./types";

/** The five teachable sub-scores, each normalised to [0, 1]. */
export interface SubScores {
  format: number; // format / rich media suited to the platform
  keywords: number; // keyword & hashtag use
  timing: number; // posting day/time & frequency
  quality: number; // length, call-to-action, on-mission cues
  freshness: number; // recency relative to the campaign clock
}

/** Geometric-mean weights — must sum to 1. Timing/frequency and quality cues are
 *  weighted more heavily (CONTEXT.md). */
export const SUBSCORE_WEIGHTS: Record<keyof SubScores, number> = {
  format: 0.15,
  keywords: 0.15,
  timing: 0.3,
  quality: 0.3,
  freshness: 0.1,
};

/** Gate penalty multipliers — the teachable cliffs (ADR-0001 validated values). */
export const GATE_PENALTIES = {
  wrongFormat: 0.55, // wrong format for the platform (e.g. text-only MockTube)
  hashtagSpam: 0.6, // > 8 hashtags
  postingFatigue: 0.7, // > 10 posts/week on a platform
  ghosting: 0.5, // 0 posts/week — applied at platform level
} as const;

/** Reach projection shape (ADR-0001: low floor, steep slope). */
export const REACH_FLOOR = 0.08;
export const REACH_EXPONENT = 2.2; // steepness

export interface GateFlags {
  wrongFormat?: boolean;
  hashtagSpam?: boolean;
  postingFatigue?: boolean;
  ghosting?: boolean;
}

export interface ScoreResult {
  score: number; // final performance score in [0, 1]
  base: number; // geometric mean before gates
  gateMultiplier: number; // product of applied gate penalties
  subScores: SubScores;
  gates: GateFlags;
}

/** Weighted geometric mean: exp(Σ w_i · ln(x_i)). Clamps inputs off zero so a
 *  single zero factor doesn't annihilate the whole product. */
function weightedGeometricMean(s: SubScores): number {
  let acc = 0;
  for (const key of Object.keys(SUBSCORE_WEIGHTS) as (keyof SubScores)[]) {
    const x = Math.max(s[key], 1e-3);
    acc += SUBSCORE_WEIGHTS[key] * Math.log(x);
  }
  return Math.exp(acc);
}

/** Compute the performance score for a post. Pure and deterministic. */
export function performanceScore(
  subScores: SubScores,
  gates: GateFlags = {},
): ScoreResult {
  const base = weightedGeometricMean(subScores);

  let gateMultiplier = 1;
  if (gates.wrongFormat) gateMultiplier *= GATE_PENALTIES.wrongFormat;
  if (gates.hashtagSpam) gateMultiplier *= GATE_PENALTIES.hashtagSpam;
  if (gates.postingFatigue) gateMultiplier *= GATE_PENALTIES.postingFatigue;
  if (gates.ghosting) gateMultiplier *= GATE_PENALTIES.ghosting;

  return {
    score: base * gateMultiplier,
    base,
    gateMultiplier,
    subScores,
    gates,
  };
}

/**
 * Project reach from a performance score and the platform's baseline audience.
 * Reach is NOT comparable across platforms (ADR-0001) — students compare within
 * a platform. Seeded noise (jitter) keeps it organic but reproducible.
 */
export function projectReach(
  score: number,
  baselineAudience: number,
  seedParts: (string | number)[],
): number {
  const shaped = REACH_FLOOR + (1 - REACH_FLOOR) * Math.pow(score, REACH_EXPONENT);
  const noisy = shaped * jitter(0.12, ...seedParts);
  return Math.max(0, Math.round(baselineAudience * noisy));
}

/** Platform baseline audiences (tunable; used only for within-platform reach). */
export const PLATFORM_BASELINE: Record<Platform, number> = {
  mocktweet: 1200,
  mockbook: 2000,
  mockgram: 1600,
  mocktube: 800,
};
