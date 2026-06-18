import { and, eq, isNotNull, sql } from "drizzle-orm";

import { db } from "@/db";
import { scenarioResponses } from "@/db/schema";

export interface PriorResponse {
  taskId: string;
  selectedIndex: number | null;
  responseText: string | null;
  teacherFeedback: string | null;
}

/** Load the current student's saved answers (and any teacher feedback) for a
 *  scenario, so the Tasks panel can pre-fill their work and show advice back. */
export async function getMyScenarioResponses(
  userId: number,
  scenarioId: string,
): Promise<PriorResponse[]> {
  return db
    .select({
      taskId: scenarioResponses.taskId,
      selectedIndex: scenarioResponses.selectedIndex,
      responseText: scenarioResponses.responseText,
      teacherFeedback: scenarioResponses.teacherFeedback,
    })
    .from(scenarioResponses)
    .where(
      and(
        eq(scenarioResponses.userId, userId),
        eq(scenarioResponses.scenarioId, scenarioId),
      ),
    );
}

/** Per-scenario count of how many tasks the user has answered — used to mark
 *  scenarios as completed / in-progress on the index lists. */
export async function getMyScenarioProgress(
  userId: number,
): Promise<Record<string, number>> {
  const rows = await db
    .select({
      scenarioId: scenarioResponses.scenarioId,
      answered: sql<number>`count(*)::int`,
    })
    .from(scenarioResponses)
    .where(eq(scenarioResponses.userId, userId))
    .groupBy(scenarioResponses.scenarioId);
  const map: Record<string, number> = {};
  for (const r of rows) map[r.scenarioId] = r.answered;
  return map;
}

/** How many of a student's answers have unseen teacher feedback — drives the
 *  "new feedback" badge in the top nav. */
export async function countUnreadFeedback(userId: number): Promise<number> {
  const rows = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(scenarioResponses)
    .where(
      and(
        eq(scenarioResponses.userId, userId),
        isNotNull(scenarioResponses.teacherFeedback),
        eq(scenarioResponses.feedbackSeen, false),
      ),
    );
  return rows[0]?.n ?? 0;
}
