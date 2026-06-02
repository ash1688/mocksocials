"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts, likes, comments } from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";

const PLATFORM = "instagram" as const;

function ret(formData: FormData): string {
  const r = String(formData.get("_return") ?? "").trim();
  return r || "/instagram";
}

/** Share a photo (PHP subaction=post): image required, caption optional. */
export async function post(formData: FormData): Promise<void> {
  const me = await requireUser();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (imageUrl) {
    await db
      .insert(posts)
      .values({ userId: me.id, platform: PLATFORM, content, imageUrl });
  }
  redirect(ret(formData));
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
