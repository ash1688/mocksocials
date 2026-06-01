# Greenfield rebuild in TypeScript, PHP retired

**Status:** accepted (supersedes ADR-0003)

The Unit 8 evidence sandbox will be built as a **new TypeScript codebase from scratch**;
the existing PHP MockSocial app is retired once the TS app is ready. This reverses
ADR-0003's "evolve the PHP in place / reuse the PHP rendering" decision — we are no longer
evolving PHP, we are rebuilding. The design captured in CONTEXT.md (domain model),
ADR-0001 (deterministic fast-forward simulation + validated scoring model) and ADR-0002
(per-student / per-campaign isolation) are language-agnostic and carry over unchanged; only
the build strategy and stack are new.

## Stack

| Concern        | Choice                                  | Why |
|----------------|-----------------------------------------|-----|
| Architecture   | **Next.js full-stack** (App Router)     | One codebase: SSR React pages + server-side logic via server actions/route handlers, single deploy. Maps to the current SSR-page model; React for the dashboards/SERP. |
| Database       | **PostgreSQL**                          | Strong concurrency for a whole class simulating at once; best-in-class TS tooling. |
| Data access    | **Drizzle ORM** (+ drizzle-kit)         | SQL-first and close to the hand-written SQL we know, with full type safety and migrations. |
| Auth           | **Lightweight custom sessions**         | Username/password checked server-side, sessions table in Postgres, HTTP-only cookie. Right-sized for the internal fixed-password student/admin model; no OAuth machinery. |
| UI / styling   | **Tailwind + shadcn/ui**                | CSS variables carry the light/dark + per-platform theming; shadcn components accelerate the heavy admin/analytics/SERP UI. |
| Hosting        | **Self-hosted on college infra**        | Node + Postgres on a college server. Docker is used for *server* packaging only; local development runs on bare Node + a native Postgres (no container required). Keeps student data on-premise. |

## Considered options

- **Strangler migration** (TS alongside PHP, move features incrementally). Rejected: the
  app is small enough and the reframe deep enough that running two stacks during transition
  costs more than a clean rebuild buys.
- **Cloud PaaS** (Vercel + managed Postgres such as Neon/Supabase). Rejected as the default:
  student data (college IDs) would leave the premises to third-party processors, which needs
  data-protection sign-off the current self-hosted app deliberately avoids. Easiest ops, but
  the residency constraint wins.
- **Prisma** instead of Drizzle. A close call — Prisma has the gentler on-ramp; Drizzle was
  preferred for staying SQL-native and lighter at runtime.

## Consequences

- Everything is re-implemented in TS: auth, the four platform renderers, theming, comment
  threads, and the simulation engine. The PHP code is reference-only, then retired.
- The validated scoring model from ADR-0001's prototype (weighted geometric mean + gate
  penalties + low reach floor) ports as plain logic — re-implement and re-validate in TS.
- Determinism must be preserved across the rewrite: seeded noise derives from stable inputs
  (post id / campaign id / keyword), never real time, so simulations stay reproducible.
- On-premise hosting means no third-party data processors; setup must stay reproducible on a
  single college machine (hence the Docker option on the server).
- Dev/prod parity: local dev runs on bare Node + native Postgres while the server runs the
  app in Docker. Keep the gap negligible by pinning the Node major version (`engines` +
  `.nvmrc`) and the Postgres major version to match the server image. Do not substitute
  SQLite locally — Drizzle schemas are dialect-specific and would diverge from prod.
