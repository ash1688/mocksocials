# Bugs and Fixes — Test Session Backlog

Issues spotted during the student test session on 2026-05-22.
Raw activity log for the session is in [`session-log-2026-05-22.log`](./session-log-2026-05-22.log).

## Backlog

### 1. Profile link on the main menu (with 4 profile edit options)
A unified "Profile" entry point should appear on the main menu / topbar, giving access to edit options across all four platforms (avatar, bio, display name, cover photo).

- **Where**: topbar `.userbox` in [`src/helpers.php`](../src/helpers.php) `render_header()`
- **Behaviour**: clicking the username opens a profile-edit landing page with four tabs / cards (one per platform), or a single combined editor

### 2. Negative number input on stats
Manual analytics inputs accept negative numbers — followers/views/etc. should be `min="0"`.

- **Where**: [`src/stats.php`](../src/stats.php) and the admin "Stats override" inputs in [`src/admin.php`](../src/admin.php) (`admin_stats`)
- **Fix**: add `min="0"` to every `<input type="number">` for stat values; server-side, `max(0, (int)$value)` before persisting

### 3. New Story creation on MockGram
Currently the IG story bar pulls from `fake_users` and is decorative. Add a way for the logged-in student to add their own story.

- **Where**: [`src/instagram.php`](../src/instagram.php) — `ig_story_bar()`
- **Sketch**: a "Your story +" tile at the start of the bar, opening a small upload form; stories table or a flag column on `posts` (e.g. `is_story` + expiry timestamp)

### 4. YouTube video duration accepts letters
The "Duration" field on video upload is a free-text input — students can type letters or junk into it and it'll be stored as-is, then displayed on the card.

- **Where**: [`src/youtube.php`](../src/youtube.php) `yt_upload_form()` — the `<input name="duration">`
- **Fix**: add `pattern="\d{1,2}:\d{2}"` and a placeholder showing the expected `MM:SS` format; server-side validate with the same regex and reject / default if invalid

### 5. PHP redirect goes to the top of the page or wrong page
Some POST → redirect flows land on the homepage or scroll to the top instead of returning to the originating view.

- **Suspect spots**:
  - Twitter handler doesn't always preserve `_return` (the like/retweet forms in [`src/twitter.php`](../src/twitter.php))
  - Facebook comment form posts and redirects to the platform root, losing the post anchor
  - Instagram like form returns to the IG root regardless of which page it was clicked from
- **Fix**: ensure every form includes a hidden `_return` field set to the current URL (including hash anchor to the specific post id), and that the handler honours it

### 6. Nested / indented comments with their own engagement actions
Replies-to-comments should indent and get the same like / reply controls.

- **Where**: comment rendering in [`facebook.php`](../src/facebook.php) `fb_render_post()`, [`instagram.php`](../src/instagram.php) `ig_render_post()`, [`youtube.php`](../src/youtube.php) `yt_watch()`
- **Schema change**: add `comments.parent_comment_id INT NULL` (FK to `comments.id`)
- **Rendering**: walk the tree, indent each child by 24–32px, render the same `[♥ Like]` / `[Reply]` actions per node
- **Engagement**: likes on comments — either a new `comment_likes` table or extend `likes` with a nullable `comment_id`

## Suggested triage order

1. **#2 (negative inputs)** — one-line fix, highest ratio of complaint-to-effort.
2. **#4 (duration validation)** — small fix, prevents bad data.
3. **#5 (redirect fixes)** — UX papercut, scattered across files but mechanical.
4. **#1 (profile menu)** — new UI; design first, build second.
5. **#3 (new IG story)** — new feature, modest schema work.
6. **#6 (nested comments)** — biggest piece; schema + recursive render + per-node engagement. Worth a separate branch.
