import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * Real logins — admin staff and students (PHP `users` table). Students log in
 * with their college ID as username and the fixed password `Student26`.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  handle: varchar("handle", { length: 50 }),
  password: varchar("password", { length: 255 }).notNull(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }).default(""),
  coverUrl: varchar("cover_url", { length: 255 }).default(""),
  bio: text("bio"),
  location: varchar("location", { length: 100 }).default(""),
  education: varchar("education", { length: 150 }).default(""),
  isAdmin: boolean("is_admin").notNull().default(false),
  lastActive: timestamp("last_active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Server-side sessions keyed by an opaque cookie token (TS infra carried over
 * from the rebuild scaffold; PHP used native sessions). Stored SHA-256-hashed.
 */
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(), // hashed session token
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);
