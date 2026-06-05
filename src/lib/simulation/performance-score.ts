/**
 * Performance score — the per-post weighted score the Simulation computes from
 * teachable levers (CONTEXT.md: Performance score). The weighting *is* the
 * curriculum (ADR-0001). Validated model shape:
 *   1. Aggregate the five sub-scores as a WEIGHTED GEOMETRIC MEAN (a sum is too
 *      forgiving — a broken post still scored ~0.86).
 *   2. Layer explicit GATE PENALTY multipliers for category-broken posts.
 *   3. Project reach with a LOW FLOOR and a STEEP slope.
 */

import { jitter } from "./rng";
import type { Platform } from "./types";

/** The five teachable sub-scores, each normalised to [0, 1]. */
export interface SubScores {
  format: number;
  keywords: number;
  timing: number;
  quality: number;
  freshness: number;
}

/** Geometric-mean weights — must sum to 1. Timing and quality weighted most. */
export const SUBSCORE_WEIGHTS: Record<keyof SubScores, number> = {
  format: 0.15,
  keywords: 0.15,
  timing: 0.3,
  quality: 0.3,
  freshness: 0.1,
};

/** Gate penalty multipliers — the teachable cliffs (ADR-0001 validated). */
export const GATE_PENALTIES = {
  wrongFormat: 0.55,
  hashtagSpam: 0.6,
  postingFatigue: 0.7,
  ghosting: 0.5,
} as const;

export const REACH_FLOOR = 0.08;
export const REACH_EXPONENT = 2.2;
export const GHOSTING_DECAY_PER_DAY = 0.02;

export interface GateFlags {
  wrongFormat?: boolean;
  hashtagSpam?: boolean;
  postingFatigue?: boolean;
  ghosting?: boolean;
}

export interface ScoreResult {
  score: number;
  base: number;
  gateMultiplier: number;
  subScores: SubScores;
  gates: GateFlags;
}

/** Weighted geometric mean: exp(Σ w_i · ln(x_i)). Inputs clamped off zero. */
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
  return { score: base * gateMultiplier, base, gateMultiplier, subScores, gates };
}

/** Project reach from a score + the platform baseline. Reach is NOT comparable
 *  across platforms (ADR-0001). Seeded jitter keeps it organic but reproducible. */
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
  twitter: 1200,
  facebook: 2000,
  instagram: 1600,
  youtube: 800,
};
