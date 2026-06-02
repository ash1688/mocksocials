import Link from "next/link";

import { DAY_LABELS, formatMinute } from "@/lib/posts/constants";
import { toggleOrgLike } from "@/lib/engagement/actions";
import type { Platform } from "@/lib/simulation/types";
import type { FeedPost } from "@/lib/render/queries";
import { PostMedia } from "./post-media";

function authorLine(post: FeedPost, orgName: string, orgHandle: string) {
  if (post.authorKind === "organisation")
    return { name: orgName, handle: orgHandle };
  return { name: post.authorName, handle: post.authorHandle };
}

/** A single post in a platform feed. Read-only (ADR-0005 slice): engagement
 *  counts come from the latest snapshot; hint chips show on Organisation posts. */
export function PostCard({
  post,
  platform,
  campaignId,
  orgName,
  orgHandle,
  engageable = false,
  liked = false,
}: {
  post: FeedPost;
  platform: Platform;
  campaignId: string;
  orgName: string;
  orgHandle: string;
  // The Organisation can like community (persona) posts on the active campaign;
  // never its own posts (ADR-0005 anti-cheat).
  engageable?: boolean;
  liked?: boolean;
}) {
  const canLike = engageable && post.authorKind === "persona";
  const author = authorLine(post, orgName, orgHandle);
  const stamp =
    post.postingDay !== null && post.postingMinute !== null
      ? `${DAY_LABELS[post.postingDay]} ${formatMinute(post.postingMinute)}`
      : null;

  return (
    <article className="rounded-lg border bg-card p-4">
      <header className="mb-2 flex items-center gap-2">
        <div
          className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white"
          style={{ background: "hsl(var(--platform))" }}
          aria-hidden
        >
          {author.name.charAt(0).toUpperCase()}
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{author.name}</p>
          <p className="text-xs text-muted-foreground">
            @{author.handle}
            {post.isSeeded ? " · community" : ""}
            {stamp ? ` · ${stamp}` : ""}
          </p>
        </div>
      </header>

      <Link href={`/campaign/${campaignId}/${platform}/${post.id}`} className="block">
        <p className="whitespace-pre-wrap text-sm">{post.body}</p>
        {post.hashtags.length > 0 ? (
          <p className="mt-1 text-sm text-platform">
            {post.hashtags.map((h) => `#${h}`).join(" ")}
          </p>
        ) : null}
        <div className="mt-3">
          <PostMedia post={post} platform={platform} />
        </div>
      </Link>

      <footer className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        {canLike ? (
          <form action={toggleOrgLike}>
            <input type="hidden" name="campaignId" value={campaignId} />
            <input type="hidden" name="platform" value={platform} />
            <input type="hidden" name="targetType" value="post" />
            <input type="hidden" name="targetId" value={post.id} />
            <button
              type="submit"
              className={liked ? "text-platform" : "hover:text-foreground"}
              title={liked ? "Unlike" : "Like as the Organisation"}
            >
              {liked ? "♥ Liked" : "♡ Like"}
            </button>
          </form>
        ) : (
          <span>♥ {post.likes.toLocaleString()}</span>
        )}
        {post.authorKind === "organisation" ? (
          <>
            <span>↻ {post.shares.toLocaleString()}</span>
            <span>💬 {post.comments.toLocaleString()}</span>
            <span className="ml-auto">{post.reach.toLocaleString()} reach</span>
          </>
        ) : null}
      </footer>

      {/* Hint chips — always visible to Students; no score math (ADR-0001). */}
      {post.authorKind === "organisation" && post.hints.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {post.hints.map((h, i) => (
            <span
              key={i}
              className={
                "rounded-full px-2 py-0.5 text-xs " +
                (h.tone === "good"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300")
              }
            >
              {h.label}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
