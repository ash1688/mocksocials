import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { manualStats } from "@/db/schema";

export type Platform = "twitter" | "facebook" | "instagram" | "youtube";

/** stat_keys() per platform (helpers.php). */
export const STAT_KEYS: Record<Platform, string[]> = {
  twitter: ["followers", "following", "impressions", "profile_visits", "mentions"],
  facebook: ["friends", "page_likes", "reach", "post_reach", "engagement_rate"],
  instagram: [
    "followers",
    "following",
    "impressions",
    "reach",
    "profile_visits",
    "story_views",
  ],
  youtube: [
    "subscribers",
    "total_views",
    "watch_time_hours",
    "avg_view_duration",
    "revenue_gbp",
  ],
};

/** all_stats(): a real user's manual stats for a platform, missing keys -> 0. */
export async function getUserStats(
  userId: number,
  platform: Platform,
): Promise<Record<string, number>> {
  const rows = await db
    .select({ statKey: manualStats.statKey, statValue: manualStats.statValue })
    .from(manualStats)
    .where(
      and(eq(manualStats.userId, userId), eq(manualStats.platform, platform)),
    );
  const map: Record<string, number> = {};
  for (const k of STAT_KEYS[platform]) map[k] = 0;
  for (const r of rows) map[r.statKey] = r.statValue;
  return map;
}

// CRC-32 (IEEE) — matches PHP crc32() so persona stats are stable & comparable.
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(str: string): number {
  let crc = 0xffffffff;
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ str.charCodeAt(i)) & 0xff]!;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Deterministic pseudo-random stats per (persona, platform) so persona profile
 * numbers don't reshuffle on every load. Faithful port of fake_user_stats().
 */
export function fakeUserStats(
  fakeId: number,
  platform: Platform,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const k of STAT_KEYS[platform]) {
    const h = crc32(`${fakeId}|${platform}|${k}`);
    const r = (h % 100000) / 100000;
    if (
      k.includes("follow") ||
      k.includes("friend") ||
      k.includes("subscribers") ||
      k === "page_likes"
    ) {
      out[k] = Math.round(200 + r * 50000);
    } else if (
      k.includes("view") ||
      k.includes("reach") ||
      k.includes("impressions")
    ) {
      out[k] = Math.round(2000 + r * 500000);
    } else if (k === "engagement_rate") {
      out[k] = Math.round(2 + r * 8);
    } else if (k === "revenue_gbp") {
      out[k] = Math.round(r * 4000);
    } else if (k === "watch_time_hours") {
      out[k] = Math.round(50 + r * 20000);
    } else if (k === "avg_view_duration") {
      out[k] = Math.round(120 + r * 360);
    } else {
      out[k] = Math.round(20 + r * 1500);
    }
  }
  return out;
}
