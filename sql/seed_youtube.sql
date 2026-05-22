-- MockSocial — YouTube seed content
-- Inserts 20 random videos per non-admin user from a shared pool.
-- Each video creates both a `posts` row and a `youtube_meta` row.
-- Stats ranges match youtube_seed() in src/helpers.php.
-- Safe to run multiple times (adds new posts each run).
-- Requires MySQL 8+.

DROP TEMPORARY TABLE IF EXISTS _yt_seed;
CREATE TEMPORARY TABLE _yt_seed (
  title        VARCHAR(255),
  description  TEXT,
  duration     VARCHAR(16),
  profile      VARCHAR(16)
);

INSERT INTO _yt_seed (title, description, duration, profile) VALUES
-- tutorials / how-to
('How to Build Your First Website in 2026', 'A beginner-friendly walkthrough — no prior code required.', '14:22', 'high'),
('Master Pivot Tables in 10 Minutes', 'Excel productivity tips for office workers and students.', '10:15', 'moderate'),
('5 Photoshop Tricks Every Designer Should Know', 'Speed up your workflow with these underrated shortcuts.', '08:47', 'high'),
('Learn Basic Spanish in 20 Minutes', 'Everyday phrases for your next trip to Spain.', '22:01', 'moderate'),
('Beginner Guitar Lesson: Your First 5 Chords', 'From zero to playing a song by the end of the video.', '17:38', 'moderate'),
('How I Edit My Photos in Lightroom', 'My full editing workflow for portraits and landscapes.', '19:04', 'moderate'),
('Knife Skills 101', 'The cuts every home cook should learn first.', '11:23', 'low'),
('How to Build a Budget That Actually Works', 'A simple system that survives real life.', '15:12', 'high'),
-- vlogs / day in the life
('A Day in My Life as a Marketing Student', 'Lectures, library, and far too much coffee.', '13:48', 'low'),
('Morning Routine of a Solo Founder', 'Coffee, focus blocks, and the gym before lunch.', '09:51', 'moderate'),
('Vlog: 48 Hours in Edinburgh', 'Food spots, walks, and the best castle view we found.', '16:30', 'moderate'),
('Working From a Tiny Cabin in Wales', 'A week of slow living and zero meetings.', '21:09', 'moderate'),
('Moving House Vlog', 'The boxes, the chaos, the takeaway pizza ending.', '12:44', 'low'),
('Behind the Scenes of My Last Photoshoot', 'Setup, lighting, and the shots that did not make the cut.', '14:55', 'moderate'),
-- reviews / unboxings
('iPhone 17 Pro — One Month Later', 'Honest thoughts after daily use, not just a launch review.', '12:18', 'hyped'),
('Best Budget Laptops Under £500 in 2026', 'Tested 6 models for a week each. Here is the ranking.', '18:42', 'high'),
('Unboxing: New Mechanical Keyboard', 'First impressions and a typing test.', '07:21', 'moderate'),
('I Tested 5 Air Fryers — Here is the Winner', 'Chicken wings, chips, and salmon — same recipe across the board.', '15:09', 'high'),
('Are Standing Desks Actually Worth It?', 'Three months of honest use, honest verdict.', '11:34', 'moderate'),
-- gameplay / gaming
('First Look: New Open World RPG', 'No spoilers — just first impressions of the first 2 hours.', '24:11', 'hyped'),
('I Played This Game for 100 Hours So You Do Not Have To', 'The full review nobody asked for.', '28:47', 'high'),
('Speedrun Attempt: My Best Run Yet', 'Live commentary on a personal-best attempt.', '32:18', 'moderate'),
('Top 10 Indie Games You Probably Missed', 'Hidden gems from the last six months.', '13:52', 'high'),
('Building My Dream Setup — Gaming Room Tour', 'Desk, monitors, lighting, and the chair I finally caved on.', '11:06', 'high'),
-- music / performance
('Acoustic Cover: Wonderwall', 'My take on the song everyone has heard a thousand times.', '04:32', 'low'),
('Producing a Beat From Scratch', 'Lo-fi, start to finish, in one sitting.', '18:19', 'moderate'),
('Concert Vlog: Front Row at Wembley', 'The crowd, the lights, the unreal atmosphere.', '13:07', 'hyped'),
('Piano Practice: Learning Chopin', 'Two weeks of progress condensed into 10 minutes.', '10:48', 'low'),
-- fitness / sport
('30-Day Running Challenge — What Happened', 'Honest results, honest struggles.', '14:36', 'high'),
('Full Body Home Workout — No Equipment', 'Twenty minutes, no excuses.', '20:42', 'moderate'),
('Marathon Training Week 12', 'Long run, recovery food, and the playlist that saved me.', '12:21', 'low'),
('Five-A-Side Sunday — Match Highlights', 'Goals, near misses, and one pretty rough tackle.', '08:18', 'low'),
('How I Lost 10kg in 6 Months — Realistic Plan', 'No gimmicks, no fasting tricks, just the boring truth.', '17:55', 'high'),
-- food / cooking
('15-Minute Weeknight Pasta', 'One pan, six ingredients, on the table fast.', '07:48', 'moderate'),
('How To Make Proper Sourdough at Home', 'From starter to first loaf — full walkthrough.', '23:11', 'high'),
('Trying Every Item on the McDonald''s Menu', 'For science, obviously.', '19:38', 'hyped'),
('Sunday Roast — Step by Step', 'Beef, Yorkshires, gravy. The full setup.', '21:54', 'moderate'),
('Meal Prep for the Whole Week — Under £25', 'Five lunches, two dinners, all the recipes.', '14:27', 'high'),
-- tech / coding / business
('I Built a SaaS in 30 Days', 'The full journey — launch, lessons, numbers.', '26:18', 'high'),
('How AI Is Changing My Workflow', 'Three tools I use every day and one I dropped.', '13:42', 'high'),
('Explaining Crypto to My Mum', 'A 10-minute primer with no jargon.', '10:08', 'moderate'),
('What I Learned in My First Year of Freelancing', 'Money, clients, and the mistakes I would unmake.', '16:31', 'moderate'),
('How I Use Notion to Run My Life', 'A full tour of my personal dashboard.', '12:55', 'moderate'),
-- education / explainer
('Why the Pound Keeps Falling — Explained', 'Macro economics in plain English.', '11:18', 'high'),
('The Real History of Coffee', 'From Ethiopia to your morning mug.', '14:46', 'moderate'),
('How Algorithms Decide What You See', 'A short, honest breakdown.', '09:34', 'high'),
('The Science of Sleep — What Actually Works', 'Caffeine, blue light, and the bedtime stuff that matters.', '13:12', 'moderate'),
-- DIY / home
('Painting Our Kitchen — Before and After', 'Two weekends, one big result.', '08:55', 'low'),
('DIY Garden Bench From Scrap Wood', 'Cheap, easy, and surprisingly comfy.', '12:38', 'low'),
('How I Soundproofed My Home Studio on a Budget', 'Foam, blankets, and a lot of trial and error.', '15:22', 'moderate'),
-- travel / car / hobby
('Driving the North Coast 500 in 4 Days', 'Scotland''s answer to Route 66.', '24:17', 'high'),
('Car Detail: Bringing Back a 10-Year-Old Hatchback', 'Clay bar, polish, and a satisfying reveal.', '11:46', 'moderate'),
('Long-Distance Train Travel: Worth It?', 'London to Amsterdam by rail.', '16:09', 'moderate'),
-- shorts-style hits / viral content
('I Tried Living Without My Phone for 7 Days', 'It changed more than I expected.', '12:41', 'viral'),
('I Asked 100 Strangers This One Question', 'The answers were not what I expected.', '08:24', 'viral'),
('Surprising My Mum With Her Dream Holiday', 'Her reaction at the airport had me in tears.', '10:18', 'viral'),
('We Built a House in 24 Hours', 'Yes — really. Watch what happened.', '14:33', 'hyped'),
('The Cheapest Flight I Could Find From London', 'Where it took me will surprise you.', '13:08', 'hyped'),
-- niche / commentary
('Honest Thoughts on the New Premier League Season', 'Predictions, hot takes, and a couple of bold calls.', '17:42', 'moderate'),
('Reacting to My First Ever YouTube Video', 'It is bad. It is very bad.', '09:18', 'low'),
('Reading Your Comments — Q&A Vol. 3', 'Answering the questions you actually asked.', '15:51', 'moderate'),
('The State of Indie Filmmaking in 2026', 'A long ramble nobody asked for.', '22:04', 'low');

