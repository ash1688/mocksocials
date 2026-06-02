import { eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { scheduleEntries } from "@/db/schema";

export type ScheduleEntry = typeof scheduleEntries.$inferSelect;

/** The Content schedule entries for a campaign, ordered for a clean read. */
export function listScheduleEntries(campaignId: string) {
  return db
    .select()
    .from(scheduleEntries)
    .where(eq(scheduleEntries.campaignId, campaignId))
    .orderBy(asc(scheduleEntries.platform), asc(scheduleEntries.postingDay));
}
