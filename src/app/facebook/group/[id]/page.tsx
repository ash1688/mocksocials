import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { FbPostCard } from "@/components/facebook/fb-post-card";
import { getGroup, getGroupPosts } from "@/lib/facebook/queries";
import { post, joinGroup, leaveGroup } from "@/lib/facebook/actions";

// Faithful port of PHP fb_group_view().
export default async function FacebookGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const me = await requireUser();
  const { id } = await params;
  const groupId = Number(id);
  const group = await getGroup(groupId, me.id);
  if (!group) notFound();
  const feed = await getGroupPosts(groupId, me.id);

  const cover =
    group.coverUrl || `https://picsum.photos/seed/g${group.id}/1200/300`;
  const returnTo = `/facebook/group/${groupId}`;

  return (
    <>
      <AppChrome user={me} active="facebook" />
      <main className="content">
        <div className="fb-cover" style={{ backgroundImage: `url('${cover}')` }} />
        <div className="card group-head">
          <h2>{group.name}</h2>
          <p>{group.description}</p>
          <p className="muted small">{group.members.length} members</p>
          {!group.isMember ? (
            <form action={joinGroup} className="inline">
              <input type="hidden" name="group_id" value={groupId} />
              <input type="hidden" name="_return" value={returnTo} />
              <button className="btn-facebook">Join group</button>
            </form>
          ) : (
            <form action={leaveGroup} className="inline">
              <input type="hidden" name="group_id" value={groupId} />
              <input type="hidden" name="_return" value="/facebook/groups" />
              <button className="btn-outline">Leave group</button>
            </form>
          )}
        </div>

        <div className="fb-layout">
          <div className="fb-main">
            {group.isMember ? (
              <div className="composer card">
                <form action={post}>
                  <input type="hidden" name="group_id" value={groupId} />
                  <input type="hidden" name="_return" value={returnTo} />
                  <textarea name="content" placeholder={`Post to ${group.name}...`} />
                  <input name="image_url" placeholder="Image URL (optional)" />
                  <button className="btn-facebook">Post to group</button>
                </form>
              </div>
            ) : null}
            {feed.map((p) => (
              <FbPostCard key={p.id} post={p} returnTo={returnTo} />
            ))}
          </div>
          <aside className="fb-left">
            <div className="card">
              <h3>Members</h3>
              {group.members.map((m) => (
                <div className="friend-row" key={m.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="avatar-sm"
                    src={m.avatarUrl || `https://picsum.photos/seed/u${m.id}/40`}
                    alt=""
                  />
                  <span>
                    {m.displayName}{" "}
                    {m.role === "admin" ? (
                      <span className="muted small">admin</span>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
