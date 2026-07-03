# Deploying MockSocial to Dokploy

MockSocial ships as a Docker image (Next.js standalone) plus an internal-only
Postgres. It runs on the physical Ubuntu/Dokploy box in **IP + port mode** —
reached at `http://<server-ip>:8084/`, not via a domain.

- **Host port: `8084`** (mocksocial's allocation in `../port-registry.md`).
- **Container-internal port: `3000`** (Next standalone default — do **not** change).
- Mapping is `8084:3000`. The DB publishes **no** port; it stays internal-only.

The build has been verified locally (`docker build` → standalone runner image, exit 0).

---

## What you must do

### 1. Set the secrets in Dokploy (Environment tab)

| Variable | Value |
|----------|-------|
| `POSTGRES_PASSWORD` | a long random string (DB password) |
| `SESSION_SECRET` | a long random string (signs session cookies) |

Generate each with e.g. `openssl rand -hex 32`. Do **not** commit these — the
repo's `.env` is git-ignored and excluded from the image via `.dockerignore`.

`DATABASE_URL` is built automatically from `POSTGRES_PASSWORD` inside
`docker-compose.yml`, so you do not set it by hand.

### 2. Create the app in Dokploy

- New project → **Compose** deployment type.
- Point it at this repo / branch (`ts-faithful`), Compose file `docker-compose.yml`.
- Add the two environment variables from step 1.
- Deploy. On first run, Compose will:
  1. start `db` (Postgres 16) and wait until it's healthy,
  2. run the one-shot `migrate` service (`npm run db:migrate`, applies the SQL
     in `./drizzle`, then seeds the demo scenario — only if the DB is empty),
  3. start `app` once migration completes, published on host port `8084`.

### 3. Open the host firewall

On the Ubuntu box:

```bash
sudo ufw allow 8084/tcp
```

### 4. Demo data (seeds itself)

Seeding is automatic: the `migrate` service runs `db:seed:if-empty` after the
migrations, which loads the fixed scenario **only when the database is empty**
(first deploy). Redeploys skip it, so existing accounts/posts are never wiped.

To force a full re-seed (wipes all data back to the fixed scenario):

```bash
docker compose run --rm migrate npm run db:seed
```

### 5. Verify

Browse to `http://<server-ip>:8084/` — you should reach the login page.

---

## Notes / gotchas

- **Port 3000 is the Dokploy dashboard** (a *host* port). MockSocial's *internal*
  3000 is isolated on its own Docker network and is mapped to host **8084**, so
  there is no conflict — just never map it to host `3000`.
- **Registry naming:** `../port-registry.md` lists this app as "mocksocial**s**"
  (plural) at 8084. Same app — fix the row for consistency if you like.
- **Postgres major version:** the image is `postgres:16-alpine`. If you restore a
  dump from a different major version, align the image tag first.
- **Migrations vs. push:** deploy runs `db:migrate` (the committed SQL files), not
  `db:push`. Generate new migrations locally with `npm run db:generate` and commit
  them before deploying.
- **Updating:** redeploy in Dokploy. The `migrate` service re-runs and applies any
  new migrations before the app restarts.
