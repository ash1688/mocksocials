import Link from "next/link";
import { notFound } from "next/navigation";

import { requireTeacher } from "@/lib/auth/guards";
import {
  getCampaignForAdmin,
  getCampaignFactorBreakdown,
} from "@/lib/admin/queries";
import { adminResetCampaign } from "@/lib/admin/actions";
import { PLATFORM_LABELS } from "@/lib/campaign/constants";
import { SUBSCORE_WEIGHTS } from "@/lib/simulation/performance-score";
import type { SubScores } from "@/lib/simulation/performance-score";
import { Button } from "@/components/ui/button";

const SUBSCORE_KEYS = Object.keys(SUBSCORE_WEIGHTS) as (keyof SubScores)[];
const pct = (x: number) => `${Math.round(x * 100)}%`;

export default async function AdminCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireTeacher();
  const { id } = await params;

  const detail = await getCampaignForAdmin(id);
  if (!detail) notFound();
  const { rows } = await getCampaignFactorBreakdown(id);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="flex items-start justify-between">
        <div>
          <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
            ← Admin
          </Link>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            {detail.campaign.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {detail.studentName} · {detail.org.name} · clock{" "}
            {detail.campaign.clock}
          </p>
        </div>
        <form action={adminResetCampaign}>
          <input type="hidden" name="campaignId" value={id} />
          <Button type="submit" variant="outline">
            Reset run
          </Button>
        </form>
      </header>

      <section>
        <h2 className="mb-1 font-semibold">Performance score breakdown</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Teacher-only (ADR-0001): the five weighted sub-scores, the gate
          multiplier, and the final score students never see — for demonstrating
          cause and effect.
        </p>

        {rows.length === 0 ? (
          <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
            No simulated posts yet for this campaign.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Post</th>
                  {SUBSCORE_KEYS.map((k) => (
                    <th key={k} className="px-2 py-2 text-right font-medium" title={`weight ${SUBSCORE_WEIGHTS[k]}`}>
                      {k}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right font-medium">gate</th>
                  <th className="px-2 py-2 text-right font-medium">score</th>
                  <th className="px-2 py-2 text-right font-medium">reach</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.postId} className="border-b align-top">
                    <td className="py-2 pr-3">
                      <span className="text-xs text-muted-foreground">
                        {PLATFORM_LABELS[r.platform]}
                      </span>
                      <br />
                      <span className="line-clamp-2 max-w-[16rem]">{r.body}</span>
                    </td>
                    {SUBSCORE_KEYS.map((k) => (
                      <td key={k} className="px-2 py-2 text-right tabular-nums">
                        {pct(r.subScores[k])}
                      </td>
                    ))}
                    <td className="px-2 py-2 text-right tabular-nums">
                      {r.gateMultiplier < 0.999 ? (
                        <span className="text-destructive">
                          ×{r.gateMultiplier.toFixed(2)}
                        </span>
                      ) : (
                        "×1"
                      )}
                    </td>
                    <td className="px-2 py-2 text-right font-semibold tabular-nums">
                      {pct(r.score)}
                    </td>
                    <td className="px-2 py-2 text-right tabular-nums">
                      {r.reach.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
