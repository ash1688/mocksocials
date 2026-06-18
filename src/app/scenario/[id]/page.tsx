import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { ScenarioPlayer } from "@/components/scenario/scenario-player";
import { getScenario } from "@/lib/scenario/registry";
import { toClientTasks } from "@/lib/scenario/red-bull";
import { getMyScenarioResponses } from "@/lib/scenario/queries";

// Play a specific authored scenario. Authored beats, revealed step-by-step,
// ending in the Tasks step (Q&A) whose answers are revealed only on submit.
export default async function ScenarioPlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const full = getScenario(id);
  if (!full) notFound();

  // Strip authored MCQ answers before handing the scenario to the client.
  const { tasks, ...scenario } = full;
  const prior = await getMyScenarioResponses(me.id, id);

  return (
    <>
      <AppChrome user={me} />
      <ScenarioPlayer
        scenario={scenario}
        scenarioId={id}
        tasks={tasks ? toClientTasks(tasks) : []}
        prior={prior}
      />
    </>
  );
}
