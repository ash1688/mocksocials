"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accounts } from "@/db/schema";
import { verifyPassword } from "./password";
import { createSession, destroySession } from "./session";
import { getOrCreateWorkspace } from "./provision";

export type LoginState = { error?: string };

/** Validate credentials, open a session, ensure a Workspace, then redirect. */
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "Enter a username and password." };
  }

  const [account] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.username, username))
    .limit(1);

  // Same message whether the user or the password is wrong (no enumeration).
  if (!account || !(await verifyPassword(password, account.passwordHash))) {
    return { error: "Incorrect username or password." };
  }

  await createSession(account.id);

  if (account.role === "student") {
    await getOrCreateWorkspace(account.id);
    redirect("/dashboard");
  }
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
