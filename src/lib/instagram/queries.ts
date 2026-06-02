import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";

import { db } from "@/db";
import { posts, likes, comments, users, fakeUsers } from "@/db/schema";

const PLATFORM = "instagram" as const;

export type IgComment = { displayName: string | null; content: string };

export type IgPost = {
  id: number;
  userId: number | null;
  fakeUserId: number | null;
  content: string | null; // caption
  imageUrl: string | null;
  createdAt: Date;
  authorName: string | null;
  authorUsername: string | null;
  authorAvatar: string | null;
  likeCount: number;
  myLike: boolean;
  comments: IgComment[];
};

const postColumns = {
  id: posts.id,
  userId: posts.userId,
  fakeUserId: posts.fakeUserId,
  content: posts.content,
  imageUrl: posts.imageUrl,
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
};

function postsBase() {
  return db
    .select(postColumns)
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, posts.fakeUserId));
}

type RawPost = Awaited<ReturnType<ReturnType<typeof postsBase>["where"]>>[number];

/** Attach likes + up to 3 comments per post (PHP ig_render_post). */
async function hydrate(rows: RawPost[], meId: number): Promise<IgPost[]> {
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
      displayName: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
    })
    .from(comments)
    .leftJoin(users, eq(users.id, comments.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, comments.fakeUserId))
    .where(inArray(comments.postId, ids))
    .orderBy(asc(comments.createdAt));
  const byPost = new Map<number, IgComment[]>();
  for (const c of commentRows) {
    const arr = byPost.get(c.postId) ?? [];
    if (arr.length < 3) arr.push({ displayName: c.displayName, content: c.content });
    byPost.set(c.postId, arr);
  }

  return rows.map((r) => ({
    ...r,
    likeCount: likeCounts.get(r.id) ?? 0,
    myLike: myLikes.has(r.id),
    comments: byPost.get(r.id) ?? [],
  }));
}

/** Feed: latest 30 image posts (PHP ig_feed). */
export async function getFeed(meId: number): Promise<IgPost[]> {
  const rows = await postsBase()
    .where(and(eq(posts.platform, PLATFORM), ne(posts.imageUrl, "")))
    .orderBy(desc(posts.createdAt))
    .limit(30);
  return hydrate(rows, meId);
}

/** Single post (PHP ig_view). */
export async function getPost(id: number, meId: number): Promise<IgPost | null> {
  const rows = await postsBase().where(eq(posts.id, id));
  const out = await hydrate(rows, meId);
  return out[0] ?? null;
}

export type GridTile = { id: number; imageUrl: string | null };

/** Explore: image posts as a grid (PHP ig_explore). */
export async function getExplore(): Promise<GridTile[]> {
  return db
    .select({ id: posts.id, imageUrl: posts.imageUrl })
    .from(posts)
    .where(and(eq(posts.platform, PLATFORM), ne(posts.imageUrl, "")))
    .orderBy(desc(posts.createdAt))
    .limit(30);
}

export async function getUserGrid(userId: number): Promise<GridTile[]> {
  return db
    .select({ id: posts.id, imageUrl: posts.imageUrl })
    .from(posts)
    .where(
      and(
        eq(posts.platform, PLATFORM),
        eq(posts.userId, userId),
        ne(posts.imageUrl, ""),
      ),
    )
    .orderBy(desc(posts.createdAt));
}

export async function getFakeUserGrid(fakeUserId: number): Promise<GridTile[]> {
  return db
    .select({ id: posts.id, imageUrl: posts.imageUrl })
    .from(posts)
    .where(
      and(
        eq(posts.platform, PLATFORM),
        eq(posts.fakeUserId, fakeUserId),
        ne(posts.imageUrl, ""),
      ),
    )
    .orderBy(desc(posts.createdAt));
}

export type Story = {
  id: number;
  displayName: string;
  avatarUrl: string | null;
};

/** Story bar — 8 personas (PHP ig_story_bar; stable by id, not RAND). */
export async function getStoryBar(): Promise<Story[]> {
  return db
    .select({
      id: fakeUsers.id,
      displayName: fakeUsers.displayName,
      avatarUrl: fakeUsers.avatarUrl,
    })
    .from(fakeUsers)
    .orderBy(asc(fakeUsers.id))
    .limit(8);
}
