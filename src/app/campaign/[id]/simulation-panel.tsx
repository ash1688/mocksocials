import Link from "next/link";

import { simulateStep, resetSimulation } from "@/lib/simulation/actions";
import { Button } from "@/components/ui/button";

/**
 * Simulate controls for a campaign. Engagement + analytics now live on the
 * platform renders and the workspace analysis dashboard (ADR-0005); this panel
 * is just the optimise-loop engine controls: advance the clock, or reset.
 */
export function SimulationPanel({
  campaignId,
  isActive,
  clock,
  simCount,
}: {
  campaignId: string;
  isActive: boolean;
  clock: string;
  simCount: number;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border p-5">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-semibold">Simulation</h2>
          <p className="text-sm text-muted-foreground">
            Campaign clock: <span className="font-medium">{clock}</span> ·{" "}
            {simCount} run{simCount === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href={`/analytics?campaign=${campaignId}`}
          className="text-sm text-platform underline-offset-4 hover:underline"
        >
          View analysis →
        </Link>
      </div>

      {isActive ? (
        <div className="flex flex-wrap gap-2">
          <form action={simulateStep}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="step" value="day" />
            <Button type="submit" size="sm">
              Simulate a day
            </Button>
          </form>
          <form action={simulateStep}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="step" value="week" />
            <Button type="submit" size="sm" variant="secondary">
              Simulate a week
            </Button>
          </form>
          {simCount > 0 ? (
            <form action={resetSimulation}>
              <input type="hidden" name="campaignId" value={campaignId} />
              <Button type="submit" size="sm" variant="outline">
                Reset
              </Button>
            </form>
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Make this the active campaign to simulate.
        </p>
      )}
    </section>
  );
}
