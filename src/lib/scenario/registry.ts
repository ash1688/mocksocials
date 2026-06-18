import { RED_BULL_SCENARIO } from "./red-bull";
import { DOMINOS_SCENARIO } from "./dominos";
import { RONALDO_SCENARIO } from "./ronaldo";
import { ZOUMA_SCENARIO } from "./zouma";
import { VETTEL_SCENARIO } from "./vettel";
import { SACHSGATE_SCENARIO } from "./sachsgate";
import type { Scenario, ScenarioTask } from "./red-bull";

// All authored scenarios, keyed by id. Future ports register here so both the
// grading action and the teacher review view can resolve authored task data
// (prompts, option labels, correct answers) server-side from a stored id.
export const SCENARIOS: Record<string, Scenario> = {
  [RED_BULL_SCENARIO.id]: RED_BULL_SCENARIO,
  [DOMINOS_SCENARIO.id]: DOMINOS_SCENARIO,
  [RONALDO_SCENARIO.id]: RONALDO_SCENARIO,
  [ZOUMA_SCENARIO.id]: ZOUMA_SCENARIO,
  [VETTEL_SCENARIO.id]: VETTEL_SCENARIO,
  [SACHSGATE_SCENARIO.id]: SACHSGATE_SCENARIO,
};

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS[id];
}

export interface ScenarioMeta {
  id: string;
  title: string;
  badge: string;
  taskCount: number;
}

/** Lightweight list of all registered scenarios (no beats) for index/admin lists. */
export function listScenarios(): ScenarioMeta[] {
  return Object.values(SCENARIOS).map((s) => ({
    id: s.id,
    title: s.title,
    badge: s.badge,
    taskCount: s.tasks?.length ?? 0,
  }));
}

export function getTask(
  scenarioId: string,
  taskId: string,
): ScenarioTask | undefined {
  return SCENARIOS[scenarioId]?.tasks?.find((t) => t.id === taskId);
}
