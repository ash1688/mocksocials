import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { ScenarioPlayer } from "@/components/scenario/scenario-player";
import { RED_BULL_SCENARIO } from "@/lib/scenario/red-bull";

// Scenario POC — a fixed documentary that plays into a clean MockTweet-style
// feed (no seeded content). Authored beats, revealed step-by-step.
export default async function ScenarioPage() {
  const me = await requireUser();
  return (
    <>
      <AppChrome user={me} />
      <ScenarioPlayer scenario={RED_BULL_SCENARIO} />
    </>
  );
}
