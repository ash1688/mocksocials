import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users";

/**
 * A student's answer to one authored Scenario task (ADR-0006: scenarios are
 * teaching-only, decoupled from the scoring path). Scenarios are not DB rows —
 * `scenarioId`/`taskId` are the authored string slugs from src/lib/scenario,
 * so there is no FK to a scenarios table. One row per (student, scenario, task);
 * re-submitting upserts so a student can revise their answers.
 */
export const scenarioResponses = pgTable(
  "scenario_responses",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    scenarioId: text("scenario_id").notNull(), // Scenario.id
    taskId: text("task_id").notNull(), // ScenarioTask.id
    // MCQ: chosen option index + correctness snapshot (written = null).
    selectedIndex: integer("selected_index"),
    isCorrect: boolean("is_correct"),
    // Written: the free-text answer (MCQ = null).
    responseText: text("response_text"),
    // Teacher's advice on this answer, shown back to the student when they
    // revisit the scenario. Null until a teacher writes it (mainly for written
    // tasks, where there is no auto-grade).
    teacherFeedback: text("teacher_feedback"),
    // False whenever new/updated feedback is waiting; set true once the student
    // has viewed the scenario's Tasks. Drives the "new feedback" nav badge.
    feedbackSeen: boolean("feedback_seen").notNull().default(false),
    submittedAt: timestamp("submitted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    unique("scenario_responses_unique").on(t.userId, t.scenarioId, t.taskId),
    index("scenario_responses_user_idx").on(t.userId),
    index("scenario_responses_scenario_idx").on(t.scenarioId),
  ],
);
