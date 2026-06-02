import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { IgSubnav } from "@/components/instagram/story-bar";
import { getUserStats, STAT_KEYS } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

const humanize = (k: string) =>
  k
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Faithful port of PHP ig_analytics() — every instagram stat as a card.
export default async function InstagramAnalyticsPage() {
  const me = await requireUser();
  const stats = await getUserStats(me.id, "instagram");

  return (
    <>
      <AppChrome user={me} active="instagram" />
      <main className="content">
        <IgSubnav active="/instagram/analytics" />
        <h2>MockGram Analytics — {me.displayName}</h2>
        <div className="analytics-grid">
          {STAT_KEYS.instagram.map((k) => (
            <div className="stat-card" key={k}>
              <div className="stat-num">{prettyNumber(stats[k] ?? 0)}</div>
              <div className="muted">{humanize(k)}</div>
            </div>
          ))}
        </div>
        <p>
          <Link className="btn-instagram" href="/stats?platform=instagram">
            Edit stats
          </Link>
        </p>
      </main>
    </>
  );
}
