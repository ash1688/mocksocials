import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { TweetCard } from "@/components/twitter/tweet-card";
import { getUserPosts, getFakeUserPosts } from "@/lib/twitter/queries";
import { getUserProfile, getFakeUserProfile } from "@/lib/people";
import { getUserStats, fakeUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP twitter_profile() — self / ?user= / ?fake=.
export default async function TwitterProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; fake?: string }>;
}) {
  const me = await requireUser();
  const sp = await searchParams;
  const fakeId = Number(sp.fake ?? 0);

  let profile;
  let stats: Record<string, number>;
  let feed;
  let isMe = false;
  let avatarSeedId: number;

  if (fakeId > 0) {
    profile = await getFakeUserProfile(fakeId);
    if (!profile) notFound();
    stats = fakeUserStats(fakeId, "twitter");
    feed = await getFakeUserPosts(fakeId, me.id);
    avatarSeedId = profile.id;
  } else {
    const uid = Number(sp.user ?? me.id);
    profile = await getUserProfile(uid);
    if (!profile) notFound();
    stats = await getUserStats(uid, "twitter");
    feed = await getUserPosts(uid, me.id);
    isMe = uid === me.id;
    avatarSeedId = profile.id;
  }

  const returnTo = fakeId
    ? `/twitter/profile?fake=${fakeId}`
    : `/twitter/profile?user=${profile.id}`;

  return (
    <>
      <AppChrome user={me} active="twitter" />
      <main className="content">
        <div className="profile-head card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="avatar avatar-lg"
            src={profile.avatarUrl || `https://picsum.photos/seed/u${avatarSeedId}/120`}
            alt=""
          />
          <div>
            <h2>{profile.displayName}</h2>
            <div className="muted">@{profile.username}</div>
            <p>{profile.bio}</p>
            <div className="profile-stats">
              <span>
                <strong>{prettyNumber(stats.followers ?? 0)}</strong> followers
              </span>
              <span>
                <strong>{prettyNumber(stats.following ?? 0)}</strong> following
              </span>
            </div>
          </div>
          {isMe ? (
            <Link className="btn-outline" href="/stats?platform=twitter">
              Edit stats
            </Link>
          ) : null}
        </div>
        {feed.map((item) => (
          <TweetCard key={item.rowId} item={item} returnTo={returnTo} />
        ))}
      </main>
    </>
  );
}
