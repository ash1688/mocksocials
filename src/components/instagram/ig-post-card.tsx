import Link from "next/link";

import type { IgPost } from "@/lib/instagram/queries";
import { toggleLike, comment } from "@/lib/instagram/actions";
import { relativeTime } from "@/lib/format";
import { Linkify } from "@/components/linkify";

function authorHref(p: { userId: number | null; fakeUserId: number | null }) {
  if (p.userId) return `/instagram/profile?user=${p.userId}`;
  if (p.fakeUserId) return `/instagram/profile?fake=${p.fakeUserId}`;
  return "/instagram";
}

/** Faithful port of PHP ig_render_post() — used in feed and single-post view. */
export function IgPostCard({ post, returnTo }: { post: IgPost; returnTo: string }) {
  const avatar =
    post.authorAvatar ||
    `https://picsum.photos/seed/u${post.userId ?? post.fakeUserId}/40`;

  return (
    <article className="ig-post card">
      <div className="post-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="avatar-sm" src={avatar} alt="" />
        <Link className="strong-link" href={authorHref(post)}>
          <strong>{post.authorName}</strong>
        </Link>
      </div>
      <Link href={`/instagram/view/${post.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ig-image" src={post.imageUrl ?? ""} alt="" />
      </Link>
      <div className="ig-actions">
        <form action={toggleLike} className="inline">
          <input type="hidden" name="post_id" value={post.id} />
          <input type="hidden" name="_return" value={returnTo} />
          <button className={`action ${post.myLike ? "liked" : ""}`}>♥</button>
        </form>
        <span className="action muted">{post.likeCount} likes</span>
      </div>
      {post.content ? (
        <div className="ig-caption">
          <strong>{post.authorName}</strong>{" "}
          <Linkify text={post.content} platform="instagram" />
        </div>
      ) : null}
      {post.comments.map((c, i) => (
        <div className="ig-comment" key={i}>
          <strong>{c.displayName}</strong> {c.content}
        </div>
      ))}
      <form action={comment} className="comment-form">
        <input type="hidden" name="post_id" value={post.id} />
        <input type="hidden" name="_return" value={returnTo} />
        <input name="content" placeholder="Add a comment..." required />
        <button className="btn-instagram">Post</button>
      </form>
      <div className="muted small ig-time">{relativeTime(post.createdAt)} ago</div>
    </article>
  );
}
