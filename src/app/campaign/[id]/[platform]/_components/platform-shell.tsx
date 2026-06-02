import Link from "next/link";

import { PLATFORM_META } from "@/lib/render/platform-meta";
import type { Platform } from "@/lib/simulation/types";

/** Themed chrome for a platform render: sets --platform via the theme class,
 *  shows the Mock* wordmark, and a back link to the campaign. */
export function PlatformShell({
  platform,
  campaignId,
  children,
  viewingInactive,
}: {
  platform: Platform;
  campaignId: string;
  children: React.ReactNode;
  viewingInactive?: boolean;
}) {
  const meta = PLATFORM_META[platform];
  return (
    <div className={meta.themeClass}>
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{ color: "hsl(var(--platform))" }}
          >
            {meta.wordmark}
          </span>
          <Link
            href={`/campaign/${campaignId}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Campaign
          </Link>
        </div>
      </header>
      {viewingInactive ? (
        <div className="bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
          Viewing a past campaign — frozen snapshot, read-only.
        </div>
      ) : null}
      <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>
    </div>
  );
}

/** The Organisation's profile/channel header for a platform. */
export function ProfileHeader({
  platform,
  name,
  handle,
  tagline,
  audience,
}: {
  platform: Platform;
  name: string;
  handle: string;
  tagline: string | null;
  audience: number;
}) {
  const meta = PLATFORM_META[platform];
  return (
    <section className="mb-6 flex items-center gap-4">
      <div
        className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-2xl font-bold text-white"
        style={{ background: "hsl(var(--platform))" }}
        aria-hidden
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold">{name}</h1>
        <p className="text-sm text-muted-foreground">@{handle}</p>
        {tagline ? <p className="mt-0.5 text-sm">{tagline}</p> : null}
        <p className="mt-1 text-sm">
          <span className="font-semibold">{audience.toLocaleString()}</span>{" "}
          <span className="text-muted-foreground">{meta.audienceNoun}</span>
        </p>
      </div>
    </section>
  );
}
