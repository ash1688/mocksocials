import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { ScenarioPlayer } from "@/components/scenario/scenario-player";
import { RED_BULL_SCENARIO, toClientTasks } from "@/lib/scenario/red-bull";
import { getMyScenarioResponses } from "@/lib/scenario/queries";

// Scenario POC — a fixed documentary that plays into a clean MockTweet-style
// feed (no seeded content). Authored beats, revealed step-by-step, ending in an
// authored Tasks step (Q&A) whose answers are revealed only after submission.
export default async function ScenarioPage() {
  const me = await requireUser();
  // Strip authored MCQ answers before handing the scenario to the client.
  const { tasks, ...scenario } = RED_BULL_SCENARIO;
  // The student's own prior answers + any teacher feedback, to pre-fill the panel.
  const prior = await getMyScenarioResponses(me.id, RED_BULL_SCENARIO.id);
  return (
    <>
      <AppChrome user={me} />
      <ScenarioPlayer
        scenario={scenario}
        scenarioId={RED_BULL_SCENARIO.id}
        tasks={tasks ? toClientTasks(tasks) : []}
        prior={prior}
      />
    </>
  );
}
