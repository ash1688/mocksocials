# Deterministic fast-forward simulation drives engagement and search ranking

**Status:** accepted

The app needs campaign engagement (followers, likes, shares, reach) and search rankings
to accrue *over time* and to *respond to content quality*, so students can review which
posts performed best (C.P6), optimise (C.M3), and show search-ranking movement (C.P7) —
all within a classroom session.

We decided engagement and rankings are produced by a **fast-forward Simulation**: the
student publishes content, then advances a per-campaign clock with a "Simulate" action,
and the system computes results from a **weighted per-post performance score** (format /
rich media, keyword & hashtag use, posting day/time & frequency, content-quality cues).
Results are **deterministic given the content**, with seeded pseudo-random noise so they
look organic but do not reshuffle on re-simulation.

## Considered options

- **Real wall-clock time** — scheduled posts go live at real day/time, engagement trickles
  over real hours/days. Rejected: nothing to review until days later; unusable in a lesson.
- **Instant-on-publish** — generate all engagement the moment a post is published.
  Rejected: no sense of growth over time, and no way to re-simulate after optimising.
- **Fully random engagement** — cheap but pedagogically worthless and produces evidence a
  student cannot defend or reason about. Rejected.

## Validated scoring model (prototype, 2026-06-01)

A throwaway prototype (`src/prototype_performance_score.php`) ran archetype posts through
the formula and established the *shape* of the score:

- **Aggregation is a weighted geometric mean of the five sub-scores, not an arithmetic
  mean.** A weighted sum proved too forgiving — a fundamentally broken post (e.g. a
  text-only YouTube post) still scored ~0.86 and ranked near the top, because one bad
  factor only cost its weight. The geometric mean punishes broad mediocrity harder.
- **Geometric mean alone is still insufficient**, because small exponent-weights mean even
  a zero factor only multiplies by ≈0.72. So category-broken posts get explicit **gate
  penalty multipliers** layered on top: wrong-format-for-platform ×0.55, hashtag spam
  (>8 tags) ×0.60, posting fatigue (>10/wk) ×0.70, ghosting (0 posts/wk) ×0.50. These are
  the teachable cliffs neither mean expresses on its own.
- **The reach projection needs a low floor (≈0.08) and a steep slope**, or weak posts still
  earn enough reach to *look* successful in the engagement evidence students screenshot.
- **Reach is not comparable across platforms** (different baseline audiences); students
  compare posts within a platform. Within-platform ordering is clean.

Net: one *non-fatal* weakness (bad timing, off-mission copy) costs reach but does not tank
the post; a *fundamental* mistake visibly does; the exemplar clearly outperforms, leaving
headroom to optimise toward. Exact weights, gate multipliers and baselines remain tunable.

## Consequences

- The performance-score weighting *is* the curriculum; it must reward the levers the unit
  teaches. The formula is hidden from students by default (analytics + hint chips only),
  with a teacher toggle to reveal the factor breakdown for demonstrations.
- Determinism means re-running a simulation on unchanged content yields the same numbers,
  so screenshots are reproducible and defensible as assessment evidence.
- Seeded noise must derive from stable inputs (post id, campaign id, keyword), never from
  real time or a fresh random source, or reproducibility breaks.

## Implementation note (TS rebuild, 2026-06-02)

The prototype framed all four cliffs as per-post multipliers, but **ghosting cannot apply
per post** — a ghosted platform has no posts to multiply. So ghosting is implemented at the
**platform level**: an Active platform with no posts in the step loses followers (audience
attrition, ~2%/day), making "you enabled it but never posted" a visible decline. The other
three gates (wrong-format ×0.55, hashtag-spam ×0.60, posting-fatigue ×0.70) apply per post
as described. The ×0.50 ghosting figure is superseded by the per-day decay rate; both remain
tunable.
