import Link from "next/link";
import Image from "next/image";

import { publishPost } from "@/lib/posts/actions";
import { toggleOrgLike } from "@/lib/engagement/actions";
import { DAY_LABELS, formatMinute } from "@/lib/posts/constants";
import { picsumImage } from "@/lib/render/media";
import type { FeedPost } from "@/lib/render/queries";
import { Button } from "@/components/ui/button";

const n = (x: number) => x.toLocaleString();

/** Avatar: the Organisation gets a branded initial; personas get a stable
 *  picsum face seeded by their handle (matches the PHP renderers). */
function Avatar({ post, size = 44 }: { post: FeedPost; size?: number }) {
  if (post.authorKind === "persona") {
    return (
      <Image
        src={picsumImage(`av-${post.authorHandle}`, size, size)}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full font-bold text-white"
      style={{ width: size, height: size, background: "hsl(var(--platform))" }}
      aria-hidden
    >
      {post.authorName.charAt(0).toUpperCase()}
    </div>
  );
}

function HintChips({ post }: { post: FeedPost }) {
  if (post.authorKind !== "organisation" || post.hints.length === 0) return null;
  return (
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
  );
}

export function TweetCard({
  post,
  campaignId,
  orgName,
  orgHandle,
  engageable,
  liked,
  focal = false,
}: {
  post: FeedPost;
  campaignId: string;
  orgName: string;
  orgHandle: string;
  engageable: boolean;
  liked: boolean;
  focal?: boolean;
}) {
  const isOrg = post.authorKind === "organisation";
  const name = isOrg ? orgName : post.authorName;
  const handle = isOrg ? orgHandle : post.authorHandle;
  const stamp =
    post.postingDay !== null && post.postingMinute !== null
      ? `${DAY_LABELS[post.postingDay]} ${formatMinute(post.postingMinute)}`
      : null;
  const canLike = engageable && post.authorKind === "persona";
  const href = `/campaign/${campaignId}/mocktweet/${post.id}`;

  return (
    <article className="flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted/40">
      <Avatar post={post} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-[15px]">
          <span className="font-bold">{name}</span>
          <span className="text-muted-foreground">@{handle}</span>
          {stamp ? (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{stamp}</span>
            </>
          ) : null}
          {post.isSeeded ? (
            <span className="ml-auto text-xs text-muted-foreground">community</span>
          ) : null}
        </div>

        <Link href={href} className="block">
          <p className={"mt-0.5 whitespace-pre-wrap " + (focal ? "text-xl" : "text-[15px]")}>
            {post.body}
          </p>
          {post.hashtags.length > 0 ? (
            <p className="mt-1 text-[15px] text-[hsl(var(--platform))]">
              {post.hashtags.map((h) => `#${h}`).join(" ")}
            </p>
          ) : null}
          {post.hasImage || post.hasVideo ? (
            <div className="mt-3 overflow-hidden rounded-2xl border">
              <Image
                src={picsumImage(post.id, 600, 340)}
                alt=""
                width={600}
                height={340}
                className="w-full object-cover"
              />
            </div>
          ) : null}
        </Link>

        {/* Action row — reply / retweet / like / views (Twitter layout) */}
        <div className="mt-2 flex max-w-md items-center justify-between text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span aria-hidden>💬</span> {n(post.comments)}
          </span>
          <span className="inline-flex items-center gap-1">
            <span aria-hidden>🔁</span> {n(post.shares)}
          </span>
          {canLike ? (
            <form action={toggleOrgLike}>
              <input type="hidden" name="campaignId" value={campaignId} />
              <input type="hidden" name="platform" value="mocktweet" />
              <input type="hidden" name="targetType" value="post" />
              <input type="hidden" name="targetId" value={post.id} />
              <button
                type="submit"
                className={"inline-flex items-center gap-1 " + (liked ? "text-[hsl(var(--platform))]" : "hover:text-[hsl(var(--platform))]")}
              >
                <span aria-hidden>{liked ? "♥" : "♡"}</span> {liked ? "Liked" : "Like"}
              </button>
            </form>
          ) : (
            <span className="inline-flex items-center gap-1">
              <span aria-hidden>♥</span> {n(post.likes)}
            </span>
          )}
          {isOrg ? (
            <span className="inline-flex items-center gap-1">
              <span aria-hidden>📊</span> {n(post.reach)}
            </span>
          ) : (
            <span />
          )}
        </div>

        <HintChips post={post} />
      </div>
    </article>
  );
}

function TweetComposer({ campaignId }: { campaignId: string }) {
  return (
    <form action={publishPost} className="flex gap-3 border-b border-border px-4 py-3">
      <input type="hidden" name="campaignId" value={campaignId} />
      <input type="hidden" name="platform" value="mocktweet" />
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-bold text-white"
        style={{ background: "hsl(var(--platform))" }}
        aria-hidden
      />
      <div className="flex-1">
        <textarea
          name="body"
          required
          rows={2}
          maxLength={280}
          placeholder="What's happening?"
          className="w-full resize-none border-0 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
        />
        <input
          name="hashtags"
          placeholder="hashtags (e.g. apprenticeships skills)"
          className="mt-1 w-full border-0 bg-transparent text-sm text-[hsl(var(--platform))] outline-none placeholder:text-muted-foreground/70"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3 border-t pt-2 text-sm">
          <select
            name="postingDay"
            defaultValue="1"
            aria-label="Posting day"
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          >
            {DAY_LABELS.map((d, i) => (
              <option key={d} value={i}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            name="time"
            defaultValue="18:00"
            aria-label="Posting time"
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          />
          <label className="flex items-center gap-1.5 text-muted-foreground">
            <input type="checkbox" name="hasImage" /> Image
          </label>
          <label className="flex items-center gap-1.5 text-muted-foreground">
            <input type="checkbox" name="callToAction" /> CTA
          </label>
          <Button
            type="submit"
            size="sm"
            className="ml-auto rounded-full"
            style={{ background: "hsl(var(--platform))" }}
          >
            Tweet
          </Button>
        </div>
      </div>
    </form>
  );
}

/** Faithful MockTweet profile + timeline (modern Twitter/X, minimal chrome). */
export function MockTweetView({
  campaignId,
  orgName,
  orgHandle,
  tagline,
  audience,
  feed,
  liked,
  canCompose,
  engageable,
}: {
  campaignId: string;
  orgName: string;
  orgHandle: string;
  tagline: string | null;
  audience: number;
  feed: FeedPost[];
  liked: { posts: Set<string>; comments: Set<string> };
  canCompose: boolean;
  engageable: boolean;
}) {
  return (
    <div className="mx-auto max-w-xl border-x border-border">
      {/* Profile header */}
      <div className="px-4 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-16 w-16 place-items-center rounded-full text-2xl font-bold text-white"
            style={{ background: "hsl(var(--platform))" }}
            aria-hidden
          >
            {orgName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold">{orgName}</h1>
            <p className="text-sm text-muted-foreground">@{orgHandle}</p>
          </div>
        </div>
        {tagline ? <p className="mt-2 text-[15px]">{tagline}</p> : null}
        <p className="mt-2 text-sm">
          <span className="font-bold">{n(audience)}</span>{" "}
          <span className="text-muted-foreground">Followers</span>
        </p>
      </div>

      <div className="border-b border-border px-4 py-2 text-[15px] font-bold">
        Posts
      </div>

      {canCompose ? <TweetComposer campaignId={campaignId} /> : null}

      {feed.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          No tweets yet.
        </p>
      ) : (
        feed.map((post) => (
          <TweetCard
            key={post.id}
            post={post}
            campaignId={campaignId}
            orgName={orgName}
            orgHandle={orgHandle}
            engageable={engageable}
            liked={liked.posts.has(post.id)}
          />
        ))
      )}
    </div>
  );
}
