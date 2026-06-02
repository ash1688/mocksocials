# Teaching Scenarios are authored narrative playback, decoupled from the Simulation

**Status:** accepted

The app needs to *teach* what a social-media win or PR fail looks like — reenacting real cases
(#McDStories, Domino's, CSGO Lotto, Rashford) — *before* students start their assessed work. A
**Scenario** is a pre-authored, teacher-triggered reenactment that plays out as a click-through
timeline of **Beats**, in two modes (Documentary reveal; Response branch — see CONTEXT.md). We
decided Scenarios are **scripted authored-narrative playback, fully decoupled from the
Simulation** (ADR-0001): nothing in a Scenario is *computed* — every engagement number, comment
and outcome is authored. The "chance it goes viral" in the original pitch is realised as a fixed
story, not a dice roll, so it never touches the determinism-and-evidence contract.

## Considered options

- **Genuine random virality on student content.** Rejected: breaks ADR-0001 determinism and the
  "actuals are simulation-driven, never injected" rule, and produces evidence a student can't
  defend.
- **Inject events into a live assessment Campaign.** Rejected: a teacher-triggered spike inside
  data a student screenshots as evidence comes from neither their content nor the score. Per-Campaign
  scoping (ADR-0002) keeps the demo isolated for free; we lean on scoping, not classroom timing.
- **Seed a throwaway Workspace/Campaign per Scenario (data-reuse).** Rejected: the schema is built
  around *one* Organisation + seeded personas with *Simulation-computed* metrics. A Scenario spans
  multiple platforms, media outlets, reaction channels and regulators, with *authored* engagement
  curves — none of which fit. It would mean inventing fake entities and re-coupling to the engine we
  set out to decouple from.

## Consequences

- **Render-reuse, not data-reuse.** A Scenario reuses the *visual chrome* of the platform renders
  (ADR-0005) but feeds them **authored card data**. Every story element — including media pickup and
  reaction videos — is "a post on a platform render attributed to an authored account"; the only
  variable is *who* posts. No throwaway Organisation, no fake `postMetrics`, no Simulation in the path.
- **A teaching-only module**, enable/disable-able and kept out of the scoring path. Its isolation
  from assessment evidence is enforced by per-Campaign scoping (ADR-0002), not by classroom discipline.
- **Deliberate departure from ADR-0005's no-real-trademarks stance.** Scenarios use **real brands,
  people and places** because they are dramatised real cases and recognisability *is* the teaching
  value. This latitude holds only while the app is an internal, on-prem teaching tool; distributing it
  or showing it outside the college re-opens this decision.
- **Fails are playable; wins are exemplary.** A fail carries one decision beat with a shared palette
  of Response archetypes (apology / deny-defend-attack / silent / false-equivalence) and per-Scenario
  authored tails; the student have-a-go (random draw) deals only from fails. A win is Documentary-only.
- **Audience clash is authored, not simulated.** Whether the crowd polarises is a property of the
  Scenario's Audience disposition (consensus vs pre-polarised), shown inside authored tails — no
  emergent crowd model, so ADR-0005's "personas never react to Organisation/Student replies" holds.
