/**
 * Lightweight custom sessions (ADR-0004): an opaque random token in an
 * HTTP-only cookie, hashed and stored in the `sessions` table. No OAuth.
 *
 * Scaffold: the crypto + cookie + DB wiring is stubbed; flesh out when the
 * login route is built.
 */
import { cookies } from "next/headers";

export const SESSION_COOKIE = "mocksocial_session";
const SESSION_TTL_DAYS = 7;

/** Generate a new opaque session token (URL-safe). */
export function generateSessionToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString("base64url");
}

/** Hash a token for storage so a DB leak doesn't expose live sessions. */
export async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(digest).toString("hex");
}

export function sessionExpiry(): Date {
  return new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
}

/** Read the current session token from the cookie (if any). */
export async function getSessionToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

// TODO: createSession(accountId), getCurrentAccount(), destroySession() — wire
// to src/db once the login/logout route handlers exist.
