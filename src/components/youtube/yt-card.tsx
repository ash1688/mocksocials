import Link from "next/link";

import type { YtVideo } from "@/lib/youtube/queries";
import { prettyNumber, relativeTime } from "@/lib/format";

/** Faithful port of PHP yt_render_card(). */
export function YtCard({ video }: { video: YtVideo }) {
  const viral = video.statsProfile === "hyped" || video.statsProfile === "viral";
  const avatar =
    video.authorAvatar ||
    `https://picsum.photos/seed/u${video.userId ?? video.fakeUserId}/40`;

  return (
    <Link className="yt-card" href={`/youtube/watch/${video.postId}`}>
      <div className="yt-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnailUrl ?? ""} alt="" />
        <span className="yt-duration">{video.durationDisplay}</span>
        <span className="yt-play">▶</span>
        {viral ? (
          <span className="yt-badge">
            🔥 {video.statsProfile.charAt(0).toUpperCase() + video.statsProfile.slice(1)}
          </span>
        ) : null}
      </div>
      <div className="yt-meta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar-sm" src={avatar} alt="" />
        <div>
          <div className="yt-title">{video.videoTitle}</div>
          <div className="muted small">{video.authorName}</div>
          <div className="muted small">
            {prettyNumber(video.seedViews)} views · {relativeTime(video.createdAt)} ago
          </div>
        </div>
      </div>
    </Link>
  );
}
