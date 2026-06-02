import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getFeed, getFriends } from "@/lib/facebook/queries";
import { post } from "@/lib/facebook/actions";
import { FbPostCard } from "@/components/facebook/fb-post-card";

// Faithful port of PHP fb_feed().
export default async function FacebookFeedPage() {
  const me = await requireUser();
  const [feed, friends] = await Promise.all([getFeed(me.id), getFriends(me.id)]);

  return (
    <>
      <AppChrome user={me} active="facebook" />
      <main className="content">
        <div className="fb-layout">
          <aside className="fb-left">
            <div className="card">
              <h3>Shortcuts</h3>
              <Link href="/facebook/profile">My profile</Link>
              <Link href="/facebook/groups">Groups</Link>
              <Link href="/facebook/analytics">Analytics</Link>
            </div>
            <div className="card">
              <h3>Friends</h3>
              {friends.length === 0 ? (
                <p className="muted small">Other students appear here.</p>
              ) : null}
              {friends.map((f) => (
                <Link
                  key={f.id}
                  className="friend-row"
                  href={`/facebook/profile?user=${f.id}`}
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
            <div className="composer card">
              <form action={post}>
                <input type="hidden" name="_return" value="/facebook" />
                <textarea
                  name="content"
                  placeholder={`What's on your mind, ${me.displayName}?`}
                />
                <input name="image_url" placeholder="Image URL (optional)" />
                <div className="composer-bar">
                  <button type="submit" className="btn-facebook">
                    Post
                  </button>
                </div>
              </form>
            </div>
            {feed.map((p) => (
              <FbPostCard key={p.id} post={p} returnTo="/facebook" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
