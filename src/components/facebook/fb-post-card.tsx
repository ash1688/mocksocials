import Link from "next/link";

import type { FbPost } from "@/lib/facebook/queries";
import { toggleLike, comment } from "@/lib/facebook/actions";
import { relativeTime } from "@/lib/format";

function authorHref(p: { userId: number | null; fakeUserId: number | null }) {
  if (p.userId) return `/facebook/profile?user=${p.userId}`;
  if (p.fakeUserId) return `/facebook/profile?fake=${p.fakeUserId}`;
  return "/facebook";
}

function seedAvatar(
  url: string | null,
  ids: { userId: number | null; fakeUserId: number | null },
  size: number,
) {
  return url || `https://picsum.photos/seed/u${ids.userId ?? ids.fakeUserId}/${size}`;
}

/** Faithful port of PHP fb_render_post(). */
export function FbPostCard({ post, returnTo }: { post: FbPost; returnTo: string }) {
  return (
    <article className="fb-post card">
      <div className="post-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar" src={seedAvatar(post.authorAvatar, post, 48)} alt="" />
        <div>
          <Link className="strong-link" href={authorHref(post)}>
            <strong>{post.authorName}</strong>
          </Link>
          {post.groupName ? (
            <span className="muted">
              {" "}
              in <Link href={`/facebook/group/${post.groupId}`}>{post.groupName}</Link>
            </span>
          ) : null}
          <div className="muted small">{relativeTime(post.createdAt)} ago</div>
        </div>
      </div>

      {post.content ? (
        <div className="post-body" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </div>
      ) : null}
      {post.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post-image" src={post.imageUrl} alt="" />
      ) : null}

      <div className="fb-actions">
        <form action={toggleLike} className="inline">
          <input type="hidden" name="post_id" value={post.id} />
          <input type="hidden" name="_return" value={returnTo} />
          <button className={`action ${post.myLike ? "liked" : ""}`}>
            👍 Like ({post.likeCount})
          </button>
        </form>
        <span className="action muted">💬 {post.comments.length} comments</span>
      </div>

      <div className="comments">
        {post.comments.map((c, i) => (
          <div className="comment" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="avatar-sm"
              src={seedAvatar(c.avatarUrl, c, 32)}
              alt=""
            />
            <div>
              <strong>{c.displayName}</strong> {c.content}
              <div className="muted small">{relativeTime(c.createdAt)} ago</div>
            </div>
          </div>
        ))}
        <form action={comment} className="comment-form">
          <input type="hidden" name="post_id" value={post.id} />
          <input type="hidden" name="_return" value={returnTo} />
          <input name="content" placeholder="Write a comment..." required />
          <button className="btn-facebook">Reply</button>
        </form>
      </div>
    </article>
  );
}
