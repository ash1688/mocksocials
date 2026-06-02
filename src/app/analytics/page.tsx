import Link from "next/link";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { listCampaigns } from "@/lib/campaign/queries";
import {
  getCampaignDashboard,
  getKeywordRankings,
} from "@/lib/analytics/queries";
import {
  PLATFORM_LABELS,
  METRIC_LABELS,
  METRICS,
} from "@/lib/campaign/constants";

function TargetBar({
  actual,
  target,
}: {
  actual: number;
  target: number;
}) {
  const pct = target > 0 ? Math.min(100, Math.round((actual / target) * 100)) : 0;
  const met = actual >= target;
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">
          {actual.toLocaleString()} / {target.toLocaleString()}
        </span>
        <span className={met ? "text-emerald-600" : "text-muted-foreground"}>
          {pct}%{met ? " ✓" : ""}
        </span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={"h-full " + (met ? "bg-emerald-500" : "bg-[hsl(var(--platform))]")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ campaign?: string }>;
}) {
  const { campaign: campaignParam } = await searchParams;
  const { account, workspace } = await requireStudentWorkspace();
  const campaigns = await listCampaigns(workspace.id);

  const active = campaigns.find((c) => c.isActive) ?? null;
  const previous = campaigns.find((c) => !c.isActive) ?? null;

  const selected =
    campaigns.find((c) => c.id === campaignParam) ?? active ?? previous ?? null;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
            ← Dashboard
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Actual-vs-target progress, {account.displayName}.
          </p>
        </div>
      </header>

      {/* Current / Previous tabs (ADR-0005) */}
      <nav className="flex gap-2 border-b">
        {[
          { label: "Current", c: active },
          { label: "Previous", c: previous },
        ].map(({ label, c }) =>
          c ? (
            <Link
              key={label}
              href={`/analytics?campaign=${c.id}`}
              className={
                "border-b-2 px-3 py-2 text-sm " +
                (selected?.id === c.id
                  ? "border-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground")
              }
            >
              {label}: {c.name}
            </Link>
          ) : (
            <span key={label} className="px-3 py-2 text-sm text-muted-foreground/50">
              {label}: —
            </span>
          ),
        )}
      </nav>

      {!selected ? (
        <p className="text-sm text-muted-foreground">No campaigns yet.</p>
      ) : (
        <DashboardBody campaignId={selected.id} />
      )}
    </main>
  );
}

async function DashboardBody({ campaignId }: { campaignId: string }) {
  const [data, ranks] = await Promise.all([
    getCampaignDashboard(campaignId),
    getKeywordRankings(campaignId),
  ]);

  if (data.simCount === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        No simulations yet for this campaign. Publish content and simulate to see
        progress.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Targets */}
      <section>
        <h2 className="mb-3 font-semibold">Targets</h2>
        {data.targets.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No targets set. Add some on the campaign page.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {data.targets.map((t, i) => (
              <li key={i}>
                <p className="mb-1 text-sm">
                  {METRIC_LABELS[t.metric]}{" "}
                  <span className="text-muted-foreground">
                    · {t.platform ? PLATFORM_LABELS[t.platform] : "overall"}
                  </span>
                </p>
                <TargetBar actual={t.actual} target={t.targetValue} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Per-platform totals */}
      <section>
        <h2 className="mb-3 font-semibold">By platform</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Platform</th>
                {METRICS.map((m) => (
                  <th key={m} className="px-2 py-2 text-right font-medium">
                    {METRIC_LABELS[m]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.platformTotals.map((row) => (
                <tr key={row.platform} className="border-b">
                  <td className="py-2 pr-4 font-medium">
                    {PLATFORM_LABELS[row.platform]}
                  </td>
                  {METRICS.map((m) => (
                    <td key={m} className="px-2 py-2 text-right">
                      {row.metrics[m].toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 pr-4">Overall</td>
                {METRICS.map((m) => (
                  <td key={m} className="px-2 py-2 text-right">
                    {data.overall[m].toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Search rankings (C.P7) */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Search rankings</h2>
          <Link
            href={`/campaign/${campaignId}/search`}
            className="text-sm text-platform underline-offset-4 hover:underline"
          >
            Open mock search →
          </Link>
        </div>
        {ranks.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tracked keywords, or no simulations yet.
          </p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Keyword</th>
                <th className="px-2 py-2 text-right font-medium">Rank</th>
                <th className="px-2 py-2 text-right font-medium">Best</th>
                <th className="px-2 py-2 text-right font-medium">Movement</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((r) => {
                const move = r.first - r.current; // + = climbed
                return (
                  <tr key={r.term} className="border-b">
                    <td className="py-2 pr-4">#{r.term}</td>
                    <td className="px-2 py-2 text-right font-medium">{r.current}</td>
                    <td className="px-2 py-2 text-right text-muted-foreground">
                      {r.best}
                    </td>
                    <td className="px-2 py-2 text-right">
                      {move > 0 ? (
                        <span className="text-emerald-600">▲ {move}</span>
                      ) : move < 0 ? (
                        <span className="text-destructive">▼ {-move}</span>
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
