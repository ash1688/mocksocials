# syntax=docker/dockerfile:1

# MockSocial server image (ADR-0004: Docker for server packaging only).
# Multi-stage build off Next.js `output: "standalone"` — small runtime image.
# Node 22 to match .nvmrc / package.json engines (>=20 <=26).

# ---- deps: install ALL deps (incl. dev) needed to build ----------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: produce the standalone server bundle ---------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Placeholder so `src/db/index.ts` (which throws at import if DATABASE_URL is
# unset) loads during `next build`'s page-data collection. Every data page is
# dynamic (cookie auth), so nothing actually connects at build — the postgres
# client is lazy. The REAL DATABASE_URL is injected at runtime by compose/Dokploy.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN npm run build
# This stage doubles as the migration image (it keeps drizzle-kit, the schema,
# drizzle.config.ts and the ./drizzle SQL files). The compose `migrate` service
# runs `npm run db:migrate` against it. Keep it intact — do not prune here.

# ---- runner: minimal production runtime --------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next standalone server reads PORT/HOSTNAME. HOSTNAME must be 0.0.0.0 or the
# server binds to localhost and is unreachable from outside the container.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as the non-root user shipped in the base image.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Standalone output: server.js + traced node_modules, then static + public.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Container-internal port. The unique HOST port (8084 for mocksocial) is mapped
# in docker-compose.yml / Dokploy — see ../port-registry.md.
EXPOSE 3000

CMD ["node", "server.js"]
