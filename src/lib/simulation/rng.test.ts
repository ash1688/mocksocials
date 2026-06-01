import { describe, it, expect } from "vitest";

import { hashSeed, seededRandom, jitter } from "./rng";

describe("seeded RNG (ADR-0001: noise from stable inputs, never wall-clock)", () => {
  it("hashSeed is deterministic for the same parts", () => {
    expect(hashSeed("post-1", "campaign-9")).toBe(hashSeed("post-1", "campaign-9"));
  });

  it("hashSeed differs when inputs differ", () => {
    expect(hashSeed("post-1", "campaign-9")).not.toBe(
      hashSeed("post-2", "campaign-9"),
    );
  });

  it("seededRandom yields the same sequence for the same seed", () => {
    const a = seededRandom(12345);
    const b = seededRandom(12345);
    const seqA = [a(), a(), a()];
    const seqB = [b(), b(), b()];
    expect(seqA).toEqual(seqB);
  });

  it("seededRandom stays within [0, 1)", () => {
    const r = seededRandom(hashSeed("x"));
    for (let i = 0; i < 1000; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("jitter is reproducible and centred near 1.0", () => {
    const j1 = jitter(0.12, "post-1", "campaign-9");
    const j2 = jitter(0.12, "post-1", "campaign-9");
    expect(j1).toBe(j2);
    expect(j1).toBeGreaterThan(1 - 0.12);
    expect(j1).toBeLessThan(1 + 0.12);
  });
});
