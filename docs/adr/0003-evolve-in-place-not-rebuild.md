# Evolve MockSocial in place rather than rebuild

**Status:** superseded by ADR-0004 (greenfield rebuild in TypeScript)

> **Superseded 2026-06-01.** The project is moving to a greenfield TypeScript rebuild with
> the PHP app retired, so "evolve the PHP in place / reuse the PHP rendering" no longer
> holds. The domain model (CONTEXT.md) and the simulation (ADR-0001) and isolation
> (ADR-0002) decisions are language-agnostic and carry over to the TS build. See ADR-0004.

The Unit 8 sandbox is a substantial reframe of MockSocial (organisation-as-author,
per-campaign isolation, a simulation engine, search rankings). A clean rewrite was on the
table, but MockSocial already has working, reusable infrastructure — author rendering
helpers (`author_select_sql`/`author_join_sql`), theming, threaded comments, the four
platform renderers, and the admin panel — and other uses of the app must not break.

We decided to **evolve the existing schema and code in place**: extend the current tables
with workspace / organisation / campaign scoping and reuse the existing rendering,
theming, and comment infrastructure, rather than start a new codebase.

## Consequences

- The author model extends from two nullable FKs (`user_id`, `fake_user_id`) to also carry
  the Organisation as an author; the COALESCE-based author helpers extend to match.
- New concepts (Workspace, Campaign, Simulation, performance score, search ranking) are
  added *alongside* existing structures; the old shared-feed behaviour is reshaped, not
  deleted wholesale.
- Migrations are additive and incremental (consistent with the existing `sql/migrate_*.sql`
  pattern), keeping each step independently applicable.
