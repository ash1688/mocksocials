import { and, asc, desc, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

import { db } from "@/db";
import {
  users,
  groups,
  groupMembers,
  manualStats,
  communityNotes,
  posts,
  fakeUsers,
  scenarioResponses,
} from "@/db/schema";

export async function listUsers() {
  return db.select().from(users).orderBy(asc(users.id));
}

export async function listGroups() {
  return db
    .select({
      id: groups.id,
      name: groups.name,
      creator: users.displayName,
      members: sql<number>`(select count(*)::int from ${groupMembers} gm where gm.group_id = ${groups.id})`,
    })
    .from(groups)
    .innerJoin(users, eq(users.id, groups.createdBy))
    .orderBy(asc(groups.id));
}

export async function listUsersBasic() {
  return db
    .select({ id: users.id, displayName: users.displayName, username: users.username })
    .from(users)
    .orderBy(asc(users.displayName));
}

export async function listManualStats() {
  return db
    .select({
      userId: manualStats.userId,
      displayName: users.displayName,
      platform: manualStats.platform,
      statKey: manualStats.statKey,
      statValue: manualStats.statValue,
    })
    .from(manualStats)
    .innerJoin(users, eq(users.id, manualStats.userId))
    .orderBy(asc(users.displayName), asc(manualStats.platform), asc(manualStats.statKey));
}

export async function listNotes() {
  const pu = alias(users, "pu");
  const pfu = alias(fakeUsers, "pfu");
  return db
    .select({
      id: communityNotes.id,
      status: communityNotes.status,
      noteText: communityNotes.noteText,
      author: sql<
        string | null
      >`coalesce(${users.displayName}, ${fakeUsers.displayName})`,
      postContent: posts.content,
      poster: sql<string | null>`coalesce(${pu.displayName}, ${pfu.displayName})`,
    })
    .from(communityNotes)
    .leftJoin(users, eq(users.id, communityNotes.userId))
    .leftJoin(fakeUsers, eq(fakeUsers.id, communityNotes.fakeUserId))
    .innerJoin(posts, eq(posts.id, communityNotes.postId))
    .leftJoin(pu, eq(pu.id, posts.userId))
    .leftJoin(pfu, eq(pfu.id, posts.fakeUserId))
    .orderBy(desc(communityNotes.createdAt));
}

/** One row per submission (student × scenario) for the list view: who, which
 *  scenario, how many answers, MCQ score, unseen-feedback count, and when. */
export async function listScenarioSubmissions() {
  return db
    .select({
      userId: scenarioResponses.userId,
      displayName: users.displayName,
      username: users.username,
      scenarioId: scenarioResponses.scenarioId,
      answers: sql<number>`count(*)::int`,
      mcqCorrect: sql<number>`count(*) FILTER (WHERE ${scenarioResponses.isCorrect})::int`,
      mcqTotal: sql<number>`count(*) FILTER (WHERE ${scenarioResponses.selectedIndex} IS NOT NULL)::int`,
      unreadFeedback: sql<number>`count(*) FILTER (WHERE ${scenarioResponses.teacherFeedback} IS NOT NULL AND ${scenarioResponses.feedbackSeen} = false)::int`,
      lastSubmitted: sql<Date>`max(${scenarioResponses.submittedAt})`,
    })
    .from(scenarioResponses)
    .innerJoin(users, eq(users.id, scenarioResponses.userId))
    .groupBy(
      scenarioResponses.userId,
      users.displayName,
      users.username,
      scenarioResponses.scenarioId,
    )
    .orderBy(desc(sql`max(${scenarioResponses.submittedAt})`));
}

/** Full answers for one submission (student × scenario) — the detail view.
 *  Authored prompts/options are resolved from the registry in the view. */
export async function getScenarioSubmission(
  userId: number,
  scenarioId: string,
) {
  return db
    .select({
      userId: scenarioResponses.userId,
      displayName: users.displayName,
      username: users.username,
      scenarioId: scenarioResponses.scenarioId,
      taskId: scenarioResponses.taskId,
      selectedIndex: scenarioResponses.selectedIndex,
      isCorrect: scenarioResponses.isCorrect,
      responseText: scenarioResponses.responseText,
      teacherFeedback: scenarioResponses.teacherFeedback,
      submittedAt: scenarioResponses.submittedAt,
    })
    .from(scenarioResponses)
    .innerJoin(users, eq(users.id, scenarioResponses.userId))
    .where(
      and(
        eq(scenarioResponses.userId, userId),
        eq(scenarioResponses.scenarioId, scenarioId),
      ),
    )
    .orderBy(asc(scenarioResponses.taskId));
}

export async function listSessions() {
  return db
    .select({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      lastActive: users.lastActive,
    })
    .from(users)
    .orderBy(sql`${users.lastActive} desc nulls last`);
}
