import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";

import { db } from "@/db";
import { posts, likes, communityNotes, users, fakeUsers } from "@/db/schema";

const PLATFORM = "twitter" as const;

/** A post row joined to its author (real user OR persona), PHP author_*_sql. */
export type AuthoredPost = {
  id: number;
  userId: number | null;
  fakeUserId: number | null;
  content: string | null;
  quoteText: string | null;
  parentId: number | null;
  createdAt: Date;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
};

const authoredColumns = {
  id: posts.id,
  userId: posts.userId,
  fakeUserId: posts.fakeUserId,
  content: posts.content,
  quoteText: posts.quoteText,
  parentId: posts.parentId,
  createdAt: posts.createdAt,
  username: sql<string | null>`coalesce(${users.username}, ${fakeUsers.username})`,
  displayName: sql<
    string | null
  >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
  avatarUrl: sql<
    string | null
  >`coalesce(${users.avatarUrl}, ${fakeUsers.avatarUrl})`,
};

function authoredBase() {
  return db
    .select(authoredColumns)
    .from(posts)
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, posts.fakeUserId));
}

/** A fully-hydrated tweet ready to render (engagement targets the original). */
export type FeedItem = {
  rowId: number;
  isRetweet: boolean; // pure RT (parent, no quote text)
  isQuote: boolean; // quote/reply (parent + quote text)
  retweeter: {
    displayName: string | null;
    username: string | null;
    avatarUrl: string | null;
    userId: number | null;
    fakeUserId: number | null;
    createdAt: Date;
    quoteText: string | null;
  } | null;
  post: AuthoredPost; // the displayPost (parent for RT/quote, else self)
  likeCount: number;
  myLike: boolean;
  rtCount: number;
  notes: { displayName: string | null; noteText: string }[];
};

/** Hydrate a list of authored feed rows into render-ready items. */
async function hydrate(
  rows: AuthoredPost[],
  meId: number,
): Promise<FeedItem[]> {
  // Resolve parents for retweets/quotes.
  const parentIds = [
    ...new Set(rows.map((r) => r.parentId).filter((x): x is number => !!x)),
  ];
  const parents = new Map<number, AuthoredPost>();
  if (parentIds.length) {
    const prows = await authoredBase().where(inArray(posts.id, parentIds));
    for (const p of prows) parents.set(p.id, p);
  }

  const items = rows.map((row) => {
    const parent = row.parentId ? parents.get(row.parentId) : undefined;
    const display = parent ?? row;
    const isRetweet = !!row.parentId && !row.quoteText;
    const isQuote = !!row.parentId && !!row.quoteText;
    return { row, display, isRetweet, isQuote };
  });

  const displayIds = [...new Set(items.map((i) => i.display.id))];
  if (!displayIds.length) return [];

  // Batched engagement counts.
  const likeRows = await db
    .select({ postId: likes.postId, c: sql<number>`count(*)::int` })
    .from(likes)
    .where(inArray(likes.postId, displayIds))
    .groupBy(likes.postId);
  const likeCounts = new Map(likeRows.map((r) => [r.postId, r.c]));

  const myLikeRows = await db
    .select({ postId: likes.postId })
    .from(likes)
    .where(and(inArray(likes.postId, displayIds), eq(likes.userId, meId)));
  const myLikes = new Set(myLikeRows.map((r) => r.postId));

  const rtRows = await db
    .select({ parentId: posts.parentId, c: sql<number>`count(*)::int` })
    .from(posts)
    .where(
      and(inArray(posts.parentId, displayIds), isNull(posts.quoteText)),
    )
    .groupBy(posts.parentId);
  const rtCounts = new Map(
    rtRows.map((r) => [r.parentId as number, r.c]),
  );

  const noteRows = await db
    .select({
      postId: communityNotes.postId,
      noteText: communityNotes.noteText,
      displayName: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
    })
    .from(communityNotes)
    .leftJoin(users, eq(users.id, communityNotes.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, communityNotes.fakeUserId))
    .where(
      and(
        inArray(communityNotes.postId, displayIds),
        eq(communityNotes.status, "visible"),
      ),
    )
    .orderBy(communityNotes.createdAt);
  const notesByPost = new Map<
    number,
    { displayName: string | null; noteText: string }[]
  >();
  for (const n of noteRows) {
    const arr = notesByPost.get(n.postId) ?? [];
    arr.push({ displayName: n.displayName, noteText: n.noteText });
    notesByPost.set(n.postId, arr);
  }

  return items.map(({ row, display, isRetweet, isQuote }) => ({
    rowId: row.id,
    isRetweet,
    isQuote,
    retweeter:
      isRetweet || isQuote
        ? {
            displayName: row.displayName,
            username: row.username,
            avatarUrl: row.avatarUrl,
            userId: row.userId,
            fakeUserId: row.fakeUserId,
            createdAt: row.createdAt,
            quoteText: row.quoteText,
          }
        : null,
    post: display,
    likeCount: likeCounts.get(display.id) ?? 0,
    myLike: myLikes.has(display.id),
    rtCount: rtCounts.get(display.id) ?? 0,
    notes: notesByPost.get(display.id) ?? [],
  }));
}

