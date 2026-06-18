import { RED_BULL_SCENARIO } from "./red-bull";
import { DOMINOS_SCENARIO } from "./dominos";
import { RONALDO_SCENARIO } from "./ronaldo";
import { ZOUMA_SCENARIO } from "./zouma";
import { VETTEL_SCENARIO } from "./vettel";
import { SACHSGATE_SCENARIO } from "./sachsgate";
import { NASTY_NICK_SCENARIO } from "./nasty-nick";
import { RAGHUNATHAN_SCENARIO } from "./raghunathan";
import { SOUTHPARK_SCENARIO } from "./southpark";
import { SAKA_SCENARIO } from "./saka";
import { TAA_RATA_SCENARIO } from "./taa-rata";
import { BALE_SCENARIO } from "./bale";
import { BEEHOTELS_SCENARIO } from "./beehotels";
import { BK_IWD_SCENARIO } from "./bk-iwd";
import { GREGGS_SCENARIO } from "./greggs";
import { MCDSTORIES_SCENARIO } from "./mcdstories";
import { PEPSI_SCENARIO } from "./pepsi";
import { DIGIORNO_SCENARIO } from "./digiorno";
import { SNICKERS_SCENARIO } from "./snickers";
import { FREECUTHBERT_SCENARIO } from "./freecuthbert";
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
  [NASTY_NICK_SCENARIO.id]: NASTY_NICK_SCENARIO,
  [RAGHUNATHAN_SCENARIO.id]: RAGHUNATHAN_SCENARIO,
  [SOUTHPARK_SCENARIO.id]: SOUTHPARK_SCENARIO,
  [SAKA_SCENARIO.id]: SAKA_SCENARIO,
  [TAA_RATA_SCENARIO.id]: TAA_RATA_SCENARIO,
  [BALE_SCENARIO.id]: BALE_SCENARIO,
  [BEEHOTELS_SCENARIO.id]: BEEHOTELS_SCENARIO,
  [BK_IWD_SCENARIO.id]: BK_IWD_SCENARIO,
  [GREGGS_SCENARIO.id]: GREGGS_SCENARIO,
  [MCDSTORIES_SCENARIO.id]: MCDSTORIES_SCENARIO,
  [PEPSI_SCENARIO.id]: PEPSI_SCENARIO,
  [DIGIORNO_SCENARIO.id]: DIGIORNO_SCENARIO,
  [SNICKERS_SCENARIO.id]: SNICKERS_SCENARIO,
  [FREECUTHBERT_SCENARIO.id]: FREECUTHBERT_SCENARIO,
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
