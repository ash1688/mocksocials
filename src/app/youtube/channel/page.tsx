import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { YtSubnav } from "@/components/youtube/yt-subnav";
import { YtCard } from "@/components/youtube/yt-card";
import {
  getUserVideos,
  getFakeUserVideos,
  type YtVideo,
} from "@/lib/youtube/queries";
import { getUserProfile, getFakeUserProfile, type Profile } from "@/lib/people";
import { getUserStats, fakeUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP yt_channel().
export default async function YoutubeChannelPage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; fake?: string }>;
}) {
  const me = await requireUser();
  const sp = await searchParams;
  const fakeId = Number(sp.fake ?? 0);

  let profile: Profile | null;
  let stats: Record<string, number>;
  let videos: YtVideo[];
  let isMe = false;

  if (fakeId > 0) {
    profile = await getFakeUserProfile(fakeId);
    if (!profile) notFound();
    stats = fakeUserStats(fakeId, "youtube");
    videos = await getFakeUserVideos(fakeId);
  } else {
    const uid = Number(sp.user ?? me.id);
    profile = await getUserProfile(uid);
    if (!profile) notFound();
    stats = await getUserStats(uid, "youtube");
    videos = await getUserVideos(uid);
    isMe = uid === me.id;
  }

  const banner =
    profile.coverUrl || `https://picsum.photos/seed/yb${profile.id}/1200/200`;

  return (
    <>
      <AppChrome user={me} active="youtube" />
      <main className="content">
        <YtSubnav active="/youtube/channel" />
        <div className="yt-banner" style={{ backgroundImage: `url('${banner}')` }} />
        <div className="profile-head card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="avatar avatar-lg"
            src={profile.avatarUrl || `https://picsum.photos/seed/u${profile.id}/120`}
            alt=""
          />
          <div>
            <h2>{profile.displayName}</h2>
            <div className="muted">
              @{profile.username} · {prettyNumber(stats.subscribers ?? 0)} subscribers ·{" "}
              {videos.length} videos
            </div>
            <p>{profile.bio}</p>
          </div>
          {isMe ? (
            <Link className="btn-outline" href="/stats?platform=youtube">
              Edit stats
            </Link>
          ) : null}
        </div>
        <div className="yt-grid">
          {videos.map((v) => (
            <YtCard key={v.postId} video={v} />
          ))}
        </div>
      </main>
    </>
  );
}
