import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { FbPostCard } from "@/components/facebook/fb-post-card";
import {
  getUserPosts,
  getFakeUserPosts,
  getFriends,
  getFakeFriends,
  type Friend,
  type FbPost,
} from "@/lib/facebook/queries";
import { getUserProfile, getFakeUserProfile, type Profile } from "@/lib/people";
import { getUserStats, fakeUserStats } from "@/lib/stats";
import { updateAbout } from "@/lib/facebook/actions";
import { prettyNumber } from "@/lib/format";

// Faithful port of PHP fb_profile().
export default async function FacebookProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ user?: string; fake?: string }>;
}) {
  const me = await requireUser();
  const sp = await searchParams;
  const fakeId = Number(sp.fake ?? 0);

  let profile: Profile | null;
  let stats: Record<string, number>;
  let feed: FbPost[];
  let friends: Friend[];
  let isMe = false;
  let friendKey: "user" | "fake" = "user";

  if (fakeId > 0) {
    profile = await getFakeUserProfile(fakeId);
    if (!profile) notFound();
    stats = fakeUserStats(fakeId, "facebook");
    feed = await getFakeUserPosts(fakeId, me.id);
    friends = await getFakeFriends(fakeId);
    friendKey = "fake";
  } else {
    const uid = Number(sp.user ?? me.id);
    profile = await getUserProfile(uid);
    if (!profile) notFound();
    stats = await getUserStats(uid, "facebook");
    feed = await getUserPosts(uid, me.id);
    friends = await getFriends(uid);
    isMe = uid === me.id;
  }

  const cover =
    profile.coverUrl || `https://picsum.photos/seed/cover${profile.id}/1200/300`;
  const returnTo = fakeId
    ? `/facebook/profile?fake=${fakeId}`
    : `/facebook/profile?user=${profile.id}`;

  return (
    <>
      <AppChrome user={me} active="facebook" />
      <main className="content">
        <div className="fb-cover" style={{ backgroundImage: `url('${cover}')` }} />
        <div className="profile-head card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="avatar avatar-lg"
            src={profile.avatarUrl || `https://picsum.photos/seed/u${profile.id}/120`}
            alt=""
          />
          <div>
            <h2>{profile.displayName}</h2>
            <p>{profile.bio}</p>
            <div className="profile-stats">
              <span>
                <strong>{prettyNumber(stats.friends ?? 0)}</strong> friends
              </span>
              <span>
                <strong>{prettyNumber(stats.page_likes ?? 0)}</strong> page likes
              </span>
            </div>
          </div>
          {isMe ? (
            <Link className="btn-outline" href="/stats?platform=facebook">
              Edit stats
            </Link>
          ) : null}
        </div>

        <div className="fb-layout">
          <aside className="fb-left">
            <div className="card">
              <h3>About</h3>
              {isMe ? (
                <form action={updateAbout}>
                  <input type="hidden" name="_return" value={returnTo} />
                  <label>
                    Bio
                    <textarea name="bio" defaultValue={profile.bio ?? ""} />
                  </label>
                  <label>
                    Location
                    <input name="location" defaultValue={profile.location ?? ""} />
                  </label>
                  <label>
                    Education
                    <input name="education" defaultValue={profile.education ?? ""} />
                  </label>
                  <label>
                    Cover URL
                    <input name="cover_url" defaultValue={profile.coverUrl ?? ""} />
                  </label>
                  <button className="btn-facebook">Save</button>
                </form>
              ) : (
                <>
                  <p>📍 {profile.location || "—"}</p>
                  <p>🎓 {profile.education || "—"}</p>
                </>
              )}
            </div>
            <div className="card">
              <h3>Friends</h3>
              {friends.map((f) => (
                <Link
                  key={f.id}
                  className="friend-row"
                  href={`/facebook/profile?${friendKey}=${f.id}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="avatar-sm"
                    src={f.avatarUrl || `https://picsum.photos/seed/u${f.id}/40`}
                    alt=""
                  />
                  {f.displayName}
                </Link>
              ))}
            </div>
          </aside>
          <div className="fb-main">
            {feed.map((p) => (
              <FbPostCard key={p.id} post={p} returnTo={returnTo} />
            ))}
            {feed.length === 0 ? <p className="muted">No posts yet.</p> : null}
          </div>
        </div>
      </main>
    </>
  );
}
