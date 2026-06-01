import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { roleEnum } from "./enums";

/**
 * A real logged-in learner (CONTEXT.md: Student) or a teacher. Fixed-password
 * internal accounts — lightweight custom sessions, no OAuth (ADR-0004).
 */
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("student"),
  displayName: text("display_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Server-side sessions, keyed by an opaque cookie token (ADR-0004 auth). */
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(), // hashed session token
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("sessions_account_idx").on(t.accountId)],
);
