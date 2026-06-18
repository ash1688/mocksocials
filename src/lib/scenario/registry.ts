import { RED_BULL_SCENARIO } from "./red-bull";
import type { Scenario, ScenarioTask } from "./red-bull";

// All authored scenarios, keyed by id. Future ports register here so both the
// grading action and the teacher review view can resolve authored task data
// (prompts, option labels, correct answers) server-side from a stored id.
export const SCENARIOS: Record<string, Scenario> = {
  [RED_BULL_SCENARIO.id]: RED_BULL_SCENARIO,
};

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS[id];
}

export function getTask(
  scenarioId: string,
  taskId: string,
): ScenarioTask | undefined {
  return SCENARIOS[scenarioId]?.tasks?.find((t) => t.id === taskId);
}
