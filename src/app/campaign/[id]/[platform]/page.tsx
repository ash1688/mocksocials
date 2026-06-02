import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign } from "@/lib/campaign/queries";
import {
  getPlatformFeed,
  getPlatformAudience,
  getOrganisationForWorkspace,
} from "@/lib/render/queries";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { PLATFORM_META } from "@/lib/render/platform-meta";
import { PlatformShell, ProfileHeader } from "./_components/platform-shell";
import { PostCard } from "./_components/post-card";

function isPlatform(v: string): v is Platform {
  return (PLATFORMS as readonly string[]).includes(v);
}

export default async function PlatformRenderPage({
  params,
}: {
  params: Promise<{ id: string; platform: string }>;
}) {
  const { id, platform } = await params;
  if (!isPlatform(platform)) notFound();

  const { workspace } = await requireStudentWorkspace();
  const campaign = await getCampaign(id, workspace.id);
  if (!campaign) notFound();

  const [org, audience, feed] = await Promise.all([
    getOrganisationForWorkspace(workspace.id),
    getPlatformAudience(id, platform),
    getPlatformFeed(id, workspace.id, platform),
  ]);

  const orgName = org?.name ?? "Organisation";
  const orgHandle = org?.handle ?? "organisation";

  return (
    <PlatformShell
      platform={platform}
      campaignId={id}
      viewingInactive={!campaign.isActive}
    >
      <ProfileHeader
        platform={platform}
        name={orgName}
        handle={orgHandle}
        tagline={org?.tagline ?? null}
        audience={audience}
      />

      {feed.length === 0 ? (
        <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
          No {PLATFORM_META[platform].postNoun.toLowerCase()}s yet on{" "}
          {PLATFORM_META[platform].wordmark}.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {feed.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              platform={platform}
              campaignId={id}
              orgName={orgName}
              orgHandle={orgHandle}
            />
          ))}
        </div>
      )}
    </PlatformShell>
  );
}
