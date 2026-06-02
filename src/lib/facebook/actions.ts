"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { posts, likes, comments, groups, groupMembers, users } from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";

const PLATFORM = "facebook" as const;

function ret(formData: FormData): string {
  const r = String(formData.get("_return") ?? "").trim();
  return r || "/facebook";
}

/** Post a status (PHP subaction=post): content and/or image, optional group. */
export async function post(formData: FormData): Promise<void> {
  const me = await requireUser();
  const content = String(formData.get("content") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const groupRaw = String(formData.get("group_id") ?? "").trim();
  const groupId = groupRaw ? Number(groupRaw) : null;
  if (content || imageUrl) {
    await db.insert(posts).values({
      userId: me.id,
      platform: PLATFORM,
      content,
      imageUrl,
      groupId,
    });
  }
  redirect(ret(formData));
}

/** Comment on a post (PHP subaction=comment). */
export async function comment(formData: FormData): Promise<void> {
  const me = await requireUser();
  const postId = Number(formData.get("post_id"));
  const content = String(formData.get("content") ?? "").trim();
  if (postId && content) {
    await db.insert(comments).values({ postId, userId: me.id, content });
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

/** Create a group, add creator as admin, go to the group (PHP create_group). */
export async function createGroup(formData: FormData): Promise<void> {
  const me = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const coverUrl = String(formData.get("cover_url") ?? "").trim();
  if (!name) redirect("/facebook/groups");
  const g = (
    await db
      .insert(groups)
      .values({ name, description, coverUrl, createdBy: me.id })
      .returning({ id: groups.id })
  )[0]!;
  await db
    .insert(groupMembers)
    .values({ groupId: g.id, userId: me.id, role: "admin" });
  redirect(`/facebook/group/${g.id}`);
}

/** Join a group (PHP join_group, INSERT IGNORE). */
export async function joinGroup(formData: FormData): Promise<void> {
  const me = await requireUser();
  const groupId = Number(formData.get("group_id"));
  if (groupId) {
    await db
      .insert(groupMembers)
      .values({ groupId, userId: me.id })
      .onConflictDoNothing();
  }
  redirect(ret(formData));
}

/** Leave a group (PHP leave_group). */
export async function leaveGroup(formData: FormData): Promise<void> {
  const me = await requireUser();
  const groupId = Number(formData.get("group_id"));
  if (groupId) {
    await db
      .delete(groupMembers)
      .where(
        and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, me.id)),
      );
  }
  redirect(ret(formData));
}

/** Update the About section of my own profile (PHP update_about). */
export async function updateAbout(formData: FormData): Promise<void> {
  const me = await requireUser();
  await db
    .update(users)
    .set({
      bio: String(formData.get("bio") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      education: String(formData.get("education") ?? "").trim(),
      coverUrl: String(formData.get("cover_url") ?? "").trim(),
    })
    .where(eq(users.id, me.id));
  redirect(ret(formData));
}
