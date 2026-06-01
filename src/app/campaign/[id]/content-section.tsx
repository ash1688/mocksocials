import { publishPost, deletePost } from "@/lib/posts/actions";
import { DAY_LABELS, formatMinute } from "@/lib/posts/constants";
import { PLATFORM_LABELS } from "@/lib/campaign/constants";
import type { Platform } from "@/lib/simulation/types";
import type { Post } from "@/lib/posts/queries";
import { Button } from "@/components/ui/button";

export function ContentSection({
  campaignId,
  activePlatforms,
  posts,
}: {
  campaignId: string;
  activePlatforms: Platform[];
  posts: Post[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold">Content</h2>
        <p className="text-sm text-muted-foreground">
          Publish posts as the Organisation. Each is stamped with the posting
          day/time you choose.
        </p>
      </div>

      {activePlatforms.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          Enable at least one Active platform above before publishing.
        </p>
      ) : (
        <form
          action={publishPost}
          className="flex flex-col gap-3 rounded-lg border p-4"
        >
          <input type="hidden" name="campaignId" value={campaignId} />

          <div className="flex flex-wrap gap-2">
            <select
              name="platform"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              {activePlatforms.map((p) => (
                <option key={p} value={p}>
                  {PLATFORM_LABELS[p]}
                </option>
              ))}
            </select>
            <select
              name="postingDay"
              defaultValue="1"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="Posting day"
            >
              {DAY_LABELS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
            <input
              type="time"
              name="time"
              defaultValue="18:00"
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              aria-label="Posting time"
            />
          </div>

          <textarea
            name="body"
            required
            rows={3}
            placeholder="What is the Organisation posting?"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />

          <input
            name="hashtags"
            placeholder="hashtags (e.g. apprenticeships skills)"
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          />

          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" name="hasImage" /> Image
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" name="hasVideo" /> Video
            </label>
            <label className="flex items-center gap-1.5">
              <input type="checkbox" name="callToAction" /> Call to action
            </label>
          </div>

          <Button type="submit" className="self-start">
            Publish
          </Button>
        </form>
      )}

      {posts.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li key={post.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {PLATFORM_LABELS[post.platform]} ·{" "}
                  {post.postingDay !== null ? DAY_LABELS[post.postingDay] : "—"}{" "}
                  {post.postingMinute !== null
                    ? formatMinute(post.postingMinute)
                    : ""}
                </span>
                <form action={deletePost}>
                  <input type="hidden" name="campaignId" value={campaignId} />
                  <input type="hidden" name="postId" value={post.id} />
                  <button
                    type="submit"
                    className="hover:text-destructive"
                    title="Delete post"
                  >
                    ×
                  </button>
                </form>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{post.body}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                {post.hashtags.map((h) => (
                  <span key={h} className="text-platform">
                    #{h}
                  </span>
                ))}
                {post.hasImage ? <Chip>image</Chip> : null}
                {post.hasVideo ? <Chip>video</Chip> : null}
                {post.callToAction ? <Chip>CTA</Chip> : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
      {children}
    </span>
  );
}
