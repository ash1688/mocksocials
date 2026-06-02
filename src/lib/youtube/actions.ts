"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts, youtubeMeta, likes, comments } from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";
import {
  getStatValue,
  setStat,
  youtubeSeed,
  type YtProfile,
} from "@/lib/stats";

const PLATFORM = "youtube" as const;
const PROFILES: YtProfile[] = ["low", "moderate", "high", "hyped", "viral"];

function ret(formData: FormData): string {
  const r = String(formData.get("_return") ?? "").trim();
  return r || "/youtube";
}

/**
 * Upload a video (PHP subaction=upload): create the post + youtube_meta with
 * seeded metrics, then boost the channel's subscribers + total views.
 */
export async function upload(formData: FormData): Promise<void> {
  const me = await requireUser();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("content") ?? "").trim();
  let thumbnailUrl = String(formData.get("thumbnail_url") ?? "").trim();
  const duration = String(formData.get("duration") ?? "0:00").trim() || "0:00";
  const profileRaw = String(formData.get("stats_profile") ?? "low");
  const profile: YtProfile = (PROFILES as string[]).includes(profileRaw)
    ? (profileRaw as YtProfile)
    : "low";

  if (!title) redirect("/youtube/upload");
  if (!thumbnailUrl) {
    thumbnailUrl = `https://picsum.photos/seed/yt${Math.floor(Math.random() * 9999) + 1}/640/360`;
  }

  const p = (
    await db
      .insert(posts)
      .values({ userId: me.id, platform: PLATFORM, content: description })
      .returning({ id: posts.id })
  )[0]!;

  const seed = youtubeSeed(profile);
  const pct = 25 + Math.floor(Math.random() * 6); // 25–30
  await db.insert(youtubeMeta).values({
    postId: p.id,
    videoTitle: title,
    thumbnailUrl,
    durationDisplay: duration,
    statsProfile: profile,
    premiumViewPct: pct,
    seedViews: seed.views,
    seedLikes: seed.likes,
    seedComments: seed.comments,
    seedSubBoost: seed.subBoost,
  });

  const subs = await getStatValue(me.id, PLATFORM, "subscribers");
  await setStat(me.id, PLATFORM, "subscribers", subs + seed.subBoost);
  const views = await getStatValue(me.id, PLATFORM, "total_views");
  await setStat(me.id, PLATFORM, "total_views", views + seed.views);

  redirect(`/youtube/watch/${p.id}`);
}

/** Like toggle (PHP subaction=like). */
export async function toggleLike(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  if (postId) {
    const existing = (
      await db
        .select({ id: likes.id })
        .from(likes)
        .where(and(eq(likes.postId, postId), eq(likes.userId, me.id)))
        .limit(1)
    )[0];
    if (existing) await db.delete(likes).where(eq(likes.id, existing.id));
    else await db.insert(likes).values({ postId, userId: me.id });
  }
  redirect(ret(formData));
}

/** Comment (PHP subaction=comment). */
export async function comment(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  const content = String(formData.get("content") ?? "").trim();
  if (postId && content) {
    await db.insert(comments).values({ postId, userId: me.id, content });
  }
  redirect(ret(formData));
}
