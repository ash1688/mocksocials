"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts, likes, communityNotes } from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";

const PLATFORM = "twitter" as const;
const MAX = 280;

function ret(formData: FormData): string {
  const r = String(formData.get("_return") ?? "").trim();
  return r || "/twitter";
}

/** Post a tweet (PHP subaction=tweet). */
export async function tweet(formData: FormData): Promise<void> {
  const me = await requireUser();
  const content = String(formData.get("content") ?? "").trim();
  if (content && content.length <= MAX) {
    await db.insert(posts).values({ userId: me.id, platform: PLATFORM, content });
  }
  redirect(ret(formData));
}

/** Retweet (PHP subaction=retweet): a parent_id row with no content/quote. */
export async function retweet(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  if (postId) {
    await db
      .insert(posts)
      .values({ userId: me.id, platform: PLATFORM, parentId: postId });
  }
  redirect(ret(formData));
}

/** Quote/reply (PHP subaction=quote): parent_id + quote_text. */
export async function quote(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  const quoteText = String(formData.get("quote_text") ?? "").trim();
  if (postId && quoteText && quoteText.length <= MAX) {
    await db
      .insert(posts)
      .values({ userId: me.id, platform: PLATFORM, parentId: postId, quoteText });
  }
  redirect(ret(formData));
}

/** Like toggle (PHP subaction=like): insert or delete by (post_id, user_id). */
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
    if (existing) {
      await db.delete(likes).where(eq(likes.id, existing.id));
    } else {
      await db.insert(likes).values({ postId, userId: me.id });
    }
  }
  redirect(ret(formData));
}

/** Add a Community Note (PHP subaction=note). */
export async function addNote(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  const noteText = String(formData.get("note_text") ?? "").trim();
  if (postId && noteText) {
    await db
      .insert(communityNotes)
      .values({ postId, userId: me.id, noteText });
  }
  redirect(ret(formData));
}
