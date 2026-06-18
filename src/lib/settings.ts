import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { appSettings } from "@/db/schema";

/** Setting key for the scenario the teacher presents to the whole class. */
export const CLASS_DEMO_KEY = "class_demo_scenario";

export async function getSetting(key: string): Promise<string | null> {
  const row = (
    await db
      .select({ value: appSettings.value })
      .from(appSettings)
      .where(eq(appSettings.key, key))
      .limit(1)
  )[0];
  return row?.value ?? null;
}

/** Upsert a setting (empty string is stored as-is; callers treat "" as unset). */
export async function setSetting(key: string, value: string): Promise<void> {
  await db
    .insert(appSettings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: appSettings.key,
      set: { value, updatedAt: sql`now()` },
    });
}
