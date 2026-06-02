import { asc, desc, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { db } from "@/db";
import {
  users,
  groups,
  groupMembers,
  manualStats,
  communityNotes,
  posts,
  fakeUsers,
} from "@/db/schema";

export async function listUsers() {
  return db.select().from(users).orderBy(asc(users.id));
}

export async function listGroups() {
  return db
    .select({
      id: groups.id,
      name: groups.name,
      creator: users.displayName,
      members: sql<number>`(select count(*)::int from ${groupMembers} gm where gm.group_id = ${groups.id})`,
    })
    .from(groups)
    .innerJoin(users, eq(users.id, groups.createdBy))
    .orderBy(asc(groups.id));
}

export async function listUsersBasic() {
  return db
    .select({ id: users.id, displayName: users.displayName, username: users.username })
    .from(users)
    .orderBy(asc(users.displayName));
}

export async function listManualStats() {
  return db
    .select({
      userId: manualStats.userId,
      displayName: users.displayName,
      platform: manualStats.platform,
      statKey: manualStats.statKey,
      statValue: manualStats.statValue,
    })
    .from(manualStats)
    .innerJoin(users, eq(users.id, manualStats.userId))
    .orderBy(asc(users.displayName), asc(manualStats.platform), asc(manualStats.statKey));
}

export async function listNotes() {
  const pu = alias(users, "pu");
  const pfu = alias(fakeUsers, "pfu");
  return db
    .select({
      id: communityNotes.id,
      status: communityNotes.status,
      noteText: communityNotes.noteText,
      author: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
      postContent: posts.content,
      poster: sql<string | null>`coalesce(${pu.displayName}, ${pfu.displayName})`,
    })
    .from(communityNotes)
    .leftJoin(users, eq(users.id, communityNotes.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, communityNotes.fakeUserId))
    .innerJoin(posts, eq(posts.id, communityNotes.postId))
    .leftJoin(pu, eq(pu.id, posts.userId))
    .leftJoin(pfu, eq(pfu.id, posts.fakeUserId))
    .orderBy(desc(communityNotes.createdAt));
}

export async function listSessions() {
  return db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      lastActive: users.lastActive,
    })
    .from(users)
    .orderBy(sql`${users.lastActive} desc nulls last`);
}
