# Deploying MockSocial to Dokploy — public VPS

> Branch **`deploy/vps`**. For the college-LAN box (IP + port `8089`, plain HTTP)
> deploy from `ts-faithful` instead — that variant must not face the internet.

MockSocial ships as a Docker image (Next.js standalone) plus an internal-only
Postgres. On a VPS it is reached at **`https://<your-domain>/`** through
Dokploy's Traefik, which also issues the Let's Encrypt certificate.

- **Container port: `3000`** (Next standalone default — do **not** change).
- **Host port:** `127.0.0.1:8089` — loopback only, not reachable from outside.
  Public traffic goes domain → Traefik → container.
- The DB publishes **no** port; it stays internal-only.
- **The VPS never builds.** GitHub Actions
  (`.github/workflows/docker-publish.yml`) builds on every push to `deploy/vps`
  and publishes to GHCR; compose just pulls:
  - `ghcr.io/ash1688/mocksocials:vps` — the app
  - `ghcr.io/ash1688/mocksocials-migrate:vps` — migrations + first-time seed

---

## What you must do

### 1. Point a domain at the VPS

Create a DNS **A record** (e.g. `mocksocial.example.com`) → the VPS IP. Let's
Encrypt needs ports **80 and 443** open on the VPS (`sudo ufw allow 80,443/tcp`).

### 2. Let the VPS pull the images (one-off)

GHCR packages start **private**, even for a public repo. After the first
workflow run, either:

- **Make them public** (simplest — the source is public and the images contain
  no secrets): GitHub → your profile → **Packages** → `mocksocials` →
  *Package settings* → *Change visibility* → Public. Repeat for
  `mocksocials-migrate`.
- **Or keep them private:** create a GitHub token with only `read:packages` and
  add it in Dokploy → **Registry** (URL `ghcr.io`, your GitHub username, the
  token as password).

### 2b. Create the app in Dokploy

- New project → **Compose** deployment type.
- Repo / branch **`deploy/vps`**, Compose file `docker-compose.yml`.
- Turn **Auto Deploy off**. A push triggers both Dokploy and the image build;
  Dokploy would win the race and re-pull the *previous* images. Redeploy by hand
  once the Actions run is green, or automate it (see *Auto-redeploy* below).

### 3. Set the environment (Environment tab)

| Variable | Value |
|----------|-------|
| `POSTGRES_PASSWORD` | long random string — `openssl rand -hex 32` |
| `SESSION_SECRET` | long random string — `openssl rand -hex 32` |
| `SEED_STAFF_PASSWORD` | password for the seeded **`staff` admin** login |
| `SEED_STUDENT_PASSWORD` | password for the seeded `student` and `19234156` logins |

Compose refuses to start if any is missing. The seed passwords are read **once**,
on the first deploy into an empty database; changing them later does not alter
existing accounts. They are never printed to the deploy log.

`DATABASE_URL` is built from `POSTGRES_PASSWORD` inside `docker-compose.yml`.

### 4. Attach the domain (Domains tab)

- **Service name:** `app` · **Host:** your domain · **Path:** `/`
- **Container port:** `3000`
- **HTTPS:** on · **Certificate:** Let's Encrypt

### 5. Deploy

Compose will:

1. start `db` (Postgres 16) and wait until it's healthy,
2. run the one-shot `migrate` service — applies the SQL in `./drizzle`, then
   seeds the demo scenario **only if the database is empty**,
3. start `app` once that completes.

### 6. Verify

Browse to `https://<your-domain>/` → login page → sign in as `staff` with
`SEED_STAFF_PASSWORD`.

To check the container directly, bypassing Traefik, tunnel the loopback port.
Localhost counts as a secure context, so login works over the tunnel too:

```bash
ssh -L 8089:127.0.0.1:8089 <user>@<vps-ip>
```

then open `http://localhost:8089/`.

---

## No domain? (not recommended)

Serving by bare IP means **plain HTTP on the open internet** — student passwords
and session cookies travel unencrypted. If you accept that for a short test, add:

| Variable | Value |
|----------|-------|
| `APP_BIND` | `0.0.0.0` |
| `SESSION_COOKIE_SECURE` | `false` |

and browse to `http://<vps-ip>:8089/`. Note that Docker-published ports
**bypass `ufw`**: once bound to `0.0.0.0` the port is public whatever the
firewall says. Restrict it at the VPS provider's firewall if you need to.

---

## Notes / gotchas

- **Login bounces back to `/login`:** the session cookie is `Secure` but the page
  was loaded over plain HTTP, so the browser dropped it. Use the HTTPS domain, or
  set `SESSION_COOKIE_SECURE=false` (see above).
- **`app` can't resolve `db` after adding a domain:** Dokploy appends
  `dokploy-network` to the service's networks. `app` lists `default` explicitly
  so it keeps the DB connection — don't remove that `networks:` block. Use
  Dokploy's **Preview Compose** to see the final file.
- **Port 8089 already taken on the VPS:** set `APP_PORT` to any free port. It is
  loopback-only, so it just needs to be unused.
- **Force a full re-seed** (wipes all data back to the fixed scenario; uses the
  current `SEED_*` values):

  ```bash
  docker compose run --rm migrate npm run db:seed
  ```

- **Activity log:** `logs/app.log` lives in the `mocksocial-logs` volume, so the
  teacher/admin log viewer keeps its history across redeploys.
- **Postgres major version:** the image is `postgres:16-alpine`. If you restore a
  dump from a different major version, align the image tag first.
- **Migrations vs. push:** deploy runs `db:migrate` (the committed SQL files), not
  `db:push`. Generate new migrations locally with `npm run db:generate` and commit
  them before deploying.
- **Updating:** push to `deploy/vps` → wait for the *Publish Docker images*
  run to go green → redeploy in Dokploy. `pull_policy: always` fetches the new
  `vps` images; the `migrate` service applies any new migrations before the app
  restarts. Pushes that only touch `*.md` or the compose files skip the build.
- **Rolling back:** every build is also tagged `sha-<7-char commit>`. Set
  `IMAGE_TAG=sha-abc1234` in the Environment tab and redeploy; unset to return
  to `vps`.
- **Auto-redeploy:** add repo secrets `DOKPLOY_URL` (e.g.
  `https://dokploy.example.com`), `DOKPLOY_API_KEY` (Dokploy → Profile → API
  keys) and `DOKPLOY_COMPOSE_ID` (in the app's URL). The workflow then calls
  `POST /api/compose.deploy` after the images are pushed. Skipped if unset.
- **ARM VPS:** images are built for `linux/amd64` only. For an ARM box, add
  `linux/arm64` to `PLATFORMS` in the workflow (see the comment there).
- **Building locally instead:**
  `docker compose -f docker-compose.yml -f docker-compose.build.yml up --build`
