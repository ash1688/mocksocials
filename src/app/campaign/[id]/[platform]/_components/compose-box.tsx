import { publishPost } from "@/lib/posts/actions";
import { DAY_LABELS } from "@/lib/posts/constants";
import { PLATFORM_META } from "@/lib/render/platform-meta";
import type { Platform } from "@/lib/simulation/types";
import { Button } from "@/components/ui/button";

/** Compose a post in place on the render (ADR-0005). Platform is implied by the
 *  route. Shown only on the Active campaign's enabled platforms. */
export function ComposeBox({
  campaignId,
  platform,
}: {
  campaignId: string;
  platform: Platform;
}) {
  const meta = PLATFORM_META[platform];
  const isVideo = platform === "mocktube";

  return (
    <form
      action={publishPost}
      className="mb-6 flex flex-col gap-3 rounded-lg border bg-card p-4"
    >
      <input type="hidden" name="campaignId" value={campaignId} />
      <input type="hidden" name="platform" value={platform} />

      <p className="text-sm font-semibold">New {meta.postNoun.toLowerCase()}</p>

      <textarea
        name="body"
        required
        rows={3}
        placeholder={`Post as the Organisation on ${meta.wordmark}…`}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm"
      />

      <input
        name="hashtags"
        placeholder="hashtags (e.g. apprenticeships skills)"
        className="h-9 rounded-md border border-input bg-background px-3 text-sm"
      />

      <div className="flex flex-wrap items-center gap-2">
        <select
          name="postingDay"
          defaultValue="1"
          aria-label="Posting day"
          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
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
          aria-label="Posting time"
          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
        />
        {isVideo ? (
          <input
            name="duration"
            placeholder="length M:SS"
            aria-label="Video length"
            className="h-9 w-28 rounded-md border border-input bg-background px-2 text-sm"
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        {isVideo ? (
          <label className="flex items-center gap-1.5">
            <input type="checkbox" name="hasVideo" defaultChecked /> Video
          </label>
        ) : (
          <label className="flex items-center gap-1.5">
            <input type="checkbox" name="hasImage" /> Image
          </label>
        )}
        <label className="flex items-center gap-1.5">
          <input type="checkbox" name="callToAction" /> Call to action
        </label>
      </div>

      <Button type="submit" className="self-start">
        Publish
      </Button>
    </form>
  );
}
