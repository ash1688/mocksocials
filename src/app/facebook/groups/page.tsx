import Link from "next/link";

import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getGroups } from "@/lib/facebook/queries";
import { createGroup, joinGroup } from "@/lib/facebook/actions";

// Faithful port of PHP fb_groups_index().
export default async function FacebookGroupsPage() {
  const me = await requireUser();
  const groups = await getGroups(me.id);

  return (
    <>
      <AppChrome user={me} active="facebook" />
      <main className="content">
        <h2>Groups</h2>
        <div className="card">
          <h3>Create a group</h3>
          <form action={createGroup}>
            <label>
              Name
              <input name="name" required />
            </label>
            <label>
              Description
              <textarea name="description" />
            </label>
            <label>
              Cover URL
              <input name="cover_url" placeholder="https://picsum.photos/..." />
            </label>
            <button className="btn-facebook">Create</button>
          </form>
        </div>
        <div className="group-grid">
          {groups.map((g) => (
            <div className="card group-card" key={g.id}>
              <div
                className="group-cover"
                style={{
                  backgroundImage: `url('${g.coverUrl || `https://picsum.photos/seed/g${g.id}/600/200`}')`,
                }}
              />
              <h3>
                <Link href={`/facebook/group/${g.id}`}>{g.name}</Link>
              </h3>
              <p className="muted small">{g.members} members</p>
              <p>{g.description}</p>
              {!g.isMember ? (
                <form action={joinGroup} className="inline">
                  <input type="hidden" name="group_id" value={g.id} />
                  <input type="hidden" name="_return" value="/facebook/groups" />
                  <button className="btn-facebook">Join</button>
                </form>
              ) : (
                <span className="muted small">✓ Member</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
