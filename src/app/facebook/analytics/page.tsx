import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP fb_analytics().
export default async function FacebookAnalyticsPage() {
  const me = await requireUser();
  const stats = await getUserStats(me.id, "facebook");

  return (
    <>
      <AppChrome user={me} active="facebook" />
      <main className="content">
        <h2>MockBook Analytics — {me.displayName}</h2>
        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.friends ?? 0)}</div>
            <div className="muted">Friends</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.page_likes ?? 0)}</div>
            <div className="muted">Page likes</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.reach ?? 0)}</div>
            <div className="muted">Reach</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.post_reach ?? 0)}</div>
            <div className="muted">Post reach</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats.engagement_rate ?? 0}%</div>
            <div className="muted">Engagement rate</div>
          </div>
        </div>
        <p>
          <Link className="btn-facebook" href="/stats?platform=facebook">
            Edit stats
          </Link>
        </p>
      </main>
    </>
  );
}