-- Seed videos via a stored procedure so each row creates both a `posts` row
-- and a matched `youtube_meta` row (we need LAST_INSERT_ID() between them).
DROP PROCEDURE IF EXISTS _seed_yt;
DELIMITER $$
CREATE PROCEDURE _seed_yt()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_fuid INT;
  DECLARE v_title VARCHAR(255);
  DECLARE v_desc  TEXT;
  DECLARE v_dur   VARCHAR(16);
  DECLARE v_prof  VARCHAR(16);
  DECLARE v_views BIGINT;
  DECLARE v_likes BIGINT;
  DECLARE v_comments BIGINT;
  DECLARE v_subs BIGINT;
  DECLARE v_thumb VARCHAR(255);
  DECLARE cur CURSOR FOR
    SELECT fake_user_id, title, description, duration, profile FROM (
      SELECT fu.id AS fake_user_id, s.title, s.description, s.duration, s.profile,
             ROW_NUMBER() OVER (PARTITION BY fu.id ORDER BY RAND()) AS rn
      FROM fake_users fu
      CROSS JOIN _yt_seed s
    ) t
    WHERE rn <= 20;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;
  read_loop: LOOP
    FETCH cur INTO v_fuid, v_title, v_desc, v_dur, v_prof;
    IF done THEN LEAVE read_loop; END IF;

    -- Stat ranges per youtube_seed() in src/helpers.php
    SET v_views = CASE v_prof
      WHEN 'low'      THEN FLOOR(200       + RAND() * 600)
      WHEN 'moderate' THEN FLOOR(5000      + RAND() * 20000)
      WHEN 'high'     THEN FLOOR(100000    + RAND() * 400000)
      WHEN 'hyped'    THEN FLOOR(1000000   + RAND() * 4000000)
      WHEN 'viral'    THEN FLOOR(10000000  + RAND() * 70000000)
      ELSE 1000 END;
    SET v_likes = CASE v_prof
      WHEN 'low'      THEN FLOOR(10        + RAND() * 30)
      WHEN 'moderate' THEN FLOOR(300       + RAND() * 1200)
      WHEN 'high'     THEN FLOOR(8000      + RAND() * 32000)
      WHEN 'hyped'    THEN FLOOR(80000     + RAND() * 320000)
      WHEN 'viral'    THEN FLOOR(500000    + RAND() * 4500000)
      ELSE 50 END;
    SET v_comments = CASE v_prof
      WHEN 'low'      THEN FLOOR(2         + RAND() * 6)
      WHEN 'moderate' THEN FLOOR(50        + RAND() * 150)
      WHEN 'high'     THEN FLOOR(1000      + RAND() * 4000)
      WHEN 'hyped'    THEN FLOOR(10000     + RAND() * 40000)
      WHEN 'viral'    THEN FLOOR(50000     + RAND() * 450000)
      ELSE 10 END;
    SET v_subs = CASE v_prof
      WHEN 'low'      THEN FLOOR(5         + RAND() * 15)
      WHEN 'moderate' THEN FLOOR(50        + RAND() * 250)
      WHEN 'high'     THEN FLOOR(2000      + RAND() * 8000)
      WHEN 'hyped'    THEN FLOOR(20000     + RAND() * 80000)
      WHEN 'viral'    THEN FLOOR(100000    + RAND() * 1900000)
      ELSE 20 END;

    SET v_thumb = CONCAT('https://picsum.photos/seed/yt', v_fuid, '-', FLOOR(RAND()*99999), '/640/360');

    INSERT INTO posts (fake_user_id, platform, content, created_at)
      VALUES (v_fuid, 'youtube', v_desc,
              NOW() - INTERVAL FLOOR(RAND() * 30 * 24 * 60) MINUTE);
    SET @pid = LAST_INSERT_ID();

    INSERT INTO youtube_meta
      (post_id, video_title, thumbnail_url, duration_display, stats_profile,
       premium_view_pct, seed_views, seed_likes, seed_comments, seed_sub_boost)
    VALUES
      (@pid, v_title, v_thumb, v_dur, v_prof,
       FLOOR(25 + RAND() * 6), v_views, v_likes, v_comments, v_subs);
  END LOOP;
  CLOSE cur;
END$$
DELIMITER ;

CALL _seed_yt();

DROP PROCEDURE IF EXISTS _seed_yt;
DROP TEMPORARY TABLE IF EXISTS _yt_seed;
