import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import {
  getCampaign,
  getCampaignSetup,
  getCampaignPosts,
} from "@/lib/campaign/queries";
import { publishCampaignPost } from "@/lib/campaign/actions";
import { PLATFORM_LABELS } from "@/lib/campaign/constants";
import { relativeTime } from "@/lib/format";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fmtTime = (m: number | null) =>
  m == null
    ? "—"
    : `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// C2 campaign composer — create a post, pick its platform + scoring inputs.
export default async function CampaignComposePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const campaign = await getCampaign(Number(id), me.id);
  if (!campaign) notFound();
  const [setup, campaignPosts] = await Promise.all([
    getCampaignSetup(campaign.id),
    getCampaignPosts(campaign.id),
  ]);

  return (
    <>
      <AppChrome user={me} />
      <main className="content">
        <p className="muted small">
          <Link href={`/campaign/${campaign.id}`}>← {campaign.name}</Link>
        </p>
        <h2>Compose campaign posts</h2>

        {setup.platforms.length === 0 ? (
          <div className="card">
            <p className="muted">
              No active platforms yet.{" "}
              <Link href={`/campaign/${campaign.id}`}>Enable some platforms</Link>{" "}
              for this campaign first.
            </p>
          </div>
        ) : (
          <div className="card">
            <h3>New post</h3>
            <form action={publishCampaignPost}>
              <input type="hidden" name="campaignId" value={campaign.id} />
              <label>
                Platform
                <select name="platform">
                  {setup.platforms.map((p) => (
                    <option key={p} value={p}>
                      {PLATFORM_LABELS[p]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Content{" "}
                <span className="muted small">
                  (use #hashtags — keyword strategy: {setup.keywords.map((k) => "#" + k.term).join(" ") || "none set"})
                </span>
                <textarea name="content" rows={3} placeholder="What is the organisation posting?" />
              </label>
              <label>
                Image URL <span className="muted small">(MockBook / MockGram / MockTube thumbnail)</span>
                <input name="image_url" placeholder="https://picsum.photos/..." />
              </label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label style={{ flex: "1 1 140px" }}>
                  Posting day
                  <select name="posting_day">
                    <option value="">—</option>
                    {DAYS.map((d, i) => (
                      <option key={d} value={i}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ flex: "1 1 140px" }}>
                  Posting time
                  <input type="time" name="posting_time" defaultValue="18:00" />
                </label>
              </div>
              <label className="checkbox">
                <input type="checkbox" name="call_to_action" value="1" /> Includes a
                clear call-to-action
              </label>
              <details>
                <summary className="muted small">MockTube fields (title, duration)</summary>
                <label>
                  Video title
                  <input name="title" />
                </label>
                <label>
                  Duration
                  <input name="duration" defaultValue="10:00" />
                </label>
                <label>
                  Stats profile
                  <select name="stats_profile" defaultValue="low">
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                    <option value="hyped">Hyped</option>
                    <option value="viral">Viral</option>
                  </select>
                </label>
              </details>
              <button className="btn-twitter">Publish to feed + campaign</button>
            </form>
          </div>
        )}

        <h3>Campaign posts ({campaignPosts.length})</h3>
        {campaignPosts.length === 0 ? (
          <p className="muted">No campaign posts yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Content</th>
                <th>Day/time</th>
                <th>CTA</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {campaignPosts.map((p) => (
                <tr key={p.id}>
                  <td>{PLATFORM_LABELS[p.platform]}</td>
                  <td>{p.content || (p.imageUrl ? "(image)" : "—")}</td>
                  <td className="small">
                    {p.postingDay != null ? DAYS[p.postingDay] : "—"} {fmtTime(p.postingMinute)}
                  </td>
                  <td>{p.callToAction ? "✓" : ""}</td>
                  <td className="small">{relativeTime(p.createdAt)} ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
