"use server";

import { and, eq, isNotNull, sql } from "drizzle-orm";

import { db } from "@/db";
import { scenarioResponses } from "@/db/schema";
import { requireUser } from "@/lib/auth/guards";

import type { ScenarioTask } from "./red-bull";
import { SCENARIOS } from "./registry";

/** One answer coming from the client. `value` is the chosen option index for an
 *  MCQ, or the free text for a written task. */
export interface SubmittedAnswer {
  taskId: string;
  value: number | string;
}

/** The graded result returned to the client so it can reveal answers at the end
 *  (correctIndex/explanation are NOT sent before submission). */
export interface GradedTask {
  taskId: string;
  type: ScenarioTask["type"];
  correct?: boolean; // MCQ only
  correctIndex?: number; // MCQ only — revealed now
  explanation?: string; // MCQ only — revealed now
}

export interface SaveResult {
  ok: boolean;
  graded: GradedTask[];
  score?: { correct: number; total: number };
  error?: string;
}

/**
 * Persist a student's answers for a scenario's tasks and return server-side
 * grading so the UI can reveal all answers at once. Upserts per task so a
 * student may revise and resubmit. Teaching-only — never touches scoring/evidence.
 */
export async function saveScenarioResponses(
  scenarioId: string,
  answers: SubmittedAnswer[],
): Promise<SaveResult> {
  const me = await requireUser();

  const scenario = SCENARIOS[scenarioId];
  if (!scenario?.tasks?.length) {
    return { ok: false, graded: [], error: "Unknown scenario or no tasks." };
  }

  const tasksById = new Map(scenario.tasks.map((t) => [t.id, t]));
  const graded: GradedTask[] = [];
  let correctCount = 0;
  let mcqTotal = 0;

  for (const answer of answers) {
    const task = tasksById.get(answer.taskId);
    if (!task) continue; // ignore unknown task ids

    if (task.type === "mcq") {
      mcqTotal += 1;
      const selectedIndex =
        typeof answer.value === "number" ? answer.value : Number(answer.value);
      const isCorrect = selectedIndex === task.correctIndex;
      if (isCorrect) correctCount += 1;

      await db
        .insert(scenarioResponses)
        .values({
          userId: me.id,
          scenarioId,
          taskId: task.id,
          selectedIndex: Number.isInteger(selectedIndex) ? selectedIndex : null,
          isCorrect,
          responseText: null,
        })
        .onConflictDoUpdate({
          target: [
            scenarioResponses.userId,
            scenarioResponses.scenarioId,
            scenarioResponses.taskId,
          ],
          set: {
            selectedIndex: Number.isInteger(selectedIndex) ? selectedIndex : null,
            isCorrect,
            responseText: null,
            submittedAt: sql`now()`,
          },
        });

      graded.push({
        taskId: task.id,
        type: "mcq",
        correct: isCorrect,
        correctIndex: task.correctIndex,
        explanation: task.explanation,
      });
    } else {
      const text = typeof answer.value === "string" ? answer.value.trim() : "";

      await db
        .insert(scenarioResponses)
        .values({
          userId: me.id,
          scenarioId,
          taskId: task.id,
          selectedIndex: null,
          isCorrect: null,
          responseText: text || null,
        })
        .onConflictDoUpdate({
          target: [
            scenarioResponses.userId,
            scenarioResponses.scenarioId,
            scenarioResponses.taskId,
          ],
          set: {
            selectedIndex: null,
            isCorrect: null,
            responseText: text || null,
            submittedAt: sql`now()`,
          },
        });

      graded.push({ taskId: task.id, type: "written" });
    }
  }

  return {
    ok: true,
    graded,
    score: { correct: correctCount, total: mcqTotal },
  };
}

/** Wipe the current user's saved answers (and any teacher feedback) for a
 *  scenario so they can attempt it again from scratch. Self-service — only ever
 *  affects the caller's own rows. */
export async function resetMyScenario(scenarioId: string): Promise<void> {
  const me = await requireUser();
  await db
    .delete(scenarioResponses)
    .where(
      and(
        eq(scenarioResponses.userId, me.id),
        eq(scenarioResponses.scenarioId, scenarioId),
      ),
    );
}

/** Mark all of the current student's teacher feedback for a scenario as seen —
 *  called when they open the scenario's Tasks, clearing the nav badge. */
export async function markScenarioFeedbackSeen(
  scenarioId: string,
): Promise<void> {
  const me = await requireUser();
  await db
    .update(scenarioResponses)
    .set({ feedbackSeen: true })
    .where(
      and(
        eq(scenarioResponses.userId, me.id),
        eq(scenarioResponses.scenarioId, scenarioId),
        isNotNull(scenarioResponses.teacherFeedback),
        eq(scenarioResponses.feedbackSeen, false),
      ),
    );
}
