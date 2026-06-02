import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users, fakeUsers } from "@/db/schema";

/** A person to render a profile for — real user or persona, unified shape. */
export type Profile = {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
};

export async function getUserProfile(id: number): Promise<Profile | null> {
  const row = (
    await db.select().from(users).where(eq(users.id, id)).limit(1)
  )[0];
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName,
    avatarUrl: row.avatarUrl,
    bio: row.bio,
  };
}

export async function getFakeUserProfile(id: number): Promise<Profile | null> {
  const row = (
    await db.select().from(fakeUsers).where(eq(fakeUsers.id, id)).limit(1)
  )[0];
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    displayName: row.displayName,
    avatarUrl: row.avatarUrl,
    bio: row.bio,
  };
}
