-- MockSocial — Twitter seed content
-- Inserts 20 random tweets per non-admin user from a shared pool.
-- Safe to run multiple times (adds new posts each run).
-- Requires MySQL 8+ for the window function.

DROP TEMPORARY TABLE IF EXISTS _tw_seed;
CREATE TEMPORARY TABLE _tw_seed (content TEXT);

INSERT INTO _tw_seed (content) VALUES
-- marketing / business
('#Marketing tip: ship the campaign before perfect.'),
('Brands keep asking for "viral" like it''s a deliverable. #Marketing'),
('Hot take: your funnel is fine, your copy is the problem. #CopyWriting'),
('If your brand voice changes every quarter you don''t have one. #Branding'),
('Reminder that "engagement" without conversion is just applause. #DigitalMarketing'),
('The best ad I saw this week was a handwritten sign on a sandwich board. #SmallBiz'),
('A/B testing button colour for 3 weeks while the headline is broken. classic. #UX'),
-- hot takes / opinions
('Hot take: hashtags are punctuation now.'),
('Unpopular opinion: email is still the best channel. #Email'),
('Hot take: every podcast is 40 minutes too long. #Podcasts'),
('Stop calling it "content". It''s a video. It''s an article. Words matter. #Writing'),
-- daily life / mundane
('Coffee count: 4. Productivity: questionable.'),
('Replaced "I''m busy" with "that''s not a priority right now" and my week opened up.'),
('Mondays should be illegal but here we are.'),
('Found a tenner in last winter''s coat. Today is going to be a good day.'),
('My to-do list has a to-do list. send help. #ProductivityHacks'),
('Three tabs open. Forty in my head. #WFH'),
-- photography
('#Photography is just patience plus light.'),
('Golden hour hits different when you actually leave the house. #Photography #GoldenHour'),
('New camera, same shaky hands. #Photography'),
('Editing presets are training wheels — learn the histogram. #Photography'),
('Shot 200 frames, kept 3. That''s the job. #StreetPhotography'),
-- tech
('It''s not AI if it''s an if-statement. #AI'),
('Every "10x engineer" I''ve met had great teammates. #Tech'),
('Read the docs. Then read them again. #Coding'),
('Reminder: the bug is almost always in the code you didn''t write tests for. #Coding'),
-- music / culture / lifestyle
('New year, same playlist.'),
('Currently rotating: lo-fi, lo-fi, more lo-fi. #Music'),
('Books > scrolling. Fight me. #Reading'),
('Just discovered audiobooks at 1.5x speed. Game changer. #Books'),
('Watched a 3-hour film and remembered what attention spans used to feel like. #Film'),
-- food
('Made pasta from scratch. 9/10. The 10th point is dignity. #Cooking'),
('Sourdough is just glorified patience. #Baking'),
('Coffee shop laptop people: we are not okay but we are productive. #Coffee'),
-- travel / outdoors
('Saw the sea today. Mood: restored. #Travel'),
('Walked 14k steps and called it cardio. #Running'),
('Camping is just paying to be cold outside but I love it. #Outdoors'),
-- community / build-in-public
('Shoutout to everyone shipping their first project this week. you''re doing the thing. #BuildInPublic'),
('Best advice I got this year: "ship it ugly." #BuildInPublic'),
('If you''re reading this and you haven''t had water today — go drink some.'),
-- engagement / questions
('What''s a book that changed how you think? Drop it below. #Reading'),
('Single best productivity tool you use? I''ll start: a paper notebook. #ProductivityHacks'),
('Honest question: does anyone actually use BeReal anymore?'),
-- meta-social
('The algorithm decided I needed to see 14 cat videos today. No notes. #Cats'),
('Group chats are the new social network. Change my mind.'),
('LinkedIn told me to "congratulate" someone on 6 months at their job. We''ve lost the plot. #LinkedIn'),
-- sport — football
('Goal of the season already and it''s only October. #Football'),
('VAR has officially ruined celebrations. #PremierLeague #Football'),
('Hot take: managing in the Championship is harder than the Prem. #EFL #Football'),
('Six subs is too many. Bring back tactical fouls. #Football'),
('Transfer window is just hope with a deadline. #TransferNews #Football'),
('Sunday League ref gave 14 minutes of injury time and walked off. legend. #SundayLeague'),
('My fantasy team picked itself this week and somehow still finished bottom of the mini-league. #FPL'),
('FPL tip: never captain a defender. you''ll know why on Sunday. #FPL #FantasyFootball'),
('4-3-3 is the new 4-4-2 and I will not be taking questions. #Tactics #Football'),
('Watched a non-league game on a Tuesday night. best £8 I''ve spent all year. #NonLeague'),
('The atmosphere at women''s football right now is unreal. #WSL #WomensFootball'),
-- sport — cricket / rugby
('Test cricket > T20. there, I said it. #Cricket'),
('Five days of cricket and they call it a draw. cinema. #Cricket #TestMatch'),
('Six Nations weekend is the best weekend. fight me. #Rugby #SixNations'),
('Rugby refs miked up should be the standard in every sport. #Rugby'),
-- sport — motorsport / basketball
('F1 quali laps are the most stressful 90 seconds in sport. #F1 #Formula1'),
('Monaco is boring until it isn''t. #F1'),
('NBA playoffs hit different. #NBA #Basketball'),
('Three-point line ruined defence. #NBA'),
-- sport — tennis / running / combat / other
('Wimbledon fortnight is just unpaid leave. #Tennis #Wimbledon'),
('Five-set match on Centre Court > any film released this year. #Tennis'),
('Marathon training week 6: legs gone, ego intact. #Running #Marathon'),
('New parkrun PB this morning. small wins. #parkrun #Running'),
('Boxing on a Saturday night is back and I am here for it. #Boxing'),
('Darts crowd singing through 9-darters is peak British sport. #Darts'),
('Snooker is the only sport where silence is part of the entertainment. #Snooker'),
('Olympic year energy is unmatched. #Olympics');

-- For each fake_user, pick 20 random samples and insert as their posts.
-- created_at is randomised over the last 30 days so posts interleave between
-- authors in the feed instead of appearing in big per-author batches.
INSERT INTO posts (fake_user_id, platform, content, created_at)
SELECT fake_user_id, 'twitter', content,
       NOW() - INTERVAL FLOOR(RAND() * 30 * 24 * 60) MINUTE
FROM (
  SELECT fu.id AS fake_user_id, s.content,
         ROW_NUMBER() OVER (PARTITION BY fu.id ORDER BY RAND()) AS rn
  FROM fake_users fu
  CROSS JOIN _tw_seed s
) t
WHERE rn <= 20;

DROP TEMPORARY TABLE IF EXISTS _tw_seed;
