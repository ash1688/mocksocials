import { hashSeed } from "@/lib/simulation/rng";

import { listScenarios, type ScenarioMeta } from "./registry";

/**
 * Deterministically pick `count` scenarios for a given user. The choice is
 * stable (same set every visit) but varies per user — derived from a seeded
 * hash of (userId, scenarioId), in the spirit of ADR-0001. The class-demo
 * scenario is excluded so a person's picks never duplicate it.
 */
export function pickForUser(
  userId: number,
  count: number,
  excludeId?: string | null,
): ScenarioMeta[] {
  const pool = listScenarios().filter((s) => s.id !== excludeId);
  return [...pool]
    .sort((a, b) => hashSeed(userId, a.id) - hashSeed(userId, b.id))
    .slice(0, count);
}
