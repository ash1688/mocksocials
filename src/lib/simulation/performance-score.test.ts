import { describe, it, expect } from "vitest";

import {
  performanceScore,
  projectReach,
  PLATFORM_BASELINE,
  REACH_FLOOR,
  type SubScores,
} from "./performance-score";

const STRONG: SubScores = {
  format: 0.95,
  keywords: 0.9,
  timing: 0.95,
  quality: 0.95,
  freshness: 0.9,
};

const MEDIOCRE: SubScores = {
  format: 0.6,
  keywords: 0.6,
  timing: 0.6,
  quality: 0.6,
  freshness: 0.6,
};

describe("performanceScore (ADR-0001 validated shape)", () => {
  it("is deterministic for identical inputs", () => {
    const a = performanceScore(STRONG);
    const b = performanceScore(STRONG);
    expect(a.score).toBe(b.score);
  });

  it("a strong post clearly outperforms a mediocre one", () => {
    expect(performanceScore(STRONG).score).toBeGreaterThan(
      performanceScore(MEDIOCRE).score,
    );
  });

  it("geometric mean punishes one broken factor harder than a weighted sum would", () => {
    // A single zero-ish factor must drag the post well below the mediocre baseline,
    // not just cost its own weight (the text-only-YouTube failure in ADR-0001).
    const oneBroken: SubScores = { ...STRONG, format: 0.02 };
    const result = performanceScore(oneBroken);
    expect(result.score).toBeLessThan(performanceScore(MEDIOCRE).score);
  });

  it("timing and quality are weighted more heavily than format/freshness", () => {
    const base = performanceScore(MEDIOCRE).score;
    const betterTiming = performanceScore({ ...MEDIOCRE, timing: 0.95 }).score;
    const betterFormat = performanceScore({ ...MEDIOCRE, format: 0.95 }).score;
    expect(betterTiming - base).toBeGreaterThan(betterFormat - base);
  });

  describe("gate penalties (the teachable cliffs)", () => {
    it("wrong-format gate slashes the score below its ungated value", () => {
      const ungated = performanceScore(STRONG).score;
      const gated = performanceScore(STRONG, { wrongFormat: true }).score;
      expect(gated).toBeCloseTo(ungated * 0.55, 5);
    });

    it("stacks multiple gates multiplicatively", () => {
      const r = performanceScore(STRONG, {
        wrongFormat: true,
        hashtagSpam: true,
      });
      expect(r.gateMultiplier).toBeCloseTo(0.55 * 0.6, 5);
    });

    it("no gates means a multiplier of 1", () => {
      expect(performanceScore(STRONG).gateMultiplier).toBe(1);
    });
  });
});

describe("projectReach (ADR-0001: low floor, steep slope, within-platform)", () => {
  it("is deterministic given the same seed parts", () => {
    const a = projectReach(0.8, PLATFORM_BASELINE.mocktweet, ["post-1", "c-1"]);
    const b = projectReach(0.8, PLATFORM_BASELINE.mocktweet, ["post-1", "c-1"]);
    expect(a).toBe(b);
  });

  it("a near-zero score still earns a small floor of reach, not zero", () => {
    const reach = projectReach(0, PLATFORM_BASELINE.mockbook, ["p", "c"]);
    // Around the floor fraction of the baseline, allowing for jitter.
    expect(reach).toBeGreaterThan(0);
    expect(reach).toBeLessThan(REACH_FLOOR * 1.3 * PLATFORM_BASELINE.mockbook);
  });

  it("higher scores earn more reach on the same platform", () => {
    const lo = projectReach(0.3, PLATFORM_BASELINE.mockgram, ["p", "c"]);
    const hi = projectReach(0.9, PLATFORM_BASELINE.mockgram, ["p", "c"]);
    expect(hi).toBeGreaterThan(lo);
  });
});
