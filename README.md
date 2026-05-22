# MockSocial

A self-hosted sandbox that emulates Twitter, Facebook, Instagram, and YouTube for college social-media teaching. Students log in, post, like, comment, and view fake analytics without ever touching a real platform — useful for assignments, screenshots, and demos where real accounts would be inappropriate.

Built for Hereford College Computing dept but generic enough for any course covering social media strategy, content creation, or platform analytics.

## What's inside

Four mock platforms, each at its own URL:

| Platform   | Internal name | What it covers |
|------------|---------------|---------------|
| MockTweet  | `twitter`     | Tweets, retweets, replies, hashtags, trending sidebar, community notes |
| MockBook   | `facebook`    | Posts (text + image), groups, friends sidebar, profile cover photos, "About" editor |
| MockGram   | `instagram`   | Image grid, stories bar, explore tab, captions with hashtags |
| MockTube   | `youtube`     | Video cards with thumbnails, view/like seed stats, monetisation analytics with revenue ranges |

Shared features:

- Light + dark themes with topbar toggle (`prefers-color-scheme` aware on first visit)
- Per-platform colour accents (Twitter blue, Facebook blue, Instagram gradient, YouTube red)
- Editable manual analytics (followers, impressions, reach, etc.) per student per platform
- Admin panel for user management, seed content, stats overrides, community-note moderation, and reset tools

## Account model

There are two distinct kinds of accounts:

- **Real users** (`users` table) — admin staff and student logins. Student username is the student's college ID (e.g. `19234156`), password is locked to `Student26` and cannot be reset to anything else.
- **Fake personas** (`fake_users` table) — 50 fictional characters that author all seeded content. They never log in. Their profiles are browsable (clickable from any post) and have deterministic pseudo-random stats so follower counts don't reshuffle on every page load.

A post is authored by exactly one of `users.id` or `fake_users.id`. The same model applies to likes, comments, and community notes — any of those can come from a real user (interaction) or a fake persona (seed engagement).

## Seed content

Roughly **75 sample posts per platform** drawn from a shared pool, distributed across the 50 fake personas with random timestamps spread over the last 30 days so the feeds interleave naturally.

Seeding can be done two ways:

**1. From the admin UI** — `Admin → Seed content`:
- Per-platform buttons (Seed Twitter / Facebook / Instagram / YouTube)
- "Seed All" runs every platform in one click
- "Seed engagement" then layers 3–43 fake likes per post, 0–6 platform-appropriate comments, and ~10% Twitter community notes

**2. Directly via SQL files** (`sql/`):
```bash
mysql -u mocksocial -p mocksocial < sql/migrate_fake_users.sql       # one-time
mysql -u mocksocial -p mocksocial < sql/migrate_fake_engagement.sql  # one-time
mysql -u mocksocial -p mocksocial < sql/seed_twitter.sql
mysql -u mocksocial -p mocksocial < sql/seed_facebook.sql
mysql -u mocksocial -p mocksocial < sql/seed_instagram.sql
mysql -u mocksocial -p mocksocial < sql/seed_youtube.sql
mysql -u mocksocial -p mocksocial < sql/seed_engagement.sql
```

Both routes produce identical results — the admin button mirrors the SQL files line for line.

## Setup

### Requirements

- PHP 8.1+
- MySQL 8+ or MariaDB 10.4+ (window functions are required for the seed SQL)
- Apache / Nginx / XAMPP — anything that serves PHP

### Install

1. Drop the repo into your web root (e.g. `C:\xampp\htdocs\` on XAMPP, `/var/www/html/` on Linux).
2. Create a database and user:
   ```sql
   CREATE DATABASE mocksocial CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'mocksocial'@'localhost' IDENTIFIED BY 'your-password-here';
   GRANT ALL ON mocksocial.* TO 'mocksocial'@'localhost';
   ```
3. Apply the base schema you have on hand (the repo doesn't ship a `schema.sql` — apply your own or import an existing dump), then run the two migrations:
   ```bash
   mysql -u mocksocial -p mocksocial < sql/migrate_fake_users.sql
   mysql -u mocksocial -p mocksocial < sql/migrate_fake_engagement.sql
   ```
4. Copy the local config template and fill in your DB credentials:
   ```bash
   cp src/config.local.example.php src/config.local.php
   ```
   Then edit `src/config.local.php`:
   ```php
   <?php return [
     'host' => 'localhost',
     'name' => 'mocksocial',
     'user' => 'mocksocial',
     'pass' => 'your-password-here',
   ];
   ```
5. Visit the site, log in as admin (use whatever admin credentials your DB has seeded), then **Admin → Seed content → Seed All** + **Seed engagement**.
6. **Admin → Users → Create student account** — enter a student ID. Username is the ID, password is automatically `Student26`.

`src/config.local.php` is gitignored — your credentials never leave the machine.

## Admin reference

Everything is at `?action=admin`:

- **Users** — create student accounts (locked password) or full custom accounts; edit display name / avatar / bio; reset passwords (no-op for students, since theirs is fixed)
- **Seed content** — per-platform / "all" seed buttons, plus seed engagement and a single-post manual seeder
- **Groups** — create groups on behalf of any user; delete groups
- **Stats** — override any manual analytic value (followers, reach, revenue, etc.)
- **Community Notes** — review / remove / restore notes on Twitter posts
- **Reset tools** — wipe likes, all posts, a single platform, or every non-admin user account
- **Sessions** — see last-active times for every user

## Development notes

- All seed authorship goes through `fake_users` — student accounts stay clean of seeded content.
- The post author rendering uses two helpers in `src/helpers.php`:
  - `author_select_sql()` / `author_join_sql()` — drop-in fragments for any query that needs to display a post's author (handles either real or fake author transparently)
  - `profile_url($platform, $post)` — builds the right profile link (`?user=` for real, `?fake=` for fake)
- `linkify()` does hashtag substitution **before** HTML escaping using `\x00` placeholders, so apostrophes in tweets (`don't`) don't get split by the regex matching `#039` inside HTML entities.
- Theme variables live on `:root` and `html[data-theme="dark"]` in `assets/css/base.css`. The platform-specific stylesheets override `--primary` / `--primary-tint` only, and re-darken those in their own `html[data-theme="dark"] .platform-X` rules where needed.

## License

See `LICENSE` for terms.
