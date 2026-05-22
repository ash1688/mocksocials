-- MockSocial — Instagram seed content
-- Inserts 20 random posts per non-admin user from a shared pool.
-- Each post gets a deterministic picsum image URL keyed off (user_id, content).
-- Safe to run multiple times (adds new posts each run).
-- Requires MySQL 8+ for the window function.

DROP TEMPORARY TABLE IF EXISTS _ig_seed;
CREATE TEMPORARY TABLE _ig_seed (content TEXT);

INSERT INTO _ig_seed (content) VALUES
-- vibes / aesthetic captions
('golden hour ✨'),
('soft launch.'),
('main character energy 💫'),
('the simple things 🌿'),
('weekend mode: activated'),
('chasing light ☀️'),
('vibes only'),
('moments like these'),
('blue sky kind of day'),
('serotonin levels: restored'),
-- travel / outdoors
('postcards from the coast 🌊 #travel'),
('took the long way home #wanderlust'),
('sunset over the hills 🌅 #goldenhour'),
('city lights & late nights 🌃 #citylife'),
('not all who wander are lost ✈️ #travelgram'),
('lake days 🏞️ #lakelife'),
('mountain therapy 🏔️ #adventure'),
('summer in a single frame ☀️🌊 #summervibes'),
('roadtrip diaries 🚐 #roadtrip'),
('that view though 👀 #landscape'),
-- food / drink
('brunch club 🥑🍳 #brunch'),
('homemade pasta night 🍝 #pasta'),
('coffee first, always ☕ #coffeelover'),
('pizza is a love language 🍕'),
('sourdough success 🍞 #baking'),
('matcha latte kind of morning 🍵'),
('Sunday roast 🥩🥔'),
('cocktail hour 🍸 #cocktails'),
('foodie tour continues 🌮'),
('ice cream weather 🍦'),
-- fashion / lifestyle
('new fit, who dis 👗 #ootd'),
('the jacket I''ll wear forever 🧥'),
('thrift haul 🛍️ #thrifted'),
('cosy season 🍂 #autumn'),
('linen weather has arrived ☀️'),
('jewellery is the answer ✨'),
('investing in good boots was my best decision 👢'),
('all black everything 🖤'),
-- fitness / wellness
('post-run glow 🏃‍♀️ #running'),
('legs day 🦵 #gym #fitness'),
('yoga reset 🧘‍♀️ #yoga'),
('walked it off 🚶‍♀️ #stepsgoal'),
('sea swim sundays 🌊 #coldwater'),
('5am club 💪 #grindset'),
('rest day, no guilt 🛋️ #recovery'),
('marathon prep is humbling 🏃‍♀️ #marathon'),
-- pets / nature
('best boy 🐶 #dogsofinstagram'),
('she rules the house, we just live in it 🐈 #catsofinstagram'),
('puppy energy ⚡ #puppy'),
('garden update 🌱 #gardening'),
('tomato season 🍅 #homegrown'),
('autumn leaves 🍁 #fallvibes'),
('sunrise walk 🐕 #morningroutine'),
-- creative / hobbies
('film photo dump 📸 #35mm'),
('first attempt at pottery 🏺 #ceramics'),
('current read 📖 #bookstagram'),
('vinyl finds 💿 #vinylcollection'),
('studio sessions 🎧 #musicproducer'),
('latte art is so close to working 🎨☕'),
('painting again after a long break 🎨 #art'),
-- events / seasonal
('birthday recap 🎂 #birthday'),
('wedding season ✨💍 #weddingguest'),
('festival mud + memories 🎶 #festival'),
('Christmas tree is up 🎄'),
('halloween costume committee meeting 🎃'),
('beach day with the family 🏖️'),
('new year, who dis ✨'),
-- city / culture
('art gallery wander 🖼️ #art'),
('coffee shop hopping ☕ #coffeeshop'),
('rooftop bar season 🍹 #london'),
('train journey thoughts 🚆'),
('found my new favourite bookstore 📚'),
('local market haul 🥬 #marketday'),
-- group / friends
('the group chat IRL 👯‍♀️ #besties'),
('reunited and it feels so good 🫶'),
('Sunday with the girls ✨'),
('boys'' weekend 🍻'),
('housewarming was unreal 🏡 #newhome'),
-- reflective
('soft life ☁️'),
('grateful for the small wins ✨'),
('this season of life is treating me well 💛'),
('reminder: rest is productive');

-- For each non-admin user, pick 20 random samples and insert as their posts.
-- Image URL is keyed off the post position so it stays unique-ish per insert.
-- Spread created_at over the last 30 days so the feed interleaves authors.
INSERT INTO posts (fake_user_id, platform, content, image_url, created_at)
SELECT fake_user_id, 'instagram', content,
       CONCAT('https://picsum.photos/seed/ig', fake_user_id, '-', LPAD(rn, 2, '0'), FLOOR(RAND()*9999), '/600/600'),
       NOW() - INTERVAL FLOOR(RAND() * 30 * 24 * 60) MINUTE
FROM (
  SELECT fu.id AS fake_user_id, s.content,
         ROW_NUMBER() OVER (PARTITION BY fu.id ORDER BY RAND()) AS rn
  FROM fake_users fu
  CROSS JOIN _ig_seed s
) t
WHERE rn <= 20;

DROP TEMPORARY TABLE IF EXISTS _ig_seed;
