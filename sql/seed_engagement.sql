-- MockSocial — seed engagement (likes + comments + community notes)
-- Targets only seed posts (posts authored by fake_users).
-- Safe to re-run — adds more engagement each time.
-- Requires MySQL 8+.

-- ============================================================
-- 1. LIKES — each seed post gets a random number of fake likes
-- ============================================================
-- Per-post target count: 3–43 likes, deterministic per post id so it's stable.
-- created_at spread randomly between the post's own created_at and now.
INSERT INTO likes (post_id, fake_user_id, created_at)
SELECT post_id, fake_user_id,
       FROM_UNIXTIME(
         UNIX_TIMESTAMP(post_created_at)
         + FLOOR(RAND() * GREATEST(1, UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(post_created_at)))
       )
FROM (
  SELECT p.id AS post_id, p.created_at AS post_created_at, fu.id AS fake_user_id,
         ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY RAND()) AS rn
  FROM posts p
  CROSS JOIN fake_users fu
  WHERE p.fake_user_id IS NOT NULL
    -- don't let a fake user "like" their own post
    AND fu.id <> p.fake_user_id
) t
JOIN (
  SELECT id, FLOOR(3 + RAND() * 40) AS target
  FROM posts
  WHERE fake_user_id IS NOT NULL
) targets ON targets.id = t.post_id
WHERE t.rn <= targets.target;


-- ============================================================
-- 2. COMMENTS — short replies from fake_users on seed posts
-- ============================================================
DROP TEMPORARY TABLE IF EXISTS _seed_comments;
CREATE TEMPORARY TABLE _seed_comments (platform VARCHAR(16), content TEXT);

INSERT INTO _seed_comments (platform, content) VALUES
-- Twitter replies (terse, opinionated)
('twitter','Spot on.'),
('twitter','Hard disagree.'),
('twitter','this'),
('twitter','underrated take'),
('twitter','someone had to say it'),
('twitter','100%'),
('twitter','disagree but respect it'),
('twitter','take this down'),
('twitter','what is the source on this'),
('twitter','ratio incoming'),
('twitter','main character behaviour'),
('twitter','this is not the win you think it is'),
('twitter','quote tweet of the day'),
('twitter','my brother in christ'),
('twitter','need to lie down after reading this'),
('twitter','this aged well'),
('twitter','genuinely curious what made you tweet this'),
('twitter','bookmarked'),
('twitter','adding this to my slides'),
('twitter','the algorithm sent me here for a reason'),
-- Facebook (warm, conversational)
('facebook','Lovely!'),
('facebook','Congratulations 🎉'),
('facebook','So happy for you!'),
('facebook','Looks brilliant.'),
('facebook','We need to catch up soon!'),
('facebook','Beautiful photos x'),
('facebook','Where was this taken?'),
('facebook','Recipe please!'),
('facebook','Hope you''re well!'),
('facebook','Such great news ❤️'),
('facebook','Saw this and thought of you!'),
('facebook','That looks amazing.'),
('facebook','Tell Sarah I said hi!'),
('facebook','Best of luck with it.'),
('facebook','Proud of you 🙌'),
('facebook','We''ll see you on Saturday!'),
-- Instagram (emoji-heavy, short)
('instagram','🔥🔥🔥'),
('instagram','obsessed'),
('instagram','this is everything ✨'),
('instagram','😍😍'),
('instagram','wow!'),
('instagram','where is that 😍'),
('instagram','goalsss'),
('instagram','aesthetic'),
('instagram','need this'),
('instagram','vibes 💫'),
('instagram','beautiful 🌿'),
('instagram','iconic.'),
('instagram','stunner ✨'),
('instagram','📸📸📸'),
('instagram','dropped the link?'),
('instagram','outfit details??'),
-- YouTube (mid-length, opinionated)
('youtube','Great video, subscribed.'),
('youtube','Bookmarking this for later.'),
('youtube','Could you do a follow up on this?'),
('youtube','5 minutes in and already learned something new.'),
('youtube','You explain this better than my lecturer.'),
('youtube','Algorithm finally sent me somewhere useful.'),
('youtube','First!'),
('youtube','Did anyone else get this in their recommended out of nowhere?'),
('youtube','The editing on this is top tier.'),
('youtube','Watched twice. Worth it.'),
('youtube','Wish I had this video three years ago.'),
('youtube','You should have more subscribers than you do.'),
('youtube','Cap. Not how that works.'),
('youtube','Source on the stat at 4:12?'),
('youtube','Sub count called — they want you back.'),
('youtube','This deserves a million views.');

