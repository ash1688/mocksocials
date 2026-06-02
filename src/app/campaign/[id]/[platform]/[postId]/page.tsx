import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import { getOrganisationForWorkspace, getPostDetail } from "@/lib/render/queries";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { PlatformShell } from "../_components/platform-shell";
import { PostCard } from "../_components/post-card";

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

  const [org, detail] = await Promise.all([
    getOrganisationForWorkspace(workspace.id),
    getPostDetail(postId, workspace.id),
  ]);
  if (!detail) notFound();

  const orgName = org?.name ?? "Organisation";
  const orgHandle = org?.handle ?? "organisation";

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

      <section className="mt-4">
        <h2 className="mb-2 text-sm font-semibold">
          Comments ({detail.thread.length})
        </h2>
        {detail.thread.length === 0 ? (
          <p className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
            No comments yet — the audience reacts when you simulate.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {detail.thread.map((c) => {
              const isOrg = c.authorKind === "organisation";
              const name = isOrg ? orgName : c.personaName ?? "Someone";
              const handle = isOrg ? orgHandle : c.personaHandle ?? "someone";
              return (
                <li
                  key={c.id}
                  className={
                    "rounded-md border p-3 text-sm " +
                    (c.parentId ? "ml-6 bg-muted/40" : "")
                  }
                >
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{name}</span>{" "}
                    @{handle}
                    {isOrg ? " · Organisation" : ""}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </PlatformShell>
  );
}
