# MockSocial

Unit 8 evidence sandbox — a self-hosted teaching app where each student runs a
fictional organisation's social-media presence, schedules a campaign, simulates
engagement + search rankings, and reviews analytics to optimise content. The
app produces the screenshots/exports; the assessed deliverable is a separate
written report.

Greenfield TypeScript rebuild — see [`docs/adr/0004-greenfield-typescript-rebuild.md`](docs/adr/0004-greenfield-typescript-rebuild.md).
Domain language lives in [`CONTEXT.md`](CONTEXT.md).

## Stack

- **Next.js (App Router)** full-stack — SSR pages + server-side logic
- **PostgreSQL** + **Drizzle ORM** (SQL-first, typed migrations)
- **Lightweight custom sessions** (HTTP-only cookie, sessions table)
- **Tailwind + shadcn/ui** — CSS variables carry light/dark + per-platform theming
- Self-hosted (Node + Postgres); Docker for server packaging only

## Local development

ADR-0004: local dev runs on **bare Node + a native Postgres** — no Docker, no
SQLite substitute (Drizzle schemas are dialect-specific).

```bash
nvm use                       # Node 22 (see .nvmrc)
npm install
cp .env.example .env          # then set DATABASE_URL + SESSION_SECRET
createdb mocksocial           # or use an existing local Postgres
npm run db:push               # apply schema to the database
npm run db:seed               # provision the fixed scenario (scaffold no-op)
npm run dev                   # http://localhost:3000
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run clean` | Delete the `.next` cache (fixes stale-webpack errors) |
| `npm run dev:clean` | Clean then start dev (use after switching from `build`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (next config) |
| `npm run db:generate` | Generate a SQL migration from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:push` | Push schema directly (dev convenience) |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | Seed the database |

## Layout

```
src/
  app/                 # Next.js App Router (pages, layouts, route handlers)
  components/ui/        # shadcn-style components
  db/
    schema/             # Drizzle schema, split by domain area
    index.ts            # Drizzle client
    seed.ts             # Seed script
  lib/
    auth/               # session helpers
    simulation/         # performance score, seeded RNG, types (ADR-0001)
    utils.ts
drizzle/                # generated SQL migrations
docs/adr/               # architecture decision records
```

The performance-score model (weighted geometric mean + gate penalties + low
reach floor + seeded noise) is ported in `src/lib/simulation/`. It must stay
**deterministic** — noise derives from stable inputs (post id / campaign id /
keyword), never wall-clock (ADR-0001).
