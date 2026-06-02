import { and, desc, eq, isNull, ne, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { manualStats, likes, posts, users, fakeUsers } from "@/db/schema";

/** All manual stat values for a user, keyed "platform:stat_key" (PHP get_stat). */
export async function getStatMap(
  userId: number,
): Promise<Record<string, number>> {
  const rows = await db
    .select({
      platform: manualStats.platform,
      statKey: manualStats.statKey,
      statValue: manualStats.statValue,
    })
    .from(manualStats)
    .where(eq(manualStats.userId, userId));
  const map: Record<string, number> = {};
  for (const r of rows) map[`${r.platform}:${r.statKey}`] = r.statValue;
  return map;
}

export type RecentLike = {
  platform: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: Date;
};

/**
 * Most recent like received on any of my posts, by someone other than me
 * (real or persona liker). PHP home.php $recentLike.
 */
export async function getRecentLike(
  userId: number,
): Promise<RecentLike | null> {
  const rows = await db
    .select({
      platform: posts.platform,
      createdAt: likes.createdAt,
      displayName: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
      avatarUrl: sql<
        string | null
      >`coalesce(${users.avatarUrl}, ${fakeUsers.avatarUrl})`,
    })
    .from(likes)
    .innerJoin(posts, eq(posts.id, likes.postId))
    .leftJoin(users, eq(users.id, likes.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, likes.fakeUserId))
    .where(
      and(
        eq(posts.userId, userId),
        or(isNull(likes.userId), ne(likes.userId, userId)),
      ),
    )
    .orderBy(desc(likes.createdAt))
    .limit(1);

  return rows[0] ?? null;
}
