import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getStatMap, getRecentLike } from "@/lib/home/queries";
import { prettyNumber, relativeTime, platformLabel } from "@/lib/format";

// Faithful port of PHP handle_home(): a tile per platform showing the headline
// stat, plus a "recent like" notification strip.
const TILES = [
  { platform: "twitter", name: "MockTweet", stat: "followers", label: "followers" },
  { platform: "facebook", name: "MockBook", stat: "friends", label: "friends" },
  { platform: "instagram", name: "MockGram", stat: "followers", label: "followers" },
  { platform: "youtube", name: "MockTube", stat: "subscribers", label: "subscribers" },
] as const;

export default async function HomePage() {
  const user = await requireUser();
  const [stats, recentLike] = await Promise.all([
    getStatMap(user.id),
    getRecentLike(user.id),
  ]);

  return (
    <>
      <AppChrome user={user} />
      <main className="content">
        <section className="home-hero">
          <h1>Welcome back, {user.displayName}.</h1>
          <p className="muted">Pick a platform to jump in.</p>
        </section>

        {recentLike ? (
          <div className="notify-strip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recentLike.avatarUrl || "https://picsum.photos/seed/n/40"}
              alt=""
            />
            <span>
              <strong>{recentLike.displayName}</strong> liked your{" "}
              {platformLabel(recentLike.platform)} post —{" "}
              <Link href={`/${recentLike.platform}`}>view</Link>
            </span>
            <span className="muted small">
              {relativeTime(recentLike.createdAt)} ago
            </span>
          </div>
        ) : null}

        <section className="tile-grid">
          {TILES.map((t) => {
            const value = stats[`${t.platform}:${t.stat}`] ?? 0;
            return (
              <Link
                key={t.platform}
                className={`tile tab-${t.platform}`}
                href={`/${t.platform}`}
              >
                <h2>{t.name}</h2>
                <div className="tile-stat">
                  {prettyNumber(value)} <span>{t.label}</span>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </>
  );
}
