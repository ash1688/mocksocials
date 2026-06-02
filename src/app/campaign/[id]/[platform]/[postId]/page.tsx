import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import {
  getOrganisationForWorkspace,
  getPostDetail,
  getOrgLikedSets,
} from "@/lib/render/queries";
import { deletePost } from "@/lib/posts/actions";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { Button } from "@/components/ui/button";
import { PlatformShell } from "../_components/platform-shell";
import { PostCard } from "../_components/post-card";
import { CommentThread } from "../_components/comment-thread";

function isPlatform(v: string): v is Platform {
  return (PLATFORMS as readonly string[]).includes(v);
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string; platform: string; postId: string }>;
}) {
  const { id, platform, postId } = await params;
  if (!isPlatform(platform)) notFound();

  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(id, workspace.id);
  if (!campaign) notFound();

  const [org, detail, liked] = await Promise.all([
    getOrganisationForWorkspace(workspace.id),
    getPostDetail(postId, workspace.id),
    getOrgLikedSets(workspace.id),
  ]);
  if (!detail) notFound();

  const orgName = org?.name ?? "Organisation";
  const orgHandle = org?.handle ?? "organisation";
  const engageable = campaign.isActive;
  const ownPost = detail.post.authorKind === "organisation";

  return (
    <PlatformShell
      platform={platform}
      campaignId={id}
      viewingInactive={!campaign.isActive}
    >
      <PostCard
        post={detail.post}
        platform={platform}
        campaignId={id}
        orgName={orgName}
        orgHandle={orgHandle}
      />

      {/* The Organisation can remove its own post while the campaign is active. */}
      {detail.post.authorKind === "organisation" && campaign.isActive ? (
        <form action={deletePost} className="mt-2">
          <input type="hidden" name="campaignId" value={id} />
          <input type="hidden" name="platform" value={platform} />
          <input type="hidden" name="postId" value={detail.post.id} />
          <Button type="submit" variant="outline" size="sm">
            Delete post
          </Button>
        </form>
      ) : null}

      <section className="mt-4">
        <h2 className="mb-2 text-sm font-semibold">
          Comments ({detail.thread.filter((c) => c.parentId === null).length})
        </h2>
        <CommentThread
          campaignId={id}
          platform={platform}
          ownPost={ownPost}
          engageable={engageable}
          comments={detail.thread}
          likedComments={liked.comments}
          orgName={orgName}
        />
      </section>
    </PlatformShell>
  );
}
