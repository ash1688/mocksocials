import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getCampaign } from "@/lib/campaign/queries";
import {
  getCampaignDashboard,
  getPostResults,
  getKeywordRankings,
} from "@/lib/analytics/queries";
import { simulateStep, resetSimulation } from "@/lib/simulation/actions";
import {
  METRICS,
  METRIC_LABELS,
  PLATFORM_LABELS,
} from "@/lib/campaign/constants";
import { prettyNumber } from "@/lib/format";
import type { HintChip } from "@/lib/simulation/hints";

function Chips({ hints }: { hints: HintChip[] }) {
  return (
    <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
      {hints.map((h, i) => (
        <span
          key={i}
          style={{
            fontSize: "0.78rem",
            padding: "2px 8px",
            borderRadius: 999,
            background: h.tone === "good" ? "#e3f6e9" : "#fdeede",
            color: h.tone === "good" ? "#1c7a3e" : "#9a5a12",
            border: `1px solid ${h.tone === "good" ? "#bfe6cc" : "#f1d3ac"}`,
          }}
        >
          {h.label}
        </span>
      ))}
    </span>
  );
}

// C4 analytics dashboard — actual-vs-target + per-post results + keyword movement.
export default async function CampaignAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const campaign = await getCampaign(Number(id), me.id);
  if (!campaign) notFound();

  const [dash, postResults, rankings] = await Promise.all([
    getCampaignDashboard(campaign.id),
    getPostResults(campaign.id),
    getKeywordRankings(campaign.id),
  ]);

  return (
    <>
      <AppChrome user={me} />
      <main className="content">
        <p className="muted small">
          <Link href={`/campaign/${campaign.id}`}>← {campaign.name}</Link>
        </p>
        <div className="card" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>Analytics — {campaign.name}</h2>
            <p className="muted small">
              Clock {campaign.clock} · {dash.simCount} simulation
              {dash.simCount === 1 ? "" : "s"}
            </p>
          </div>
          <form action={simulateStep}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <input type="hidden" name="step" value="week" />
            <button className="btn-twitter" disabled={!campaign.isActive}>
              Simulate a week
            </button>
          </form>
          {dash.simCount > 0 ? (
            <form action={resetSimulation}>
              <input type="hidden" name="campaignId" value={campaign.id} />
              <button className="btn-outline">Reset</button>
            </form>
          ) : null}
        </div>

        {dash.simCount === 0 ? (
          <div className="card">
            <p className="muted">
              No simulations yet.{" "}
              <Link href={`/campaign/${campaign.id}/compose`}>Publish some posts</Link>,
              make the campaign active, then simulate to see results.
            </p>
          </div>
        ) : (
          <>
            <div className="card">
              <h3>Targets</h3>
              {dash.targets.length === 0 ? (
                <p className="muted small">No targets set.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {dash.targets.map((t, i) => {
                    const pct = t.targetValue > 0 ? Math.min(100, (t.actual / t.targetValue) * 100) : 0;
                    const met = t.actual >= t.targetValue;
                    return (
                      <div key={i}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                          <span>
                            {t.platform ? PLATFORM_LABELS[t.platform] : "Overall"} ·{" "}
                            {METRIC_LABELS[t.metric]}
                          </span>
                          <span className={met ? "" : "muted"}>
                            {prettyNumber(t.actual)} / {prettyNumber(t.targetValue)}{" "}
                            {met ? "✓" : `(${Math.round(pct)}%)`}
                          </span>
                        </div>
                        <div style={{ height: 10, background: "var(--hover-bg)", borderRadius: 999, marginTop: 4, overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${pct}%`,
                              height: "100%",
                              background: met ? "#1c7a3e" : "var(--primary)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card">
              <h3>Per-platform metrics</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    {METRICS.map((m) => (
                      <th key={m}>{METRIC_LABELS[m]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dash.platformTotals.map((pt) => (
                    <tr key={pt.platform}>
                      <td>{PLATFORM_LABELS[pt.platform]}</td>
                      {METRICS.map((m) => (
                        <td key={m}>{prettyNumber(pt.metrics[m])}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Overall</strong></td>
                    {METRICS.map((m) => (
                      <td key={m}>
                        <strong>{prettyNumber(dash.overall[m])}</strong>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Post results <span className="muted small">(latest simulation)</span></h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Post</th>
                    {me.isAdmin ? <th>Score</th> : null}
                    <th>Reach</th>
                    <th>Likes</th>
                    <th>Shares</th>
                    <th>Comments</th>
                    <th>Hints</th>
                  </tr>
                </thead>
                <tbody>
                  {postResults.map((p) => (
                    <tr key={p.postId}>
                      <td>{PLATFORM_LABELS[p.platform]}</td>
                      <td>{p.body.length > 60 ? p.body.slice(0, 60) + "…" : p.body || "(image)"}</td>
                      {me.isAdmin ? <td>{p.score.toFixed(3)}</td> : null}
                      <td>{prettyNumber(p.reach)}</td>
                      <td>{prettyNumber(p.likes)}</td>
                      <td>{prettyNumber(p.shares)}</td>
                      <td>{prettyNumber(p.comments)}</td>
                      <td><Chips hints={p.hints} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {postResults.length === 0 ? <p className="muted small">No posts scored — publish posts on active platforms.</p> : null}
            </div>

            {rankings.length > 0 ? (
              <div className="card">
                <h3>Search rankings <span className="muted small">(lower is better)</span></h3>
                <table className="admin-table">
                  <thead>
                    <tr><th>Keyword</th><th>Current</th><th>Best</th><th>First</th><th>Movement</th></tr>
                  </thead>
                  <tbody>
                    {rankings.map((r) => {
                      const move = r.first - r.current; // positive = improved
                      return (
                        <tr key={r.term}>
                          <td>#{r.term}</td>
                          <td>{r.current}</td>
                          <td>{r.best}</td>
                          <td>{r.first}</td>
                          <td className={move > 0 ? "" : "muted"}>
                            {move > 0 ? `▲ ${move}` : move < 0 ? `▼ ${-move}` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null}
          </>
        )}
      </main>
    </>
  );
}
