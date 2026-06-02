import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { posts, youtubeMeta, likes, comments, users, fakeUsers } from "@/db/schema";
import { getStatValue, fakeUserStats } from "@/lib/stats";

const PLATFORM = "youtube" as const;

export type YtVideo = {
  postId: number;
  userId: number | null;
  fakeUserId: number | null;
  content: string | null;
  createdAt: Date;
  videoTitle: string;
  thumbnailUrl: string | null;
  durationDisplay: string | null;
  statsProfile: string;
  seedViews: number;
  seedLikes: number;
  seedComments: number;
  authorName: string | null;
  authorUsername: string | null;
  authorAvatar: string | null;
};

const videoColumns = {
  postId: youtubeMeta.postId,
  userId: posts.userId,
  fakeUserId: posts.fakeUserId,
  content: posts.content,
  createdAt: posts.createdAt,
  videoTitle: youtubeMeta.videoTitle,
  thumbnailUrl: youtubeMeta.thumbnailUrl,
  durationDisplay: youtubeMeta.durationDisplay,
  statsProfile: youtubeMeta.statsProfile,
  seedViews: youtubeMeta.seedViews,
  seedLikes: youtubeMeta.seedLikes,
  seedComments: youtubeMeta.seedComments,
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

function videosBase() {
  return db
    .select(videoColumns)
    .from(posts)
    .innerJoin(youtubeMeta, eq(youtubeMeta.postId, posts.id))
    .leftJoin(users, eq(users.id, posts.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, posts.fakeUserId));
}

/** Feed: latest 50 videos (PHP yt_feed). */
export async function getFeed(): Promise<YtVideo[]> {
  return videosBase()
    .where(eq(posts.platform, PLATFORM))
    .orderBy(desc(posts.createdAt))
    .limit(50);
}

export async function getUserVideos(userId: number): Promise<YtVideo[]> {
  return videosBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.userId, userId)))
    .orderBy(desc(posts.createdAt));
}

export async function getFakeUserVideos(fakeId: number): Promise<YtVideo[]> {
  return videosBase()
    .where(and(eq(posts.platform, PLATFORM), eq(posts.fakeUserId, fakeId)))
    .orderBy(desc(posts.createdAt));
}

export type YtWatch = {
  video: YtVideo;
  likeCount: number; // real likes + seed
  myLike: boolean;
  channelSubs: number;
  comments: {
    displayName: string | null;
    avatarUrl: string | null;
    userId: number | null;
    fakeUserId: number | null;
    content: string;
    createdAt: Date;
  }[];
  commentCount: number; // real comments + seed
};

/** Watch page data (PHP yt_watch). */
export async function getWatch(
  id: number,
  meId: number,
): Promise<YtWatch | null> {
  const video = (await videosBase().where(eq(posts.id, id)))[0];
  if (!video) return null;

  const realLikes = (
    await db
      .select({ c: sql<number>`count(*)::int` })
      .from(likes)
      .where(eq(likes.postId, id))
  )[0]!.c;

  const myLike =
    (
      await db
        .select({ id: likes.id })
        .from(likes)
        .where(and(eq(likes.postId, id), eq(likes.userId, meId)))
        .limit(1)
    ).length > 0;

  const commentRows = await db
    .select({
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
    .where(eq(comments.postId, id))
    .orderBy(desc(comments.createdAt));

  const channelSubs = video.userId
    ? await getStatValue(video.userId, "youtube", "subscribers")
    : video.fakeUserId
      ? fakeUserStats(video.fakeUserId, "youtube").subscribers ?? 0
      : 0;

  return {
    video,
    likeCount: realLikes + video.seedLikes,
    myLike,
    channelSubs,
    comments: commentRows,
    commentCount: commentRows.length + video.seedComments,
  };
}