-- Per-post target count of comments (0–6), then pick that many random
-- fake users and a random matching-platform comment for each.
INSERT INTO comments (post_id, fake_user_id, content, created_at)
SELECT t.post_id, t.fake_user_id,
       (SELECT content FROM _seed_comments
        WHERE BINARY platform = BINARY t.platform
        ORDER BY RAND() LIMIT 1),
       FROM_UNIXTIME(
         UNIX_TIMESTAMP(t.post_created_at)
         + FLOOR(RAND() * GREATEST(1, UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(t.post_created_at)))
       )
FROM (
  SELECT p.id AS post_id, p.created_at AS post_created_at, p.platform, fu.id AS fake_user_id,
         ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY RAND()) AS rn
  FROM posts p
  CROSS JOIN fake_users fu
  WHERE p.fake_user_id IS NOT NULL
    AND fu.id <> p.fake_user_id
) t
JOIN (
  SELECT id, FLOOR(RAND() * 7) AS target
  FROM posts
  WHERE fake_user_id IS NOT NULL
) targets ON targets.id = t.post_id
WHERE t.rn <= targets.target;

DROP TEMPORARY TABLE IF EXISTS _seed_comments;


-- ============================================================
-- 3. COMMUNITY NOTES — applied to ~10% of seed Twitter posts
-- ============================================================
DROP TEMPORARY TABLE IF EXISTS _seed_notes;
CREATE TEMPORARY TABLE _seed_notes (content TEXT);

INSERT INTO _seed_notes (content) VALUES
('Readers added context: the claim in this post is missing important nuance — the original study found a much smaller effect size than implied here.'),
('Context: the figure quoted is from 2019 and has since changed substantially. Latest published data shows a different trend.'),
('Note: this is a personal opinion presented as a universal rule. Other industry sources report the opposite experience.'),
('Source check: this statistic could not be verified from any major published source. Treat with caution.'),
('This is satire / a joke — but is being widely shared as fact. Original poster has confirmed it was a hot take, not a claim.'),
('Additional context: the policy referenced was reversed last month. The current rules differ from what''s described.'),
('Important detail missing: this generalises from a single case study. Larger reviews of the evidence reach a different conclusion.'),
('Clarification: the company/brand named here has publicly disputed this characterisation. Their statement is available online.'),
('Readers added context: this is a paid promotion that wasn''t disclosed. Tag #ad would normally be expected.'),
('Note: the comparison is between two non-equivalent metrics. The like-for-like figure is closer than this post suggests.');

-- Attach a note to ~10% of fake-authored twitter posts, from a random fake user.
INSERT INTO community_notes (post_id, fake_user_id, note_text, status)
SELECT p.id, fu.id,
       (SELECT content FROM _seed_notes ORDER BY RAND() LIMIT 1),
       'visible'
FROM posts p
JOIN fake_users fu ON fu.id = (
  SELECT id FROM fake_users WHERE id <> p.fake_user_id ORDER BY RAND() LIMIT 1
)
WHERE p.platform = 'twitter'
  AND p.fake_user_id IS NOT NULL
  AND RAND() < 0.1;

DROP TEMPORARY TABLE IF EXISTS _seed_notes;
