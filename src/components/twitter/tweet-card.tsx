import Link from "next/link";

import type { FeedItem, AuthoredPost } from "@/lib/twitter/queries";
import { retweet, quote, toggleLike, addNote } from "@/lib/twitter/actions";
import { relativeTime } from "@/lib/format";
import { Linkify } from "@/components/linkify";

function profileHref(p: AuthoredPost): string {
  if (p.userId) return `/twitter/profile?user=${p.userId}`;
  if (p.fakeUserId) return `/twitter/profile?fake=${p.fakeUserId}`;
  return "/twitter";
}

function avatar(p: { avatarUrl: string | null; userId: number | null; fakeUserId: number | null }, size: number) {
  return p.avatarUrl || `https://picsum.photos/seed/u${p.userId ?? p.fakeUserId}/${size}`;
}

/** Faithful port of PHP twitter_render_post(). */
export function TweetCard({ item, returnTo }: { item: FeedItem; returnTo: string }) {
  const { post, retweeter, isRetweet, isQuote } = item;

  return (
    <article className="tweet card">
      {isRetweet && retweeter ? (
        <div className="rt-banner">🔁 {retweeter.displayName} retweeted</div>
      ) : null}

      {isQuote && retweeter ? (
        <>
          <div className="quoted card-inner">
            <div className="tweet-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar avatar-sm" src={avatar(post, 40)} alt="" />
              <div>
                <strong>{post.displayName}</strong>{" "}
                <span className="muted">@{post.username}</span>
              </div>
            </div>
            <div className="tweet-body">
              <Linkify text={post.content ?? ""} />
            </div>
          </div>
          <div className="tweet-head" style={{ marginTop: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="avatar"
              src={avatar(
                { avatarUrl: retweeter.avatarUrl, userId: retweeter.userId, fakeUserId: retweeter.fakeUserId },
                48,
              )}
              alt=""
            />
            <div>
              <strong>{retweeter.displayName}</strong>{" "}
              <span className="muted">
                @{retweeter.username} · {relativeTime(retweeter.createdAt)} · replied
              </span>
            </div>
          </div>
          <div className="tweet-body">
            <Linkify text={retweeter.quoteText ?? ""} />
          </div>
        </>
      ) : (
        <>
          <div className="tweet-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="avatar" src={avatar(post, 48)} alt="" />
            <div>
              <Link className="strong-link" href={profileHref(post)}>
                <strong>{post.displayName}</strong>
              </Link>{" "}
              <span className="muted">
                @{post.username} · {relativeTime(post.createdAt)}
              </span>
            </div>
          </div>
          <div className="tweet-body">
            <Linkify text={post.content ?? ""} />
          </div>
        </>
      )}

      {item.notes.map((n, i) => (
        <div className="note" key={i}>
          <div className="note-head">
            📝 Readers added context — <span className="muted">by {n.displayName}</span>
          </div>
          <div style={{ whiteSpace: "pre-wrap" }}>{n.noteText}</div>
        </div>
      ))}

      <div className="tweet-actions">
        <form action={toggleLike} className="inline">
          <input type="hidden" name="post_id" value={post.id} />
          <input type="hidden" name="_return" value={returnTo} />
          <button className={`action ${item.myLike ? "liked" : ""}`} title="Like">
            ♥ {item.likeCount}
          </button>
        </form>
        <form action={retweet} className="inline">
          <input type="hidden" name="post_id" value={post.id} />
          <input type="hidden" name="_return" value={returnTo} />
          <button className="action" title="Retweet">
            🔁 {item.rtCount}
          </button>
        </form>
        <details className="inline">
          <summary className="action">💬 Reply</summary>
          <form action={quote} className="popover">
            <input type="hidden" name="post_id" value={post.id} />
            <input type="hidden" name="_return" value={returnTo} />
            <textarea name="quote_text" maxLength={280} placeholder="Write your reply..." />
            <div className="popover-actions">
              <button type="submit" className="btn-twitter">
                Reply
              </button>
            </div>
          </form>
        </details>
        <details className="inline">
          <summary className="action">📝 Note</summary>
          <form action={addNote} className="popover">
            <input type="hidden" name="post_id" value={post.id} />
            <input type="hidden" name="_return" value={returnTo} />
            <textarea name="note_text" placeholder="Add context to this tweet..." />
            <div className="popover-actions">
              <button type="submit" className="btn-twitter">
                Submit Note
              </button>
            </div>
          </form>
        </details>
      </div>
    </article>
  );
}
