import Image from "next/image";

import { picsumImage, formatDuration } from "@/lib/render/media";
import type { Platform } from "@/lib/simulation/types";
import type { FeedPost } from "@/lib/render/queries";

/** Renders a post's media (ADR-0005): seeded Picsum image, or a MockTube
 *  thumbnail with a play overlay + MM:SS badge (no real video). */
export function PostMedia({
  post,
  platform,
}: {
  post: FeedPost;
  platform: Platform;
}) {
  if (platform === "mocktube") {
    if (!post.hasVideo) return null;
    const duration = formatDuration(post.durationSeconds);
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={picsumImage(post.id, 640, 360)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-black/60 text-white">
            ▶
          </div>
        </div>
        {duration ? (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
        ) : null}
      </div>
    );
  }

  if (!post.hasImage) return null;
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
      <Image
        src={picsumImage(post.id, 600, 450)}
        alt=""
        fill
        sizes="(max-width: 600px) 100vw, 600px"
        className="object-cover"
      />
    </div>
  );
}
