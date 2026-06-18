import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

/** Simple key/value store for app-wide settings (e.g. the chosen class-demo
 *  scenario). Not per-user — these are global teacher/admin choices. */
export const appSettings = pgTable("app_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
