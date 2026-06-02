"use server";

import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword } from "./password";
import { logEvent } from "@/lib/log";
import {
  createSession,
  destroySession,
  getCurrentUser,
} from "./session";

/**
 * Log in (PHP try_login + handle_login). Verifies the password, opens a session,
 * bumps last_active, and redirects home. On failure, bounces back to /login.
 */
export async function login(formData: FormData): Promise<void> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fail = async (reason: string) => {
    await logEvent("login_failed", `${reason} username=${username}`, { level: "warning" });
    redirect("/login?error=1");
  };
  if (!username || !password) await fail("missing fields");

  const row = (
    await db.select().from(users).where(eq(users.username, username)).limit(1)
  )[0];
  if (!row) await fail("unknown");

  const ok = await verifyPassword(password, row!.password);
  if (!ok) await fail("bad password");

  await db
    .update(users)
    .set({ lastActive: sql`now()` })
    .where(eq(users.id, row!.id));
  await createSession(row!.id);
  await logEvent("login", row!.isAdmin ? "(admin)" : "", { actor: row!.username });
  redirect("/");
}

/** Log out (PHP ?action=logout): destroy the session and return to login. */
export async function logout(): Promise<void> {
  const me = await getCurrentUser();
  if (me) await logEvent("logout", "", { actor: me.username });
  await destroySession();
  redirect("/login");
}

/** Bump last_active for the current user (PHP touch_last_active on each hit). */
export async function touchLastActive(): Promise<void> {
  const me = await getCurrentUser();
  if (!me) return;
  await db
    .update(users)
    .set({ lastActive: sql`now()` })
    .where(eq(users.id, me.id));
}
