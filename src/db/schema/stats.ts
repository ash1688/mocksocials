import {
  pgTable,
  serial,
  integer,
  bigint,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { platformEnum } from "./enums";
import { users } from "./users";

/**
 * Per-student, per-platform manual analytics (PHP `manual_stats`). Students set
 * these by hand (followers, impressions, reach, etc.); see stat_keys per platform.
 */
export const manualStats = pgTable(
  "manual_stats",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    platform: platformEnum("platform").notNull(),
    statKey: varchar("stat_key", { length: 50 }).notNull(),
    statValue: bigint("stat_value", { mode: "number" }).notNull().default(0),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [unique("uniq_stat").on(t.userId, t.platform, t.statKey)],
);