/** Feed: latest 50 tweets (PHP twitter_feed). */
export async function getFeed(meId: number): Promise<FeedItem[]> {
  const rows = await authoredBase()
    .where(eq(posts.platform, PLATFORM))
    .orderBy(desc(posts.createdAt))
    .limit(50);
  return hydrate(rows, meId);
}

/** Hashtag view: tweets containing #tag (PHP twitter_hashtag). */
export async function getHashtagPosts(
  tag: string,
  meId: number,
): Promise<FeedItem[]> {
  const rows = await authoredBase()
    .where(
      and(
        eq(posts.platform, PLATFORM),
        sql`lower(${posts.content}) like ${"%#" + tag.toLowerCase() + "%"}`,
      ),
    )
    .orderBy(desc(posts.createdAt))
    .limit(100);
  return hydrate(rows, meId);
}

/** Top 5 trending hashtags across all tweets (PHP twitter_trending). */
export async function getTrending(): Promise<{ tag: string; count: number }[]> {
  const rows = await db
    .select({ content: posts.content })
    .from(posts)
    .where(and(eq(posts.platform, PLATFORM), sql`${posts.content} is not null`));
  const counts = new Map<string, number>();
  for (const r of rows) {
    for (const tag of findHashtags(r.content ?? "")) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));
}

/** Posts authored by a real user, hydrated (profile view). */
export async function getUserPosts(
  userId: number,
  meId: number,
): Promise<FeedItem[]> {
  const rows = await authoredBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.userId, userId)))
    .orderBy(desc(posts.createdAt));
  return hydrate(rows, meId);
}

/** Posts authored by a persona, hydrated (profile view). */
export async function getFakeUserPosts(
  fakeUserId: number,
  meId: number,
): Promise<FeedItem[]> {
  const rows = await authoredBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.fakeUserId, fakeUserId)))
    .orderBy(desc(posts.createdAt));
  return hydrate(rows, meId);
}

/** Analytics counts (PHP twitter_analytics). */
export async function getAnalytics(meId: number) {
  const myTweets = (
    await db
      .select({ c: sql<number>`count(*)::int` })
      .from(posts)
      .where(
        and(
          eq(posts.platform, PLATFORM),
          eq(posts.userId, meId),
          isNull(posts.parentId),
        ),
      )
  )[0]!.c;

  const myLikes = (
    await db
      .select({ c: sql<number>`count(*)::int` })
      .from(likes)
      .innerJoin(posts, eq(posts.id, likes.postId))
      .where(and(eq(posts.userId, meId), eq(posts.platform, PLATFORM)))
  )[0]!.c;

  return { myTweets, myLikes };
}

/** find_hashtags(): lowercase hashtags in a string. */
export function findHashtags(text: string): string[] {
  const m = text.match(/#([\p{L}0-9_]+)/gu) ?? [];
  return m.map((h) => h.slice(1).toLowerCase());
}
