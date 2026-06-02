import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * Fictional personas that author all seeded content (PHP `fake_users`). They
 * never log in. Browsable profiles with deterministic pseudo-random stats.
 */
export const fakeUsers = pgTable("fake_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  displayName: varchar("display_name", { length: 120 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  bio: text("bio"),
  coverUrl: varchar("cover_url", { length: 255 }),
  location: varchar("location", { length: 120 }),
  education: varchar("education", { length: 120 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
