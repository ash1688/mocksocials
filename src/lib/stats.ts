import { and, eq, sql } from "drizzle-orm";

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

/** get_stat(): a single manual stat value (0 if unset). */
export async function getStatValue(
  userId: number,
  platform: Platform,
  key: string,
): Promise<number> {
  const row = (
    await db
      .select({ v: manualStats.statValue })
      .from(manualStats)
      .where(
        and(
          eq(manualStats.userId, userId),
          eq(manualStats.platform, platform),
          eq(manualStats.statKey, key),
        ),
      )
      .limit(1)
  )[0];
  return row?.v ?? 0;
}

/** set_stat(): upsert a single manual stat (PHP ON DUPLICATE KEY UPDATE). */
export async function setStat(
  userId: number,
  platform: Platform,
  key: string,
  value: number,
): Promise<void> {
  await db
    .insert(manualStats)
    .values({ userId, platform, statKey: key, statValue: value })
    .onConflictDoUpdate({
      target: [manualStats.userId, manualStats.platform, manualStats.statKey],
      set: { statValue: value, updatedAt: sql`now()` },
    });
}

export type Preset = "low" | "medium" | "high";

// autofill_preset() ranges (helpers.php) — [min, max] per stat key, per preset.
const AUTOFILL: Record<Platform, Record<Preset, Record<string, [number, number]>>> = {
  twitter: {
    low: { followers: [80, 400], following: [50, 300], impressions: [1000, 8000], profile_visits: [50, 400], mentions: [2, 30] },
    medium: { followers: [2000, 15000], following: [200, 800], impressions: [30000, 180000], profile_visits: [800, 3500], mentions: [40, 250] },
    high: { followers: [50000, 500000], following: [300, 1500], impressions: [500000, 5000000], profile_visits: [10000, 80000], mentions: [500, 5000] },
  },
  facebook: {
    low: { friends: [40, 200], page_likes: [80, 500], reach: [1000, 6000], post_reach: [200, 1500], engagement_rate: [2, 5] },
    medium: { friends: [200, 500], page_likes: [800, 3000], reach: [15000, 60000], post_reach: [3000, 12000], engagement_rate: [3, 7] },
    high: { friends: [800, 2000], page_likes: [20000, 250000], reach: [200000, 2000000], post_reach: [50000, 400000], engagement_rate: [4, 9] },
  },
  instagram: {
    low: { followers: [100, 500], following: [100, 400], impressions: [1000, 9000], reach: [800, 7000], profile_visits: [40, 400], story_views: [80, 800] },
    medium: { followers: [2000, 15000], following: [200, 800], impressions: [30000, 200000], reach: [20000, 150000], profile_visits: [800, 5000], story_views: [1500, 10000] },
    high: { followers: [50000, 500000], following: [300, 1500], impressions: [500000, 5000000], reach: [300000, 4000000], profile_visits: [10000, 80000], story_views: [20000, 200000] },
  },
  youtube: {
    low: { subscribers: [80, 800], total_views: [2000, 20000], watch_time_hours: [40, 500], avg_view_duration: [120, 300], revenue_gbp: [2, 40] },
    medium: { subscribers: [5000, 40000], total_views: [200000, 2000000], watch_time_hours: [8000, 80000], avg_view_duration: [200, 420], revenue_gbp: [300, 3000] },
    high: { subscribers: [80000, 2000000], total_views: [5000000, 80000000], watch_time_hours: [200000, 3000000], avg_view_duration: [300, 600], revenue_gbp: [8000, 160000] },
  },
};

/** autofill_preset(): randomised realistic values for a platform/preset. */
export function autofillPreset(
  platform: Platform,
  preset: Preset,
): Record<string, number> {
  const ranges = AUTOFILL[platform][preset];
  const out: Record<string, number> = {};
  for (const [k, [lo, hi]] of Object.entries(ranges)) {
    out[k] = lo + Math.floor(Math.random() * (hi - lo + 1));
  }
  return out;
}

export type YtProfile = "low" | "moderate" | "high" | "hyped" | "viral";

/** youtube_seed(): random seed metrics for a given stats profile (helpers.php). */
export function youtubeSeed(profile: YtProfile): {
  views: number;
  likes: number;
  comments: number;
  subBoost: number;
} {
  const ranges: Record<YtProfile, [number, number][]> = {
    low: [
      [200, 800],
      [10, 40],
      [2, 8],
      [5, 20],
    ],
    moderate: [
      [5000, 25000],
      [300, 1500],
      [50, 200],
      [50, 300],
    ],
    high: [
      [100000, 500000],
      [8000, 40000],
      [1000, 5000],
      [2000, 10000],
    ],
    hyped: [
      [1000000, 5000000],
      [80000, 400000],
      [10000, 50000],
      [20000, 100000],
    ],
    viral: [
      [10000000, 80000000],
      [500000, 5000000],
      [50000, 500000],
      [100000, 2000000],
    ],
  };
  const r = ranges[profile];
  const pick = ([lo, hi]: [number, number]) =>
    lo + Math.floor(Math.random() * (hi - lo + 1));
  return {
    views: pick(r[0]!),
    likes: pick(r[1]!),
    comments: pick(r[2]!),
    subBoost: pick(r[3]!),
  };
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
