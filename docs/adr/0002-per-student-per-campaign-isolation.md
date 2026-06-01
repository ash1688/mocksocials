# Data is isolated per student (workspace) and scoped per campaign

**Status:** accepted

Unit 8 Assignment 2 is individually assessed, and each student must produce their own
self-contained before/after evidence of running the charity's social media. MockSocial
today uses *shared* feeds where everyone posts into the same content pool — unusable for
this, because students would see and contaminate each other's evidence.

We decided each student gets a private **Workspace** (their own Organisation, content,
analytics, rankings — no Workspace can see another's), and within a Workspace every
engagement metric (followers, likes, shares, reach, search rankings) is **scoped to a
Campaign and starts from a defined baseline**. Only the Organisation's branding persists
across Campaigns; a new Campaign is a clean run.

## Considered options

- **Shared org, per-student tagging** — one Technicians Initiative page with posts filtered
  by author. Rejected: shared follower counts and feeds tangle students' evidence together.
- **Per-organisation persistent followers** (audience accumulates across campaigns, like a
  real charity). Rejected: a new campaign inherits a large audience, so metrics can't be
  cleanly attributed to one campaign's content — weak assessment evidence.

## Consequences

- Most content tables gain workspace + campaign scoping; queries must always filter by the
  current campaign. This is the single largest change from the shared-feed schema.
- The seeded community must be copied per Workspace so one student's interactions never
  leak into another's.
- "Reset" and provisioning operate at workspace/campaign granularity, not globally.
