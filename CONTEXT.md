# MockSocial — Business Applications of Social Media

A self-hosted teaching sandbox for BTEC L3 Unit 8 (Business Applications of Social Media), Assignment 2. Each student runs the social-media presence of a single fictional organisation, schedules a campaign, and reviews engagement + search-ranking analytics so they can optimise content. The app supplies the screenshots and data; the assessed deliverable is a separate written report.

## Language

**Organisation**:
The fictional business or charity whose social-media presence a student manages. The fixed scenario organisation is the charity *Technicians Initiative*. The student acts *as* the Organisation, not as themselves.
_Avoid_: Brand, business, client, company (use Organisation; "client" refers to the review audience, see below)

**Student**:
A real logged-in learner who manages one Organisation's presence. Distinct from the people the content is aimed at.
_Avoid_: User (too broad)

**Evidence sandbox**:
The role of this app — the place where a Student performs the implementation (Aim C) and assembles plan artifacts (Aim B), producing screenshots/exports for their written report. The app is not a report-writing tool.

**Workspace**:
A Student's private, isolated instance of an Organisation's presence — its own posts, schedule, analytics, and search rankings. One Workspace per Student; no Workspace can see another's data.
_Avoid_: Tenant, instance, environment

**Campaign**:
A goal-driven, self-contained run the Student executes on behalf of the Organisation, owning its own Targets, published content, Simulation timeline (Campaign clock), and analytics. A Workspace can hold many Campaigns but only one is the Active campaign at a time.

**Active campaign**:
The single Campaign currently being posted to and simulated in a Workspace. Other Campaigns are inactive (past runs, experiments, or alternative plans) and are not accruing Simulations. All engagement metrics — followers, likes, shares, reach, Search rankings — are scoped to a Campaign and start from a defined baseline, so each Campaign's evidence is a self-contained before/after story. Only the Organisation's branding persists across Campaigns.

**Target**:
A success criterion the Student sets in-app for the Campaign (e.g. number of followers, likes, shares). Actuals are simulation-driven (never typed in); an analytics dashboard shows actual-vs-target progress over Simulations, per platform and overall. Manual stats override survives only as a teacher-only debug tool.

**Content schedule**:
A separate Aim B planning artifact documenting what the Organisation intends to post, on which Active platform, how often, and on which day/time. It is not an executable queue — the Student enacts it by publishing posts immediately, each stamped with a chosen day/time (see Posting day/time).
_Avoid_: Calendar, timetable, queue

**Posting day/time**:
A day-of-week + time-of-day the Student sets on each post when composing (e.g. Tue 18:00). The post publishes immediately but is stamped with this value; the Performance score's timing factor reads it, and frequency is derived from how posts are spaced across a Platform.

**Keyword strategy**:
The set of keywords/hashtags the Student chooses to make the Organisation's content discoverable, used both on-platform and for the search-ranking simulation.

**Campaign clock**:
The simulated date within a Workspace. It advances only when the Student runs a Simulation; it is independent of real wall-clock time.

**Simulation**:
The act of advancing the Campaign clock by a step (e.g. a day or week), during which engagement and search rankings accrue deterministically from the content already published. The optimise loop is: publish → simulate → review → optimise → simulate again.
_Avoid_: Tick, run, fast-forward (use Simulation)

**Performance score**:
A per-post weighted score the Simulation computes from teachable levers — format/rich media, keyword & hashtag use, posting day/time & frequency, and content-quality cues (length, call-to-action, on-mission). It drives how much reach and engagement a post earns. Timing/frequency and quality cues are weighted more heavily. Deterministic given the content, with seeded pseudo-random noise so results look organic but stay stable across re-simulation.
_Avoid_: Quality score, algorithm score

**Hint chip**:
A short qualitative tag shown on a post (e.g. "had an image", "posted at peak time", "no hashtags") that nudges the Student toward what helped or hurt, without revealing the Performance score math. Always visible to Students. The full factor breakdown stays hidden by default but a teacher can toggle it visible to demonstrate cause and effect.

**Search ranking**:
A simulated search-engine results position for a tracked keyword, shown both as a mock search-results page (a fake SERP the Student can search) and a keyword-rank dashboard tracking movement over Simulations. It rises with keyword presence in content, content freshness, engagement signals, and content volume/format — the basis for assessing SEO impact (C.P7).
_Avoid_: SEO score (use Search ranking)

**Platform**:
One of the mock social networks the Organisation can post to — MockTweet (twitter), MockBook (facebook), MockGram (instagram), MockTube (youtube).

**Active platform**:
A Platform the Student has chosen to use for the Organisation in their Workspace. All four exist; the Student enables the ones suited to the charity's audience (a graded plan decision) and simply leaves the rest unused.

**Fake persona**:
A fictional character (`fake_users`) representing a member of the public. Personas never log in. They play two roles: (1) the **audience** that follows, likes, shares and comments on the Organisation's content (the engagement the Simulation generates), and (2) authors of the **seeded community** backdrop. The Student never posts as a persona — all Organisation content is the Student's own. Personas never respond to an Organisation engagement: a comment thread terminates at the Student's reply.
_Avoid_: Bot, NPC

**Organisation engagement**:
The likes and replies the Student issues *while acting as the Organisation* — onto persona (seeded community) content, or onto the comments the Organisation's own posts received. It is community-management activity: cosmetic, **never scored, and never feeds Targets or the Simulation** (the Student has no influence over engagement the Organisation *receives* — that is simulation-generated, per ADR-0001). An Organisation reply goes at most one level deep below a persona comment, and personas never reply back to it.
_Avoid_: Interaction, self-like (the Organisation never engages its own posts to inflate metrics)

**Seeded community**:
Ambient persona-authored content present in a Workspace from the start, so the platforms feel populated rather than empty or as if the Organisation is the only one posting. It is background depth, not a competitor to benchmark against. Copied per Workspace so one Student's interactions never leak into another's.
_Avoid_: Feed, backdrop

**Scenario**:
A pre-authored reenactment of a real-world social-media win or fail (e.g. #McDStories, the 2009 Domino's video, Marcus Rashford's free-school-meals campaign), used *during teaching* — typically before the assignment — to show what a good viral moment and a bad PR crisis look like on the platforms. A Scenario is **scripted playback, not a Simulation**: its content and outcome are fixed and authored, never computed from a Performance score. It is never scored, never feeds Targets, and is isolated from any Student's assessment Campaign. Scenarios live in a teaching module that can be enabled or disabled. A Scenario plays in two modes — see Documentary reveal and Response branch.
_Avoid_: Event (too generic), Simulation (a Scenario is authored, not deterministically computed), Campaign (a Scenario is not a Student's assessed run)

**Documentary reveal**:
The teacher-led mode of a Scenario: stepping through what actually happened in the real case, shown on the platform renders as a fixed timeline. Linear and faithful — the real outcome *is* the lesson; nothing the room does changes it. The teacher deliberately **picks** which Scenario to project.

**Response branch**:
The student "have-a-go" mode of a Scenario: the Student picks a response (e.g. apologise / double down / stay silent) and one of a few pre-authored aftermaths plays, then the real outcome is revealed for comparison. The branches are authored content *selected* by a choice — personas never react to free-typed Student content, so the thread rules (ADR-0005) and determinism (ADR-0001) stay intact. Each Student is dealt a **random** Scenario from the library (the teacher may override to pin one Scenario for the whole class).
_Avoid_: Emergent response (the crowd is never simulated against free input)
