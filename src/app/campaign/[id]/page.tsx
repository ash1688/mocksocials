import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getCampaign, getCampaignSetup, getSimCount } from "@/lib/campaign/queries";
import { simulateStep, resetSimulation } from "@/lib/simulation/actions";
import {
  activateCampaign,
  toggleActivePlatform,
  addKeyword,
  removeKeyword,
  addTarget,
  removeTarget,
} from "@/lib/campaign/actions";
import {
  PLATFORMS,
  PLATFORM_LABELS,
  METRICS,
  METRIC_LABELS,
} from "@/lib/campaign/constants";

// Campaign setup — activate, choose platforms, keywords, targets.
export default async function CampaignSetupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const campaign = await getCampaign(Number(id), me.id);
  if (!campaign) notFound();
  const [setup, simCount] = await Promise.all([
    getCampaignSetup(campaign.id),
    getSimCount(campaign.id),
  ]);
  const active = new Set(setup.platforms);

  return (
    <>
      <AppChrome user={me} />
      <main className="content">
        <div className="card" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>
              {campaign.name}{" "}
              {campaign.isActive ? (
                <span className="muted small">· Active</span>
              ) : null}
            </h2>
            {campaign.goal ? <p>{campaign.goal}</p> : null}
            <p className="muted small">Campaign clock: {campaign.clock}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {!campaign.isActive ? (
              <form action={activateCampaign}>
                <input type="hidden" name="campaignId" value={campaign.id} />
                <button className="btn-twitter">Make active</button>
              </form>
            ) : null}
            <Link className="btn-outline" href={`/campaign/${campaign.id}/compose`}>
              Compose posts
            </Link>
            <Link className="btn-outline" href={`/campaign/${campaign.id}/analytics`}>
              Analytics
            </Link>
          </div>
        </div>

        <div className="card">
          <h3>Simulation</h3>
          <p className="muted small">
            Clock: <strong>{campaign.clock}</strong> · {simCount} simulation
            {simCount === 1 ? "" : "s"} run.{" "}
            {!campaign.isActive ? "Make the campaign active to simulate." : "Publish posts, then advance the clock to accrue engagement."}
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <form action={simulateStep}>
              <input type="hidden" name="campaignId" value={campaign.id} />
              <input type="hidden" name="step" value="day" />
              <button className="btn-twitter" disabled={!campaign.isActive}>
                Simulate a day
              </button>
            </form>
            <form action={simulateStep}>
              <input type="hidden" name="campaignId" value={campaign.id} />
              <input type="hidden" name="step" value="week" />
              <button className="btn-twitter" disabled={!campaign.isActive}>
                Simulate a week
              </button>
            </form>
            {simCount > 0 ? (
              <form action={resetSimulation}>
                <input type="hidden" name="campaignId" value={campaign.id} />
                <button className="btn-outline">Reset simulation</button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="card">
          <h3>Active platforms</h3>
          <p className="muted small">
            Enable the platforms suited to this campaign. Each starts from a zero
            baseline.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {PLATFORMS.map((p) => (
              <form action={toggleActivePlatform} key={p}>
                <input type="hidden" name="campaignId" value={campaign.id} />
                <input type="hidden" name="platform" value={p} />
                <button className={active.has(p) ? "btn-twitter" : "btn-outline"}>
                  {active.has(p) ? "✓ " : ""}
                  {PLATFORM_LABELS[p]}
                </button>
              </form>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Keyword strategy</h3>
          <form action={addKeyword} className="inline" style={{ display: "flex", gap: 8 }}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <input name="term" placeholder="keyword or #hashtag" required />
            <button className="btn-outline">Add</button>
          </form>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
            {setup.keywords.map((k) => (
              <span key={k.id} className="card-inner" style={{ display: "inline-flex", gap: 6, alignItems: "center", padding: "4px 10px", margin: 0 }}>
                #{k.term}
                <form action={removeKeyword} style={{ display: "inline" }}>
                  <input type="hidden" name="campaignId" value={campaign.id} />
                  <input type="hidden" name="keywordId" value={k.id} />
                  <button className="action" title="Remove">✕</button>
                </form>
              </span>
            ))}
            {setup.keywords.length === 0 ? <span className="muted small">No keywords yet.</span> : null}
          </div>
        </div>

        <div className="card">
          <h3>Targets</h3>
          <form action={addTarget} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <input type="hidden" name="campaignId" value={campaign.id} />
            <select name="platform">
              <option value="">Overall</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>
              ))}
            </select>
            <select name="metric">
              {METRICS.map((m) => (
                <option key={m} value={m}>{METRIC_LABELS[m]}</option>
              ))}
            </select>
            <input type="number" name="targetValue" placeholder="target" min="1" required style={{ width: 120 }} />
            <button className="btn-outline">Add target</button>
          </form>
          <table className="admin-table" style={{ marginTop: 10 }}>
            <thead>
              <tr><th>Scope</th><th>Metric</th><th>Target</th><th></th></tr>
            </thead>
            <tbody>
              {setup.targets.map((t) => (
                <tr key={t.id}>
                  <td>{t.platform ? PLATFORM_LABELS[t.platform] : "Overall"}</td>
                  <td>{METRIC_LABELS[t.metric as keyof typeof METRIC_LABELS] ?? t.metric}</td>
                  <td>{t.targetValue.toLocaleString()}</td>
                  <td>
                    <form action={removeTarget} className="inline">
                      <input type="hidden" name="campaignId" value={campaign.id} />
                      <input type="hidden" name="targetId" value={t.id} />
                      <button className="action">✕</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {setup.targets.length === 0 ? <p className="muted small">No targets set.</p> : null}
        </div>
      </main>
    </>
  );
}
