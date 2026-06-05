import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { listCampaigns } from "@/lib/campaign/queries";
import { createCampaign } from "@/lib/campaign/actions";

// Campaign index — list a student's campaigns + create a new one.
export default async function CampaignsPage() {
  const me = await requireUser();
  const campaigns = await listCampaigns(me.id);

  return (
    <>
      <AppChrome user={me} />
      <main className="content">
        <h2>Campaigns</h2>
        <p className="muted">
          A campaign overlays your own posts with goals + a simulation. Post as
          normal, tag posts to the campaign, then simulate to see projected reach
          and engagement against your targets.
        </p>

        <div className="card">
          <h3>New campaign</h3>
          <form action={createCampaign}>
            <label>
              Name
              <input name="name" placeholder="e.g. Autumn awareness push" required />
            </label>
            <label>
              Goal <span className="muted small">(optional — feeds the on-mission cue)</span>
              <textarea name="goal" placeholder="What is this campaign trying to achieve?" />
            </label>
            <button className="btn-twitter">Create campaign</button>
          </form>
        </div>

        {campaigns.length === 0 ? (
          <p className="muted">No campaigns yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Goal</th>
                <th>Status</th>
                <th>Clock</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link href={`/campaign/${c.id}`}>{c.name}</Link>
                  </td>
                  <td className="muted small">{c.goal ?? "—"}</td>
                  <td>{c.isActive ? <strong>Active</strong> : "inactive"}</td>
                  <td className="small">{c.clock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
