import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getAnalytics } from "@/lib/twitter/queries";
import { getUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP twitter_analytics().
export default async function TwitterAnalyticsPage() {
  const me = await requireUser();
  const [stats, counts] = await Promise.all([
    getUserStats(me.id, "twitter"),
    getAnalytics(me.id),
  ]);

  const cards = [
    { num: stats.followers ?? 0, label: "Followers" },
    { num: stats.impressions ?? 0, label: "Impressions" },
    { num: stats.profile_visits ?? 0, label: "Profile visits" },
    { num: stats.mentions ?? 0, label: "Mentions" },
    { num: counts.myTweets, label: "Tweets posted" },
    { num: counts.myLikes, label: "Likes received" },
  ];

  return (
    <>
      <AppChrome user={me} active="twitter" />
      <main className="content">
        <h2>MockTweet Analytics — {me.displayName}</h2>
        <div className="analytics-grid">
          {cards.map((c) => (
            <div className="stat-card" key={c.label}>
              <div className="stat-num">{prettyNumber(c.num)}</div>
              <div className="muted">{c.label}</div>
            </div>
          ))}
        </div>
        <p>
          <Link className="btn-twitter" href="/stats?platform=twitter">
            Edit stats
          </Link>
        </p>
      </main>
    </>
  );
}
