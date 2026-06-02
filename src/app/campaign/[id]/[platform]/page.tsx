import { notFound } from "next/navigation";

import { requireStudentWorkspace } from "@/lib/auth/guards";
import { getCampaign, isPlatformActive } from "@/lib/campaign/queries";
import {
  getPlatformFeed,
  getPlatformAudience,
  getOrganisationForWorkspace,
} from "@/lib/render/queries";
import { PLATFORMS, type Platform } from "@/lib/simulation/types";
import { PLATFORM_META } from "@/lib/render/platform-meta";
import { PlatformShell, ProfileHeader } from "./_components/platform-shell";
import { PostCard } from "./_components/post-card";
import { ComposeBox } from "./_components/compose-box";

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

  const [org, audience, feed, platformActive] = await Promise.all([
    getOrganisationForWorkspace(workspace.id),
    getPlatformAudience(id, platform),
    getPlatformFeed(id, workspace.id, platform),
    isPlatformActive(id, platform),
  ]);
  // Compose only on the Active campaign's enabled platforms (ADR-0005).
  const canCompose = campaign.isActive && platformActive;

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

      {canCompose ? <ComposeBox campaignId={id} platform={platform} /> : null}

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
