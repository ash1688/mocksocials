# Interactive platform renders with non-scored Organisation engagement

**Status:** accepted

The four Platforms are built as recognisable, navigable renders — an Organisation
profile/channel (S1) and a single-post detail with its comment thread (S3), for each of
MockTweet / MockBook / MockGram / MockTube. The Student composes posts *in place* on the
render (the standalone admin form is retired) and, acting as the Organisation, may **like and
reply to persona content and to the comments their own posts receive**. This **Organisation
engagement** is cosmetic: it is never scored and never feeds the Simulation, Targets, or
Performance score. The engagement the Organisation *receives* (followers, likes, shares,
comments) stays simulation-only (ADR-0001). The motivation is the app's purpose — producing
realistic screenshots/evidence for the written report: the renders must *feel* like real,
populated platforms a Student can manage, without ever letting the Student manufacture their
own metrics.

## Considered options

- **Read-only renders** (no Student engagement at all). Rejected: less realistic, and removes
  the community-management evidence (a Student replying to the public as the Organisation) that
  is legitimate Aim C activity.
- **Fully interactive, engagement affects metrics** (Student likes/comments move the numbers).
  Rejected: breaks ADR-0001 determinism and the Target rule that *actuals are simulation-driven,
  never typed in*. This is the one line the rebuild will not cross.

## Consequences

- **Engagement is split: given ≠ received.** Engagement the Organisation *gives* is
  Student-authored, cosmetic, unscored. Engagement the Organisation *receives* is
  simulation-only. See CONTEXT.md: **Organisation engagement**.
- **Schema:** `comments` gains an `authorKind` and a nullable `personaId` so an Organisation
  reply can be stored (previously persona-only). A likes store is added for Student-given likes
  (on persona posts and on comments), **deliberately excluded from the analytics/Target
  rollups** — including it would re-introduce the rejected option above.
- **Threads cap at one level:** a persona comment may receive at most one Organisation reply,
  and personas never reply back to it (no simulation reaction to Student-authored content
  mid-thread).
- **Single-snapshot rule:** every displayed number — on-post counts and the analysis dashboard
  alike — reads from the one latest simulation snapshot at the current Campaign clock, so
  screenshots never contradict each other. A published-but-unsimulated post shows zero
  engagement.
- **Scoping:** renders are per-campaign (`/campaign/[id]/[platform]`, `/[postId]`). Any
  campaign is *viewable* (past campaigns render at their frozen snapshot and are fully
  screenshot-able); only the Active campaign is *engageable*. The analysis dashboard is
  workspace-level with Current / Previous tabs.
- **Media uses seeded Picsum.** Images are hot-linked from `picsum.photos/seed/{postId}/…`,
  seeded by post id so the same post always shows the same image (preserves ADR-0001
  reproducibility). No video: MockTube renders a thumbnail + play overlay + a validated `MM:SS`
  duration badge. This is a *deliberate external dependency* on an otherwise on-premise app
  (ADR-0004) — it sends no Student data (only a seed string), but a firewalled/offline college
  box would render broken images; fetch-and-cache-locally is the known fallback if that bites.
- **Per-post breakdown stays at hint-chip altitude** for Students (qualitative chips +
  earned-engagement outcomes); the full numeric factor breakdown remains the teacher-only toggle
  (CONTEXT.md: Hint chip).
- **Search ranking is out of scope here** — the dashboard hub designs in a link for it, but the
  SERP + keyword-rank machine lands in a later slice.
- **Fidelity:** recognisable native layout per platform with the ported PHP Mock\* wordmarks/
  icons — no real logos or trademarked assets.
