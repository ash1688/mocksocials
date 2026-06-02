import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { YtSubnav } from "@/components/youtube/yt-subnav";
import { getUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

const money = (n: number) => Math.round(n).toLocaleString("en-GB");

// Faithful port of PHP yt_analytics() — stat cards + estimated earnings table.
export default async function YoutubeAnalyticsPage() {
  const me = await requireUser();
  const stats = await getUserStats(me.id, "youtube");

  const totalViews = Math.max(stats.total_views ?? 0, 0);
  const premiumPct = 27;
  const premiumViews = Math.round(totalViews * (premiumPct / 100));
  const standardViews = totalViews - premiumViews;

  const rpmLow = 1.4;
  const rpmHigh = 2.2;
  const premLow = 0.4;
  const premHigh = 0.8;

  const stdLow = (standardViews / 1000) * rpmLow;
  const stdHigh = (standardViews / 1000) * rpmHigh;
  const prmLow = (premiumViews / 1000) * premLow;
  const prmHigh = (premiumViews / 1000) * premHigh;
  const totLow = stdLow + prmLow;
  const totHigh = stdHigh + prmHigh;

  const monetised =
    (stats.subscribers ?? 0) >= 1000 && (stats.watch_time_hours ?? 0) >= 4000;

  return (
    <>
      <AppChrome user={me} active="youtube" />
      <main className="content">
        <YtSubnav active="/youtube/analytics" />
        <h2>MockTube Analytics — {me.displayName}</h2>
        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.subscribers ?? 0)}</div>
            <div className="muted">Subscribers</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{prettyNumber(stats.total_views ?? 0)}</div>
            <div className="muted">Total views</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">
              {prettyNumber(stats.watch_time_hours ?? 0)}
            </div>
            <div className="muted">Watch time (hours)</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats.avg_view_duration ?? 0}s</div>
            <div className="muted">Avg view duration</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">£{prettyNumber(stats.revenue_gbp ?? 0)}</div>
            <div className="muted">Reported revenue (GBP)</div>
          </div>
        </div>

        <div className="card earnings">
          <h3>Estimated earnings</h3>
          <div className="muted small">
            Monetisation status:{" "}
            {monetised ? (
              <span className="badge-ok">
                ✓ Eligible (1k subs + 4k watch hours)
              </span>
            ) : (
              <span className="badge-warn">
                Not yet eligible — need 1,000 subs &amp; 4,000 watch hours
              </span>
            )}
          </div>
          <table className="earnings-table">
            <thead>
              <tr>
                <th>Stream</th>
                <th>Views</th>
                <th>Rate (per 1,000)</th>
                <th>Estimated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ad revenue (standard views)</td>
                <td>{prettyNumber(standardViews)}</td>
                <td>
                  £{rpmLow.toFixed(2)} – £{rpmHigh.toFixed(2)} RPM
                </td>
                <td>
                  £{money(stdLow)} – £{money(stdHigh)}
                </td>
              </tr>
              <tr>
                <td>YouTube Premium pool</td>
                <td>
                  {prettyNumber(premiumViews)} ({premiumPct}%)
                </td>
                <td>
                  £{premLow.toFixed(2)} – £{premHigh.toFixed(2)} Premium RPM
                </td>
                <td>
                  £{money(prmLow)} – £{money(prmHigh)}
                </td>
              </tr>
              <tr className="total">
                <td colSpan={3}>
                  <strong>Estimated total</strong>
                </td>
                <td>
                  <strong>
                    £{money(totLow)} – £{money(totHigh)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="muted small">
            Actual earnings vary significantly by niche, audience geography, ad
            density, and seasonality. A gaming channel and a finance channel with
            identical view counts can earn very differently.
          </p>
        </div>
        <p>
          <Link className="btn-youtube" href="/stats?platform=youtube">
            Edit stats
          </Link>
        </p>
      </main>
    </>
  );
}
