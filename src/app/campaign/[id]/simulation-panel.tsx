import { simulateStep, resetSimulation } from "@/lib/simulation/actions";
import { PLATFORM_LABELS, METRIC_LABELS, METRICS } from "@/lib/campaign/constants";
import type { Platform } from "@/lib/simulation/types";
import type { SimSummary } from "@/lib/analytics/queries";
import { Button } from "@/components/ui/button";

export function SimulationPanel({
  campaignId,
  isActive,
  clock,
  summary,
  revealScore = false,
}: {
  campaignId: string;
  isActive: boolean;
  clock: string;
  summary: SimSummary;
  // Teacher-only: reveal the numeric performance score (ADR-0001). Students
  // see hint chips + analytics outcomes only.
  revealScore?: boolean;
}) {
  // Group post results by platform — reach is not comparable across platforms
  // (ADR-0001), so Students compare within a platform.
  const resultsByPlatform = new Map<Platform, SimSummary["postResults"]>();
  for (const r of summary.postResults) {
    const list = resultsByPlatform.get(r.platform) ?? [];
    list.push(r);
    resultsByPlatform.set(r.platform, list);
  }
  // Group latest snapshot values by platform for a compact metric grid.
  const byPlatform = new Map<Platform, Record<string, number>>();
  for (const s of summary.snapshots) {
    const row = byPlatform.get(s.platform) ?? {};
    row[s.metric] = s.value;
    byPlatform.set(s.platform, row);
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-semibold">Simulation</h2>
          <p className="text-sm text-muted-foreground">
            Campaign clock: <span className="font-medium">{clock}</span> ·{" "}
            {summary.simCount} run{summary.simCount === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-2">
          {isActive ? (
            <>
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
            </>
          ) : (
            <p className="self-center text-xs text-muted-foreground">
              Make this the active campaign to simulate.
            </p>
          )}
          {summary.simCount > 0 ? (
            <form action={resetSimulation}>
              <input type="hidden" name="campaignId" value={campaignId} />
              <Button type="submit" size="sm" variant="outline">
                Reset
              </Button>
            </form>
          ) : null}
        </div>
      </div>

      {summary.simCount === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          No simulations yet. Publish content, then simulate to see engagement and
          search rankings accrue.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Per-platform cumulative metrics */}
          <div className="grid gap-3 sm:grid-cols-2">
            {[...byPlatform.entries()].map(([platform, row]) => (
              <div key={platform} className="rounded-lg border p-4">
                <h3 className="text-sm font-semibold">
                  {PLATFORM_LABELS[platform]}
                </h3>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  {METRICS.map((m) => (
                    <div key={m}>
                      <dt className="text-xs text-muted-foreground">
                        {METRIC_LABELS[m]}
                      </dt>
                      <dd className="font-medium">
                        {(row[m] ?? 0).toLocaleString()}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Per-post performance, grouped within platform (C.P6: review which
              posts performed best). Students get hint chips + analytics; the
              numeric score is teacher-only (revealScore). */}
          {summary.postResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Post performance</h3>
              {[...resultsByPlatform.entries()].map(([platform, results]) => (
                <div key={platform}>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    {PLATFORM_LABELS[platform]}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {results.map((p) => (
                      <li
                        key={p.postId}
                        className="rounded-md border px-3 py-2 text-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex-1 truncate text-muted-foreground">
                            {p.body}
                          </span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {p.reach.toLocaleString()} reach · {p.likes} likes ·{" "}
                            {p.shares} shares
                            {revealScore ? (
                              <span className="ml-2 font-semibold text-foreground">
                                score {Math.round(p.score * 100)}%
                              </span>
                            ) : null}
                          </span>
                        </div>
                        {p.hints.length > 0 ? (
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {p.hints.map((h, i) => (
                              <span
                                key={i}
                                className={
                                  "rounded-full px-2 py-0.5 text-xs " +
                                  (h.tone === "good"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300")
                                }
                              >
                                {h.label}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {/* Search rankings (C.P7) */}
          {summary.rankings.length > 0 ? (
            <div>
              <h3 className="mb-2 text-sm font-semibold">Search rankings</h3>
              <ul className="flex flex-wrap gap-2 text-sm">
                {summary.rankings.map((r) => (
                  <li
                    key={r.term}
                    className="rounded-full border px-3 py-1"
                    title="Position on the mock search results page"
                  >
                    #{r.term}:{" "}
                    <span className="font-medium">rank {r.position}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
