import Link from "next/link";
import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaignSetup } from "@/lib/campaign/queries";
import {
  activateCampaign,
  toggleActivePlatform,
  addKeyword,
  removeKeyword,
  addTarget,
  removeTarget,
} from "@/lib/campaign/actions";
import {
  PLATFORM_LABELS,
  METRICS,
  METRIC_LABELS,
} from "@/lib/campaign/constants";
import { PLATFORMS } from "@/lib/simulation/types";
import { getSimSummary } from "@/lib/analytics/queries";
import { Button } from "@/components/ui/button";
import { SimulationPanel } from "./simulation-panel";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace } = await requireStudentWorkspace();
  const setup = await getCampaignSetup(id, workspace.id);
  if (!setup) notFound();

  const { campaign, platforms, keywords, targets } = setup;
  const activeSet = new Set(platforms);
  const simSummary = await getSimSummary(campaign.id);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-10">
      <header className="flex items-start justify-between">
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            {campaign.name}
          </h1>
          {campaign.goal ? (
            <p className="text-sm text-muted-foreground">{campaign.goal}</p>
          ) : null}
          <p className="mt-1 text-xs text-muted-foreground">
            Campaign clock starts {campaign.startDate}
          </p>
        </div>
        {campaign.isActive ? (
          <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
            Active campaign
          </span>
        ) : (
          <form action={activateCampaign}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <Button type="submit" variant="secondary">
              Make active
            </Button>
          </form>
        )}
      </header>

      {/* Active platforms (CONTEXT.md: Active platform) */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold">Active platforms</h2>
          <p className="text-sm text-muted-foreground">
            Enable the platforms suited to the charity&rsquo;s audience.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => {
            const on = activeSet.has(p);
            return (
              <form key={p} action={toggleActivePlatform}>
                <input type="hidden" name="campaignId" value={campaign.id} />
                <input type="hidden" name="platform" value={p} />
                <Button type="submit" variant={on ? "default" : "outline"}>
                  {on ? "✓ " : ""}
                  {PLATFORM_LABELS[p]}
                </Button>
              </form>
            );
          })}
        </div>
        {platforms.length > 0 ? (
          <p className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted-foreground">Open render:</span>
            {platforms.map((p) => (
              <Link
                key={p}
                href={`/campaign/${campaign.id}/${p}`}
                className="text-platform underline-offset-4 hover:underline"
              >
                {PLATFORM_LABELS[p]} →
              </Link>
            ))}
          </p>
        ) : null}
      </section>

      {/* Keyword strategy (CONTEXT.md: Keyword strategy) */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold">Keyword strategy</h2>
          <p className="text-sm text-muted-foreground">
            Keywords/hashtags used on-platform and for the search-ranking
            simulation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.length === 0 ? (
            <p className="text-sm text-muted-foreground">No keywords yet.</p>
          ) : (
            keywords.map((k) => (
              <form key={k.id} action={removeKeyword}>
                <input type="hidden" name="campaignId" value={campaign.id} />
                <input type="hidden" name="keywordId" value={k.id} />
                <button
                  type="submit"
                  title="Remove"
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm hover:bg-accent"
                >
                  #{k.term} <span className="text-muted-foreground">×</span>
                </button>
              </form>
            ))
          )}
        </div>
        <form action={addKeyword} className="flex gap-2">
          <input type="hidden" name="campaignId" value={campaign.id} />
          <input
            name="term"
            required
            placeholder="add a keyword"
            className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm"
          />
          <Button type="submit" variant="secondary">
            Add
          </Button>
        </form>
      </section>

      {/* Targets (CONTEXT.md: Target) */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold">Targets</h2>
          <p className="text-sm text-muted-foreground">
            Success criteria you set. Actuals come from the simulation, not typed
            in.
          </p>
        </div>
        {targets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No targets yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {targets.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-md border px-4 py-2 text-sm"
              >
                <span>
                  {METRIC_LABELS[t.metric as (typeof METRICS)[number]]}:{" "}
                  <span className="font-medium">
                    {t.targetValue.toLocaleString()}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    {t.platform ? PLATFORM_LABELS[t.platform] : "overall"}
                  </span>
                </span>
                <form action={removeTarget}>
                  <input type="hidden" name="campaignId" value={campaign.id} />
                  <input type="hidden" name="targetId" value={t.id} />
                  <button
                    type="submit"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
        <form action={addTarget} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="campaignId" value={campaign.id} />
          <select
            name="metric"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            {METRICS.map((m) => (
              <option key={m} value={m}>
                {METRIC_LABELS[m]}
              </option>
            ))}
          </select>
          <select
            name="platform"
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="">Overall</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
          <input
            name="targetValue"
            type="number"
            min="1"
            required
            placeholder="value"
            className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
          />
          <Button type="submit" variant="secondary">
            Add target
          </Button>
        </form>
      </section>

      <SimulationPanel
        campaignId={campaign.id}
        isActive={campaign.isActive}
        clock={campaign.clock}
        simCount={simSummary.simCount}
      />
    </main>
  );
}
