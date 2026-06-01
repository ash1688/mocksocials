import {
  pgTable,
  uuid,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { accounts } from "./auth";

/**
 * The fictional business/charity whose presence a Student manages (CONTEXT.md:
 * Organisation). The fixed scenario is the charity "Technicians Initiative".
 * Only the Organisation's branding persists across Campaigns (ADR-0002).
 */
export const organisations = pgTable("organisations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  handle: text("handle").notNull(), // @technicians-initiative
  tagline: text("tagline"),
  mission: text("mission"), // used by the "on-mission" content-quality cue
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  accentColor: text("accent_color"), // branding that persists across campaigns
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * A Student's private, isolated instance of an Organisation's presence
 * (CONTEXT.md: Workspace). One Workspace per Student; no Workspace sees
 * another's data (ADR-0002).
 */
export const workspaces = pgTable(
  "workspaces",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    organisationId: uuid("organisation_id")
      .notNull()
      .references(() => organisations.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("workspaces_account_idx").on(t.accountId)],
);
