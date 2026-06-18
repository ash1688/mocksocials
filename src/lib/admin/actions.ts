"use server";

import { and, eq, inArray, ne, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import {
  users,
  posts,
  likes,
  communityNotes,
  youtubeMeta,
  groups,
  groupMembers,
  fakeUsers,
  scenarioResponses,
} from "@/db/schema";
import { requireAdmin } from "@/lib/auth/guards";
import { hashPassword } from "@/lib/auth/password";
import { setStat, youtubeSeed, type Platform, type YtProfile } from "@/lib/stats";
import { logEvent } from "@/lib/log";

const STUDENT_PW = "Student26";

async function actor() {
  const me = await requireAdmin();
  return me;
}
const back = (tab: string) => redirect(`/admin?tab=${tab}`);
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

// --- Scenario Q&A ------------------------------------------------------------
/** Save (or clear) a teacher's feedback on one student's answer. Shown back to
 *  the student when they revisit the scenario's Tasks. */
export async function saveScenarioFeedback(fd: FormData): Promise<void> {
  const me = await actor();
  const userId = Number(fd.get("user_id"));
  const scenarioId = str(fd, "scenario_id");
  const taskId = str(fd, "task_id");
  const feedback = str(fd, "feedback");
  if (Number.isInteger(userId) && scenarioId && taskId) {
    await db
      .update(scenarioResponses)
      // New/updated feedback is unseen; clearing it resets the flag.
      .set({ teacherFeedback: feedback || null, feedbackSeen: !feedback })
      .where(
        and(
          eq(scenarioResponses.userId, userId),
          eq(scenarioResponses.scenarioId, scenarioId),
          eq(scenarioResponses.taskId, taskId),
        ),
      );
    await logEvent(
      "admin.scenario_feedback",
      `user=${userId} scenario=${scenarioId} task=${taskId}`,
      { actor: me.username },
    );
    // Stay on the submission's detail view after saving.
    redirect(
      `/admin?tab=scenario&user=${userId}&scenario=${encodeURIComponent(scenarioId)}`,
    );
  }
  back("scenario");
}

// --- Users -------------------------------------------------------------------
export async function createUser(fd: FormData): Promise<void> {
  const me = await actor();
  const username = str(fd, "username");
  const displayName = str(fd, "display_name");
  const password = String(fd.get("password") ?? "");
  const isAdmin = !!fd.get("is_admin");
  const avatar = str(fd, "avatar_url");
  await logEvent("admin.create_user", `username=${username}`, { actor: me.username });
  if (username && displayName && password) {
    await db.insert(users).values({
      username,
      password: await hashPassword(password),
      displayName,
      avatarUrl: avatar || `https://picsum.photos/seed/${username}/200`,
      isAdmin,
    });
  }
  back("users");
}

export async function createStudent(fd: FormData): Promise<void> {
  const me = await actor();
  const sid = str(fd, "student_id");
  const displayName = str(fd, "display_name") || `Student ${sid}`;
  await logEvent("admin.create_student", `student_id=${sid}`, { actor: me.username });
  if (/^[0-9]{4,12}$/.test(sid)) {
    await db.insert(users).values({
      username: sid,
      password: await hashPassword(STUDENT_PW),
      displayName,
      avatarUrl: `https://picsum.photos/seed/${sid}/200`,
      isAdmin: false,
    });
  }
  back("users");
}

export async function resetPassword(fd: FormData): Promise<void> {
  const me = await actor();
  const uid = Number(fd.get("user_id"));
  const password = String(fd.get("password") ?? "");
  await logEvent("admin.reset_password", `user_id=${uid}`, { actor: me.username });
  const u = (await db.select().from(users).where(eq(users.id, uid)).limit(1))[0];
  if (!u) back("users");
  const isStudent = !u!.isAdmin && /^[0-9]{4,12}$/.test(u!.username);
  if (isStudent) {
    await db.update(users).set({ password: await hashPassword(STUDENT_PW) }).where(eq(users.id, uid));
  } else if (password) {
    await db.update(users).set({ password: await hashPassword(password) }).where(eq(users.id, uid));
  }
  back("users");
}

export async function updateUser(fd: FormData): Promise<void> {
  const me = await actor();
  const uid = Number(fd.get("user_id"));
  await logEvent("admin.update_user", `user_id=${uid}`, { actor: me.username });
  await db
    .update(users)
    .set({
      displayName: str(fd, "display_name"),
      avatarUrl: str(fd, "avatar_url"),
      bio: str(fd, "bio"),
      isAdmin: !!fd.get("is_admin"),
    })
    .where(eq(users.id, uid));
  back("users");
}

export async function deleteUser(fd: FormData): Promise<void> {
  const me = await actor();
  const uid = Number(fd.get("user_id"));
  await logEvent("admin.delete_user", `user_id=${uid}`, { actor: me.username });
  if (uid !== me.id) await removeUsers([uid]);
  back("users");
}

// Delete users safely: clear group posts + delete their groups (RESTRICT FK),
// then delete the users (cascades posts/likes/comments/notes/stats/memberships).
async function removeUsers(ids: number[]) {
  if (!ids.length) return;
  const theirGroups = await db
    .select({ id: groups.id })
    .from(groups)
    .where(inArray(groups.createdBy, ids));
  const gids = theirGroups.map((g) => g.id);
  if (gids.length) {
    await db.update(posts).set({ groupId: null }).where(inArray(posts.groupId, gids));
    await db.delete(groups).where(inArray(groups.id, gids));
  }
  await db.delete(users).where(inArray(users.id, ids));
}

// --- Seed --------------------------------------------------------------------
export async function seedPost(fd: FormData): Promise<void> {
  const me = await actor();
  const uid = Number(fd.get("user_id"));
  const platform = str(fd, "platform") as Platform;
  const content = str(fd, "content");
  const img = str(fd, "image_url");
  await logEvent("admin.seed_post", `user_id=${uid} platform=${platform}`, { actor: me.username });
  if (platform === "youtube") {
    const p = (
      await db.insert(posts).values({ userId: uid, platform, content }).returning({ id: posts.id })
    )[0]!;
    const profile = (str(fd, "stats_profile") || "low") as YtProfile;
    const seed = youtubeSeed(profile);
    await db.insert(youtubeMeta).values({
      postId: p.id,
      videoTitle: str(fd, "title") || "Untitled",
      thumbnailUrl:
        str(fd, "thumbnail_url") ||
        `https://picsum.photos/seed/yt${Math.floor(Math.random() * 9999) + 1}/640/360`,
      durationDisplay: str(fd, "duration") || "10:00",
      statsProfile: profile,
      premiumViewPct: 25 + Math.floor(Math.random() * 6),
      seedViews: seed.views,
      seedLikes: seed.likes,
      seedComments: seed.comments,
      seedSubBoost: seed.subBoost,
    });
  } else {
    await db.insert(posts).values({ userId: uid, platform, content, imageUrl: img });
  }
  back("seed");
}

const PACK: Record<string, string[]> = {
  twitter: [
    "#Marketing tip: ship the campaign before perfect.",
    "Hot take: hashtags are punctuation now.",
    "Coffee count: 4. Productivity: questionable.",
    "Read the docs. Then read them again. #Coding",
    "Books > scrolling. Fight me. #Reading",
  ],
  facebook: [
    "Lovely walk by the river this morning.",
    "Anyone know a good plumber in the area?",
    "Sunday roast at Mum's. Best meal of the week.",
    "Community litter pick this Saturday at 10am!",
    "New job starts Monday — nervous but excited.",
  ],
  instagram: ["vibes ✨", "golden hour 🌅", "behind the scenes 📸", "weekend reset 🌿"],
};

export async function seedPack(fd: FormData): Promise<void> {
  const me = await actor();
  const only = str(fd, "platform") || "all";
  await logEvent("admin.seed_pack", `platform=${only}`, { actor: me.username });
  const personaIds = (await db.select({ id: fakeUsers.id }).from(fakeUsers)).map((p) => p.id);
  if (personaIds.length) {
    for (const [platform, pool] of Object.entries(PACK)) {
      if (only !== "all" && only !== platform) continue;
      for (const text of pool) {
        const author = personaIds[Math.floor(Math.random() * personaIds.length)]!;
        await db.insert(posts).values({
          fakeUserId: author,
          platform: platform as Platform,
          content: text,
          imageUrl:
            platform === "instagram"
              ? `https://picsum.photos/seed/sp${Math.floor(Math.random() * 99999)}/600/600`
              : "",
        });
      }
    }
  }
  back("seed");
}

export async function seedEngagement(): Promise<void> {
  const me = await actor();
  await logEvent("admin.seed_engagement", "", { actor: me.username });
  const personaIds = (await db.select({ id: fakeUsers.id }).from(fakeUsers)).map((p) => p.id);
  const personaPosts = await db
    .select({ id: posts.id, fakeUserId: posts.fakeUserId })
    .from(posts)
    .where(sql`${posts.fakeUserId} is not null`);
  for (const p of personaPosts) {
    const likers = personaIds.filter((id) => id !== p.fakeUserId && Math.random() < 0.3);
    if (likers.length) {
      await db
        .insert(likes)
        .values(likers.map((id) => ({ postId: p.id, fakeUserId: id })))
        .onConflictDoNothing();
    }
  }
  back("seed");
}

// --- Groups ------------------------------------------------------------------
export async function createGroupAs(fd: FormData): Promise<void> {
  const me = await actor();
  const name = str(fd, "name");
  const by = Number(fd.get("created_by"));
  await logEvent("admin.create_group", `name=${name}`, { actor: me.username });
  if (name && by) {
    const g = (
      await db
        .insert(groups)
        .values({ name, description: str(fd, "description"), coverUrl: str(fd, "cover_url"), createdBy: by })
        .returning({ id: groups.id })
    )[0]!;
    await db.insert(groupMembers).values({ groupId: g.id, userId: by, role: "admin" });
  }
  back("groups");
}

export async function deleteGroup(fd: FormData): Promise<void> {
  const me = await actor();
  const gid = Number(fd.get("group_id"));
  await logEvent("admin.delete_group", `group_id=${gid}`, { actor: me.username });
  if (gid) {
    await db.update(posts).set({ groupId: null }).where(eq(posts.groupId, gid));
    await db.delete(groups).where(eq(groups.id, gid));
  }
  back("groups");
}

// --- Stats -------------------------------------------------------------------
export async function overrideStat(fd: FormData): Promise<void> {
  const me = await actor();
  const uid = Number(fd.get("user_id"));
  const platform = str(fd, "platform") as Platform;
  const key = str(fd, "stat_key");
  const value = Number(fd.get("stat_value")) || 0;
  await logEvent("admin.override_stat", `user_id=${uid} ${key}=${value}`, { actor: me.username });
  await setStat(uid, platform, key, value);
  back("stats");
}

// --- Notes -------------------------------------------------------------------
export async function removeNote(fd: FormData): Promise<void> {
  const me = await actor();
  const id = Number(fd.get("note_id"));
  await logEvent("admin.remove_note", `note_id=${id}`, { actor: me.username });
  await db.update(communityNotes).set({ status: "removed" }).where(eq(communityNotes.id, id));
  back("notes");
}

export async function restoreNote(fd: FormData): Promise<void> {
  const me = await actor();
  const id = Number(fd.get("note_id"));
  await logEvent("admin.restore_note", `note_id=${id}`, { actor: me.username });
  await db.update(communityNotes).set({ status: "visible" }).where(eq(communityNotes.id, id));
  back("notes");
}

// --- Reset tools -------------------------------------------------------------
export async function resetLikes(): Promise<void> {
  const me = await actor();
  await logEvent("admin.reset_likes", "", { actor: me.username });
  await db.execute(sql`TRUNCATE TABLE ${likes} RESTART IDENTITY`);
  back("reset");
}

export async function resetPosts(): Promise<void> {
  const me = await actor();
  await logEvent("admin.reset_posts", "", { actor: me.username });
  await db.execute(sql`TRUNCATE TABLE ${posts} RESTART IDENTITY CASCADE`);
  back("reset");
}

export async function resetPlatform(fd: FormData): Promise<void> {
  const me = await actor();
  const platform = str(fd, "platform") as Platform;
  await logEvent("admin.reset_platform", `platform=${platform}`, { actor: me.username });
  await db.delete(posts).where(eq(posts.platform, platform)); // cascades dependents
  back("reset");
}

export async function deleteNonAdminUsers(): Promise<void> {
  const me = await actor();
  const ids = (
    await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.isAdmin, false), ne(users.id, me.id)))
  ).map((u) => u.id);
  await logEvent("admin.delete_non_admin_users", `count=${ids.length}`, { actor: me.username });
  await removeUsers(ids);
  back("reset");
}

// --- Logs --------------------------------------------------------------------
export async function clearLogAction(): Promise<void> {
  const me = await actor();
  const { clearLog } = await import("@/lib/log");
  await clearLog();
  await logEvent("admin.clear_log", "", { actor: me.username });
  back("logs");
}
