/**
 * Lightweight custom sessions (ADR-0004): an opaque random token in an
 * HTTP-only cookie, stored SHA-256-hashed in the `sessions` table. No OAuth.
 *
 * Cookie writes (createSession / destroySession) only work in Server Actions
 * and Route Handlers. getCurrentAccount only reads, so it is safe in Server
 * Components too.
 */
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { accounts, sessions } from "@/db/schema";

export const SESSION_COOKIE = "mocksocial_session";
const SESSION_TTL_DAYS = 7;

export type Account = typeof accounts.$inferSelect;

function sessionExpiry(): Date {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
}

/** Generate a new opaque session token (URL-safe). */
function generateSessionToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

/** Hash a token for storage so a DB leak doesn't expose live sessions. */
async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(digest).toString("hex");
}

/** Create a session for an account and set the cookie. Call from an action. */
export async function createSession(accountId: string): Promise<void> {
  const token = generateSessionToken();
  const id = await hashToken(token);
  const expiresAt = sessionExpiry();

  await db.insert(sessions).values({ id, accountId, expiresAt });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

/** Resolve the logged-in account from the session cookie, or null. */
export async function getCurrentAccount(): Promise<Account | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const id = await hashToken(token);
  const row = await db
    .select({ account: accounts, expiresAt: sessions.expiresAt })
    .from(sessions)
    .innerJoin(accounts, eq(sessions.accountId, accounts.id))
    .where(eq(sessions.id, id))
    .limit(1);

  const found = row[0];
  if (!found) return null;
  if (found.expiresAt.getTime() < Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, id));
    return null;
  }
  return found.account;
}

/** Destroy the current session and clear the cookie. Call from an action. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    const id = await hashToken(token);
    await db.delete(sessions).where(eq(sessions.id, id));
  }
  store.delete(SESSION_COOKIE);
}
