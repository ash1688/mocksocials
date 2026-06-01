import { and, eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";

export type Post = typeof posts.$inferSelect;

/** Organisation-authored posts for a campaign (the Student's own content),
 *  newest first. Excludes the seeded community backdrop. */
export function listCampaignPosts(campaignId: string) {
  return db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.campaignId, campaignId),
        eq(posts.authorKind, "organisation"),
        eq(posts.isSeeded, false),
      ),
    )
    .orderBy(desc(posts.createdAt));
}
