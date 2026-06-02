"use server";

import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword } from "./password";
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

  const fail = () => redirect("/login?error=1");
  if (!username || !password) fail();

  const row = (
    await db.select().from(users).where(eq(users.username, username)).limit(1)
  )[0];
  if (!row) fail();

  const ok = await verifyPassword(password, row!.password);
  if (!ok) fail();

  await db
    .update(users)
    .set({ lastActive: sql`now()` })
    .where(eq(users.id, row!.id));
  await createSession(row!.id);
  redirect("/");
}

/** Log out (PHP ?action=logout): destroy the session and return to login. */
export async function logout(): Promise<void> {
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
