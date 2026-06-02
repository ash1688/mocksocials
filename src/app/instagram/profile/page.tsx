import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { IgSubnav } from "@/components/instagram/story-bar";
import {
  getUserGrid,
  getFakeUserGrid,
  type GridTile,
} from "@/lib/instagram/queries";
import { getUserProfile, getFakeUserProfile, type Profile } from "@/lib/people";
import { getUserStats, fakeUserStats } from "@/lib/stats";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP ig_profile().
export default async function InstagramProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; fake?: string }>;
}) {
  const me = await requireUser();
  const sp = await searchParams;
  const fakeId = Number(sp.fake ?? 0);

  let profile: Profile | null;
  let stats: Record<string, number>;
  let tiles: GridTile[];
  let isMe = false;

  if (fakeId > 0) {
    profile = await getFakeUserProfile(fakeId);
    if (!profile) notFound();
    stats = fakeUserStats(fakeId, "instagram");
    tiles = await getFakeUserGrid(fakeId);
  } else {
    const uid = Number(sp.user ?? me.id);
    profile = await getUserProfile(uid);
    if (!profile) notFound();
    stats = await getUserStats(uid, "instagram");
    tiles = await getUserGrid(uid);
    isMe = uid === me.id;
  }

  return (
    <>
      <AppChrome user={me} active="instagram" />
      <main className="content">
        <IgSubnav active="/instagram/profile" />
        <div className="ig-profile-head card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="avatar-xl"
            src={profile.avatarUrl || `https://picsum.photos/seed/u${profile.id}/160`}
            alt=""
          />
          <div>
            <h2>{profile.username}</h2>
            <div className="ig-prof-stats">
              <span>
                <strong>{prettyNumber(tiles.length)}</strong> posts
              </span>
              <span>
                <strong>{prettyNumber(stats.followers ?? 0)}</strong> followers
              </span>
              <span>
                <strong>{prettyNumber(stats.following ?? 0)}</strong> following
              </span>
            </div>
            <p>
              <strong>{profile.displayName}</strong>
            </p>
            <p style={{ whiteSpace: "pre-wrap" }}>{profile.bio}</p>
            {isMe ? (
              <Link className="btn-outline" href="/stats?platform=instagram">
                Edit stats
              </Link>
            ) : null}
          </div>
        </div>
        <div className="ig-grid">
          {tiles.map((t) => (
            <Link key={t.id} className="ig-grid-tile" href={`/instagram/view/${t.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.imageUrl ?? ""} alt="" />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
