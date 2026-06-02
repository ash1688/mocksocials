"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { orgLikes, comments, posts } from "@/db/schema";
import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";

/**
 * Organisation engagement (ADR-0005 / CONTEXT.md): the likes and replies the
 * Student issues while acting as the Organisation. Cosmetic — never scored,
 * never feeds Targets or the Simulation. Only the Active campaign is engageable;
 * the Organisation may never like its own posts (anti-cheat).
 */

async function requireActiveCampaign(campaignId: string) {
  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(campaignId, workspace.id);
  if (!campaign) redirect("/dashboard");
  if (!campaign.isActive) return null; // frozen / read-only
  return workspace;
}

/** Like or unlike a persona (community) post or a comment. */
export async function toggleOrgLike(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const platform = String(formData.get("platform") ?? "");
  const targetType = String(formData.get("targetType") ?? "");
  const targetId = String(formData.get("targetId") ?? "");
  const renderPath = `/campaign/${campaignId}/${platform}`;

  const workspace = await requireActiveCampaign(campaignId);
  if (!workspace) return revalidatePath(renderPath);

  if (targetType === "post") {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, targetId))
      .limit(1);
    // Must be the Student's own workspace AND a persona post — the Organisation
    // never likes its own content (anti-cheat).
    if (!post || post.workspaceId !== workspace.id || post.authorKind !== "persona") {
      return revalidatePath(renderPath);
    }
    const [existing] = await db
      .select({ id: orgLikes.id })
      .from(orgLikes)
      .where(and(eq(orgLikes.workspaceId, workspace.id), eq(orgLikes.postId, targetId)))
      .limit(1);
    if (existing) {
      await db.delete(orgLikes).where(eq(orgLikes.id, existing.id));
    } else {
      await db.insert(orgLikes).values({ workspaceId: workspace.id, campaignId, postId: targetId });
    }
  } else if (targetType === "comment") {
    const [comment] = await db
      .select({ id: comments.id, authorKind: comments.authorKind, postId: comments.postId })
      .from(comments)
      .innerJoin(posts, eq(comments.postId, posts.id))
      .where(and(eq(comments.id, targetId), eq(posts.workspaceId, workspace.id)))
      .limit(1);
    // Only persona comments are likeable (not the Organisation's own replies).
    if (!comment || comment.authorKind !== "persona") {
      return revalidatePath(renderPath);
    }
    const [existing] = await db
      .select({ id: orgLikes.id })
      .from(orgLikes)
      .where(and(eq(orgLikes.workspaceId, workspace.id), eq(orgLikes.commentId, targetId)))
      .limit(1);
    if (existing) {
      await db.delete(orgLikes).where(eq(orgLikes.id, existing.id));
    } else {
      await db.insert(orgLikes).values({ workspaceId: workspace.id, campaignId, commentId: targetId });
    }
  }

  revalidatePath(renderPath);
}

/** Reply to a persona comment on one of the Organisation's own posts. At most
 *  one reply per comment; threads cap at one level (CONTEXT.md). */
export async function replyToComment(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const platform = String(formData.get("platform") ?? "");
  const parentId = String(formData.get("parentId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const renderPath = `/campaign/${campaignId}/${platform}`;

  const workspace = await requireActiveCampaign(campaignId);
  if (!workspace || !body) return revalidatePath(renderPath);

  // Parent must be a top-level persona comment on a post the Organisation owns.
  const [parent] = await db
    .select({
      id: comments.id,
      postId: comments.postId,
      authorKind: comments.authorKind,
      parentId: comments.parentId,
      postAuthor: posts.authorKind,
    })
    .from(comments)
    .innerJoin(posts, eq(comments.postId, posts.id))
    .where(and(eq(comments.id, parentId), eq(posts.workspaceId, workspace.id)))
    .limit(1);
  if (
    !parent ||
    parent.authorKind !== "persona" ||
    parent.parentId !== null ||
    parent.postAuthor !== "organisation"
  ) {
    return revalidatePath(renderPath);
  }

  // At most one Organisation reply per persona comment.
  const [existing] = await db
    .select({ id: comments.id })
    .from(comments)
    .where(and(eq(comments.parentId, parentId), eq(comments.authorKind, "organisation")))
    .limit(1);
  if (existing) return revalidatePath(renderPath);

  await db.insert(comments).values({
    postId: parent.postId,
    parentId,
    authorKind: "organisation",
    personaId: null,
    body,
  });

  revalidatePath(renderPath);
}

/** Remove an Organisation reply. */
export async function deleteOrgReply(formData: FormData): Promise<void> {
  const campaignId = String(formData.get("campaignId") ?? "");
  const platform = String(formData.get("platform") ?? "");
  const replyId = String(formData.get("replyId") ?? "");
  const renderPath = `/campaign/${campaignId}/${platform}`;

  const workspace = await requireActiveCampaign(campaignId);
  if (!workspace) return revalidatePath(renderPath);

  // Scope: the reply must be an Organisation comment on a post in this workspace.
  const [reply] = await db
    .select({ id: comments.id })
    .from(comments)
    .innerJoin(posts, eq(comments.postId, posts.id))
    .where(
      and(
        eq(comments.id, replyId),
        eq(comments.authorKind, "organisation"),
        eq(posts.workspaceId, workspace.id),
      ),
    )
    .limit(1);
  if (reply) await db.delete(comments).where(eq(comments.id, replyId));

  revalidatePath(renderPath);
}
