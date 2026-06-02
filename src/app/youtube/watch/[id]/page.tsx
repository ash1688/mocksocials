import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { YtSubnav } from "@/components/youtube/yt-subnav";
import { getWatch } from "@/lib/youtube/queries";
import { toggleLike, comment } from "@/lib/youtube/actions";
import { prettyNumber, relativeTime } from "@/lib/format";

// Faithful port of PHP yt_watch().
export default async function YoutubeWatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const data = await getWatch(Number(id), me.id);
  if (!data) notFound();
  const { video, likeCount, myLike, channelSubs, comments, commentCount } = data;

  const channelHref = video.userId
    ? `/youtube/channel?user=${video.userId}`
    : `/youtube/channel?fake=${video.fakeUserId}`;
  const returnTo = `/youtube/watch/${id}`;
  const avatar =
    video.authorAvatar ||
    `https://picsum.photos/seed/u${video.userId ?? video.fakeUserId}/48`;

  return (
    <>
      <AppChrome user={me} active="youtube" />
      <main className="content">
        <YtSubnav />
        <div className="yt-watch">
          <div className="yt-player">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnailUrl ?? ""} alt="" />
            <div className="yt-play-big">▶</div>
            <div className="muted small yt-novideo">
              No real video — MockTube uses thumbnail cards only.
            </div>
          </div>
          <h1 className="yt-watch-title">{video.videoTitle}</h1>
          <div className="yt-watch-meta">
            <Link className="channel-row" href={channelHref}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src={avatar} alt="" />
              <div>
                <div>
                  <strong>{video.authorName}</strong>
                </div>
                <div className="muted small">
                  {prettyNumber(channelSubs)} subscribers
                </div>
              </div>
            </Link>
            <div className="yt-watch-actions">
              <form action={toggleLike} className="inline">
                <input type="hidden" name="post_id" value={video.postId} />
                <input type="hidden" name="_return" value={returnTo} />
                <button className={`action ${myLike ? "liked" : ""}`}>
                  👍 {prettyNumber(likeCount)}
                </button>
              </form>
              <span className="action muted">
                {prettyNumber(video.seedViews)} views
              </span>
            </div>
          </div>
          {video.content ? (
            <div className="yt-desc" style={{ whiteSpace: "pre-wrap" }}>
              {video.content}
            </div>
          ) : null}

          <h3>{prettyNumber(commentCount)} Comments</h3>
          <form action={comment} className="comment-form">
            <input type="hidden" name="post_id" value={video.postId} />
            <input type="hidden" name="_return" value={returnTo} />
            <input name="content" placeholder="Add a comment..." required />
            <button className="btn-youtube">Comment</button>
          </form>
          {comments.map((c, i) => (
            <div className="yt-comment" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="avatar-sm"
                src={
                  c.avatarUrl ||
                  `https://picsum.photos/seed/u${c.userId ?? c.fakeUserId}/40`
                }
                alt=""
              />
              <div>
                <div>
                  <strong>{c.displayName}</strong>{" "}
                  <span className="muted small">{relativeTime(c.createdAt)} ago</span>
                </div>
                <div>{c.content}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
