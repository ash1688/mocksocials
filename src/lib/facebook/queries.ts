import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";

import { db } from "@/db";
import {
  posts,
  likes,
  comments,
  users,
  fakeUsers,
  groups,
  groupMembers,
} from "@/db/schema";

const PLATFORM = "facebook" as const;

export type FbComment = {
  displayName: string | null;
  avatarUrl: string | null;
  userId: number | null;
  fakeUserId: number | null;
  content: string;
  createdAt: Date;
};

export type FbPost = {
  id: number;
  userId: number | null;
  fakeUserId: number | null;
  content: string | null;
  imageUrl: string | null;
  groupId: number | null;
  groupName: string | null;
  createdAt: Date;
  authorName: string | null;
  authorUsername: string | null;
  authorAvatar: string | null;
  likeCount: number;
  myLike: boolean;
  comments: FbComment[];
};

const postColumns = {
  id: posts.id,
  userId: posts.userId,
  fakeUserId: posts.fakeUserId,
  content: posts.content,
  imageUrl: posts.imageUrl,
  groupId: posts.groupId,
  createdAt: posts.createdAt,
  authorName: sql<
    string | null
  >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
  authorUsername: sql<
    string | null
  >`coalesce(${users.username}, ${fakeUsers.username})`,
  authorAvatar: sql<
    string | null
  >`coalesce(${users.avatarUrl}, ${fakeUsers.avatarUrl})`,
  groupName: groups.name,
};

function postsBase() {
  return db
    .select(postColumns)
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, posts.fakeUserId))
    .leftJoin(groups, eq(groups.id, posts.groupId));
}

type RawPost = Awaited<ReturnType<ReturnType<typeof postsBase>["where"]>>[number];

/** Attach like counts, my-like and comments to a list of posts (batched). */
async function hydrate(rows: RawPost[], meId: number): Promise<FbPost[]> {
  const ids = [...new Set(rows.map((r) => r.id))];
  if (!ids.length) return [];

  const likeRows = await db
    .select({ postId: likes.postId, c: sql<number>`count(*)::int` })
    .from(likes)
    .where(inArray(likes.postId, ids))
    .groupBy(likes.postId);
  const likeCounts = new Map(likeRows.map((r) => [r.postId, r.c]));

  const myLikeRows = await db
    .select({ postId: likes.postId })
    .from(likes)
    .where(and(inArray(likes.postId, ids), eq(likes.userId, meId)));
  const myLikes = new Set(myLikeRows.map((r) => r.postId));

  const commentRows = await db
    .select({
      postId: comments.postId,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      fakeUserId: comments.fakeUserId,
      displayName: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
      avatarUrl: sql<
        string | null
      >`coalesce(${users.avatarUrl}, ${fakeUsers.avatarUrl})`,
    })
    .from(comments)
    .leftJoin(users, eq(users.id, comments.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, comments.fakeUserId))
    .where(inArray(comments.postId, ids))
    .orderBy(asc(comments.createdAt));
  const byPost = new Map<number, FbComment[]>();
  for (const c of commentRows) {
    const arr = byPost.get(c.postId) ?? [];
    arr.push({
      displayName: c.displayName,
      avatarUrl: c.avatarUrl,
      userId: c.userId,
      fakeUserId: c.fakeUserId,
      content: c.content,
      createdAt: c.createdAt,
    });
    byPost.set(c.postId, arr);
  }

  return rows.map((r) => ({
    ...r,
    likeCount: likeCounts.get(r.id) ?? 0,
    myLike: myLikes.has(r.id),
    comments: byPost.get(r.id) ?? [],
  }));
}

export async function getFeed(meId: number): Promise<FbPost[]> {
  const rows = await postsBase()
    .where(eq(posts.platform, PLATFORM))
    .orderBy(desc(posts.createdAt))
    .limit(50);
  return hydrate(rows, meId);
}

export async function getUserPosts(userId: number, meId: number) {
  const rows = await postsBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.userId, userId)))
    .orderBy(desc(posts.createdAt));
  return hydrate(rows, meId);
}

export async function getFakeUserPosts(fakeUserId: number, meId: number) {
  const rows = await postsBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.fakeUserId, fakeUserId)))
    .orderBy(desc(posts.createdAt));
  return hydrate(rows, meId);
}

export async function getGroupPosts(groupId: number, meId: number) {
  const rows = await postsBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.groupId, groupId)))
    .orderBy(desc(posts.createdAt));
  return hydrate(rows, meId);
}

export type Friend = {
  id: number;
  displayName: string;
  avatarUrl: string | null;
};

/** fb_friend_list(): all other non-admin students are "friends". */
export async function getFriends(uid: number): Promise<Friend[]> {
  return db
    .select({
      id: users.id,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(and(ne(users.id, uid), eq(users.isAdmin, false)))
    .orderBy(asc(users.displayName));
}

/** Persona "friends" — 8 other personas (stable by id, not RAND for determinism). */
export async function getFakeFriends(fakeId: number): Promise<Friend[]> {
  return db
    .select({
      id: fakeUsers.id,
      displayName: fakeUsers.displayName,
      avatarUrl: fakeUsers.avatarUrl,
    })
    .from(fakeUsers)
    .where(ne(fakeUsers.id, fakeId))
    .orderBy(asc(fakeUsers.id))
    .limit(8);
}

export type GroupCard = {
  id: number;
  name: string;
  description: string | null;
  coverUrl: string | null;
  members: number;
  isMember: boolean;
};

export async function getGroups(meId: number): Promise<GroupCard[]> {
  const rows = await db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      coverUrl: groups.coverUrl,
      members: sql<number>`(select count(*)::int from ${groupMembers} gm where gm.group_id = ${groups.id})`,
      isMember: sql<boolean>`exists (select 1 from ${groupMembers} gm where gm.group_id = ${groups.id} and gm.user_id = ${meId})`,
    })
    .from(groups)
    .orderBy(desc(groups.createdAt));
  return rows;
}

export type GroupDetail = {
  id: number;
  name: string;
  description: string | null;
  coverUrl: string | null;
  isMember: boolean;
  members: { id: number; displayName: string; avatarUrl: string | null; role: string }[];
};

export async function getGroup(
  groupId: number,
  meId: number,
): Promise<GroupDetail | null> {
  const g = (
    await db.select().from(groups).where(eq(groups.id, groupId)).limit(1)
  )[0];
  if (!g) return null;

  const members = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
      role: groupMembers.role,
    })
    .from(groupMembers)
    .innerJoin(users, eq(users.id, groupMembers.userId))
    .where(eq(groupMembers.groupId, groupId));

  return {
    id: g.id,
    name: g.name,
    description: g.description,
    coverUrl: g.coverUrl,
    isMember: members.some((m) => m.id === meId),
    members,
  };
}
