-- MockSocial — Facebook seed content
-- Inserts 20 random posts per non-admin user from a shared pool.
-- Safe to run multiple times (adds new posts each run).
-- Requires MySQL 8+ for the window function.

DROP TEMPORARY TABLE IF EXISTS _fb_seed;
CREATE TEMPORARY TABLE _fb_seed (content TEXT);

INSERT INTO _fb_seed (content) VALUES
-- life updates / milestones
('Big news — finally finished the kitchen renovation after 7 months. Pictures soon!'),
('Officially a homeowner today. Terrified and excited in equal measure.'),
('One year since we adopted Rosie from the shelter. Best decision we ever made.'),
('Graduation done! Thank you to everyone who supported me through this.'),
('New job starts Monday. Bit nervous but mostly excited for what''s next.'),
('Just back from two weeks in Italy — already planning the next trip.'),
('Today my little one started school. Where did the years go??'),
('Passed my driving test on the third attempt! Watch out world.'),
-- family / friends
('Sunday roast at Mum''s. Best meal of the week, every week.'),
('Catching up with old uni friends tonight — already laughing at things that happened 10 years ago.'),
('My nephew turned 5 today. Cake everywhere. Worth it.'),
('Movie night with the family. Voted on Paddington 2 for the fourth time this year.'),
('Date night for the first time in months. Highly recommend.'),
-- community / local
('Anyone know a good plumber in the area? Ours has retired and we''re stuck.'),
('Reminder that the community litter pick is this Saturday at 10am. All welcome!'),
('Lost cat in the Oakfield Road area — black and white, answers to Pepper. Please share!'),
('Just used the new café on the high street and it''s fantastic. Support local!'),
('School fundraiser smashed its target — thank you to everyone who donated!'),
('The roadworks on Mill Lane are something else. Budget an extra 20 mins.'),
('Bin collection moved to Thursday this week — pass it on.'),
-- recommendations
('Currently watching Slow Horses on Apple TV — anyone else hooked?'),
('Just finished "The Thursday Murder Club". Light, funny, recommend.'),
('Best Indian I''ve had in years was the new place on the high street. Go.'),
('Tried the new pizza spot — 10/10 sourdough base, will be back.'),
('Anyone got recommendations for a decent gym? Not bothered about fancy stuff.'),
-- education / class / work
('Just finished the new module — wild stuff.'),
('Sharing the link from class.'),
('Anyone else struggling with the marketing assignment? Misery loves company.'),
('Big shout out to the lecturer for actually making stats interesting.'),
('Submission deadline pushed back a week — sanity restored.'),
('First day back after the holidays. Coffee is the only thing holding me upright.'),
('Networking event tonight at the college — come say hi if you''re going.'),
-- events / weather / seasonal
('Happy Monday everyone!'),
('Fireworks tonight at the park — kids are buzzing.'),
('Snow day! No school, no work, all sledging.'),
('Christmas market opens this weekend — see you all at the mulled wine stand.'),
('Beer garden weather has arrived. See you down the Crown.'),
('It is far too hot to be doing anything productive today.'),
('Bonfire night was a hit — thanks to everyone who came along.'),
-- food / cooking
('Made a curry from scratch tonight — surprised myself.'),
('Sourdough starter is finally alive after three failed attempts.'),
('Sunday meal prep done. Future me will be very grateful.'),
('Slow cooker chilli is the most reliable meal in the rotation.'),
('Tried a new banana bread recipe — recipe in the comments if anyone wants it.'),
-- travel / outdoors
('Coast walk this morning was unreal. Few photos below.'),
('Lake District in October is the best version of the Lake District.'),
('Family camping trip booked for August — first one in years!'),
('Snowdonia summit done. Knees gone. Worth it.'),
('Caravan break in Cornwall — rain didn''t stop us. Magic week.'),
-- pets / garden
('New puppy joined the family today. Meet Biscuit!'),
('Cat has decided the new sofa is hers now. Co-existing is the goal.'),
('Tomatoes from the greenhouse this year are the best yet.'),
('Front lawn is finally looking respectable after a year of effort.'),
('Anyone else''s dog terrified of the hoover? Just me?'),
-- marketplace-style / asks
('Selling our old sofa — free to anyone who can collect this week.'),
('Anyone got a pressure washer I can borrow for the weekend?'),
('Giving away a bag of kids'' clothes (age 3–4) if anyone needs them.'),
('Looking for a babysitter for Saturday evening — recommendations welcome!'),
('Free moving boxes if anyone wants to come and grab them.'),
-- sport / hobbies
('Sunday League win this weekend. First time top of the table all season!'),
('Took up running in January and just did my first 10K. Buzzing.'),
('Booked tickets for the rugby — first live game in years.'),
('New parkrun PB this morning. Cake afterwards. balance.'),
('Joined a five-a-side league — anyone keen to make up the numbers?'),
('Watched the football down the pub. Result was mixed. Atmosphere was elite.'),
-- reflective / quotes / mood
('Quick reminder to check on your mates this week. Doesn''t have to be deep — just check in.'),
('Sometimes the best plan for a Saturday is no plan at all.'),
('Five years ago today I started this job — never thought I''d still be here. In the best way.'),
('Mental health awareness week — be kind, especially to yourself.'),
-- generic check-ins
('Quick post from the seed pack.'),
('Hope everyone''s having a good week!'),
('Long week. Coffee and a sit down required.'),
('Feeling proper grateful today. Don''t know why. Just am.');

-- For each fake_user, pick 20 random samples and insert as their posts.
-- Spread created_at over the last 30 days so the feed interleaves authors.
INSERT INTO posts (fake_user_id, platform, content, created_at)
SELECT fake_user_id, 'facebook', content,
       NOW() - INTERVAL FLOOR(RAND() * 30 * 24 * 60) MINUTE
FROM (
  SELECT fu.id AS fake_user_id, s.content,
         ROW_NUMBER() OVER (PARTITION BY fu.id ORDER BY RAND()) AS rn
  FROM fake_users fu
  CROSS JOIN _fb_seed s
) t
WHERE rn <= 20;

DROP TEMPORARY TABLE IF EXISTS _fb_seed;
