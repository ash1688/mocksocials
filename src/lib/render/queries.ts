import { and, eq, desc, asc, or, isNull } from "drizzle-orm";

import { db } from "@/db";
import {
  posts,
  postMetrics,
  metricSnapshots,
  comments,
  personas,
  simulations,
  organisations,
  workspaces,
} from "@/db/schema";
import type { Platform } from "@/lib/simulation/types";
import type { HintChip } from "@/lib/simulation/hints";

export interface FeedPost {
  id: string;
  authorKind: "organisation" | "persona";
  authorName: string;
  authorHandle: string;
  body: string;
  hasImage: boolean;
  hasVideo: boolean;
  durationSeconds: number | null;
  hashtags: string[];
  callToAction: boolean;
  postingDay: number | null;
  postingMinute: number | null;
  isSeeded: boolean;
  // Engagement from the single latest simulation snapshot (0 if unsimulated).
  likes: number;
  shares: number;
  comments: number;
  reach: number;
  hints: HintChip[];
}

/** The Organisation's branding for the render header. */
export async function getOrganisationForWorkspace(workspaceId: string) {
  const [row] = await db
    .select({ org: organisations })
    .from(workspaces)
    .innerJoin(organisations, eq(workspaces.organisationId, organisations.id))
    .where(eq(workspaces.id, workspaceId))
    .limit(1);
  return row?.org ?? null;
}

/** The id of the latest simulation for a campaign (single-snapshot rule). */
async function latestSimId(campaignId: string): Promise<string | null> {
  const [row] = await db
    .select({ id: simulations.id })
    .from(simulations)
    .where(eq(simulations.campaignId, campaignId))
    .orderBy(desc(simulations.stepIndex))
    .limit(1);
  return row?.id ?? null;
}

/**
 * The feed for one platform of a campaign: the Organisation's own posts plus the
 * seeded community backdrop (workspace-level persona posts), each with its
 * latest-snapshot engagement (ADR-0005). Newest first.
 */
export async function getPlatformFeed(
  campaignId: string,
  workspaceId: string,
  platform: Platform,
): Promise<FeedPost[]> {
  const simId = await latestSimId(campaignId);

  const rows = await db
    .select({
      post: posts,
      personaName: personas.displayName,
      personaHandle: personas.handle,
      m: postMetrics,
    })
    .from(posts)
    .leftJoin(personas, eq(posts.personaId, personas.id))
    .leftJoin(
      postMetrics,
      simId
        ? and(eq(postMetrics.postId, posts.id), eq(postMetrics.simulationId, simId))
        : // no simulation yet — force no match so engagement reads zero
          and(eq(postMetrics.postId, posts.id), isNull(postMetrics.id)),
    )
    .where(
      and(
        eq(posts.platform, platform),
        eq(posts.workspaceId, workspaceId),
        // Organisation posts of this campaign, or seeded community backdrop.
        or(
          eq(posts.campaignId, campaignId),
          and(eq(posts.isSeeded, true), isNull(posts.campaignId)),
        ),
      ),
    )
    .orderBy(desc(posts.publishedOn), desc(posts.createdAt));

  return rows.map((r) => toFeedPost(r));
}

/** Latest-snapshot audience figure for a platform header (followers/subscribers). */
export async function getPlatformAudience(
  campaignId: string,
  platform: Platform,
): Promise<number> {
  const simId = await latestSimId(campaignId);
  if (!simId) return 0;
  const [row] = await db
    .select({ value: metricSnapshots.value })
    .from(metricSnapshots)
    .where(
      and(
        eq(metricSnapshots.simulationId, simId),
        eq(metricSnapshots.platform, platform),
        eq(metricSnapshots.metric, "followers"),
      ),
    )
    .limit(1);
  return row?.value ?? 0;
}

/** A single post with its comment thread (S3 detail). */
export async function getPostDetail(postId: string, workspaceId: string) {
  const simIdRows = await db
    .select({ campaignId: posts.campaignId })
    .from(posts)
    .where(and(eq(posts.id, postId), eq(posts.workspaceId, workspaceId)))
    .limit(1);
  if (simIdRows.length === 0) return null;

  const campaignId = simIdRows[0]!.campaignId;
  const simId = campaignId ? await latestSimId(campaignId) : null;

  const [row] = await db
    .select({
      post: posts,
      personaName: personas.displayName,
      personaHandle: personas.handle,
      m: postMetrics,
    })
    .from(posts)
    .leftJoin(personas, eq(posts.personaId, personas.id))
    .leftJoin(
      postMetrics,
      simId
        ? and(eq(postMetrics.postId, posts.id), eq(postMetrics.simulationId, simId))
        : and(eq(postMetrics.postId, posts.id), isNull(postMetrics.id)),
    )
    .where(eq(posts.id, postId))
    .limit(1);
  if (!row) return null;

  const thread = await db
    .select({
      id: comments.id,
      parentId: comments.parentId,
      authorKind: comments.authorKind,
      body: comments.body,
      personaName: personas.displayName,
      personaHandle: personas.handle,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .leftJoin(personas, eq(comments.personaId, personas.id))
    .where(eq(comments.postId, postId))
    .orderBy(asc(comments.createdAt));

  return { post: toFeedPost(row), thread };
}

type RawRow = {
  post: typeof posts.$inferSelect;
  personaName: string | null;
  personaHandle: string | null;
  m: typeof postMetrics.$inferSelect | null;
};

function toFeedPost(r: RawRow): FeedPost {
  const p = r.post;
  const isOrg = p.authorKind === "organisation";
  return {
    id: p.id,
    authorKind: p.authorKind,
    authorName: isOrg ? "Organisation" : r.personaName ?? "Someone",
    authorHandle: isOrg ? "organisation" : r.personaHandle ?? "someone",
    body: p.body,
    hasImage: p.hasImage,
    hasVideo: p.hasVideo,
    durationSeconds: p.durationSeconds,
    hashtags: p.hashtags,
    callToAction: p.callToAction,
    postingDay: p.postingDay,
    postingMinute: p.postingMinute,
    isSeeded: p.isSeeded,
    likes: r.m?.likes ?? 0,
    shares: r.m?.shares ?? 0,
    comments: r.m?.comments ?? 0,
    reach: r.m?.reach ?? 0,
    hints: r.m?.hints ?? [],
  };
}
