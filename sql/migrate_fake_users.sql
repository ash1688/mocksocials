-- MockSocial — fake_users migration
-- Adds a separate table of fictional personas that author all seed content.
-- Real users (`users` table) stays for admin + student logins only.
-- A `posts` row is now authored by EITHER `user_id` (real) OR `fake_user_id` (seed).

-- 1. fake_users table
CREATE TABLE IF NOT EXISTS fake_users (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  username     VARCHAR(64)  NOT NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL,
  avatar_url   VARCHAR(255),
  bio          TEXT,
  cover_url    VARCHAR(255),
  location     VARCHAR(120),
  education    VARCHAR(120),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Make posts.user_id nullable and add fake_user_id
-- (Safe to re-run: if the column already exists the ADD will error and you can ignore it.)
ALTER TABLE posts MODIFY user_id INT NULL;
ALTER TABLE posts ADD COLUMN fake_user_id INT NULL AFTER user_id;
ALTER TABLE posts ADD CONSTRAINT fk_posts_fake_user
  FOREIGN KEY (fake_user_id) REFERENCES fake_users(id) ON DELETE CASCADE;

-- 3. Seed 50 fictional personas
INSERT IGNORE INTO fake_users (username, display_name, avatar_url, bio, location, education) VALUES
('alex_morgan',    'Alex Morgan',       'https://picsum.photos/seed/alex_morgan/200',    'Marketing grad. Lives on flat whites.',                  'Manchester',  'University of Manchester'),
('bea_holloway',   'Beatrice Holloway', 'https://picsum.photos/seed/bea_holloway/200',   'Bookshop manager. Cat herder. Aspiring novelist.',       'Edinburgh',   'University of Edinburgh'),
('caleb_murphy',   'Caleb Murphy',      'https://picsum.photos/seed/caleb_murphy/200',   'Football coach by day, FPL obsessive by night.',         'Liverpool',   'Loughborough University'),
('daisy_patel',    'Daisy Patel',       'https://picsum.photos/seed/daisy_patel/200',    'Pastry chef. Sourdough evangelist.',                     'Bristol',     'Le Cordon Bleu London'),
('elliot_nakamura','Elliot Nakamura',   'https://picsum.photos/seed/elliot_nakamura/200','Game designer. Lo-fi enjoyer.',                          'Brighton',    'Goldsmiths'),
('fay_robinson',   'Fay Robinson',      'https://picsum.photos/seed/fay_robinson/200',   'Travel photographer & part-time hostel hopper.',         'Bath',        'Falmouth University'),
('george_thompson','George Thompson',   'https://picsum.photos/seed/george_thompson/200','Carpenter. Bad at typing.',                              'Newcastle',   'Newcastle College'),
('hannah_lewis',   'Hannah Lewis',      'https://picsum.photos/seed/hannah_lewis/200',   'Yoga teacher. Will absolutely talk about my dog.',       'Cardiff',     'Cardiff Met'),
('isaac_bennett',  'Isaac Bennett',     'https://picsum.photos/seed/isaac_bennett/200',  'Junior dev. Tabs not spaces.',                           'London',      'King''s College London'),
('jasmine_obrien', 'Jasmine O''Brien',  'https://picsum.photos/seed/jasmine_obrien/200', 'PR exec. Once met a B-list celeb in a lift.',            'Dublin',      'Trinity College Dublin'),
('kai_williams',   'Kai Williams',      'https://picsum.photos/seed/kai_williams/200',   'Surfer. Geography teacher. Bad at sitting still.',       'Newquay',     'Plymouth University'),
('lila_mitchell',  'Lila Mitchell',     'https://picsum.photos/seed/lila_mitchell/200',  'Illustrator. Loves a deadline (don''t).',                'Glasgow',     'Glasgow School of Art'),
('marcus_ellis',   'Marcus Ellis',      'https://picsum.photos/seed/marcus_ellis/200',   'Personal trainer. PB hunter.',                           'Birmingham',  'Birmingham City University'),
('naomi_singh',    'Naomi Singh',       'https://picsum.photos/seed/naomi_singh/200',    'Product designer. Notion power user.',                   'London',      'Central Saint Martins'),
('oscar_reid',     'Oscar Reid',        'https://picsum.photos/seed/oscar_reid/200',     'Trainee teacher. Ten cups of tea a day.',                'Leeds',       'University of Leeds'),
('priya_sharma',   'Priya Sharma',      'https://picsum.photos/seed/priya_sharma/200',   'Data analyst. Pivot table whisperer.',                   'Reading',     'University of Reading'),
('quinn_harris',   'Quinn Harris',      'https://picsum.photos/seed/quinn_harris/200',   'Bar manager. Always knows a guy.',                       'Sheffield',   'Sheffield Hallam'),
('riley_anderson', 'Riley Anderson',    'https://picsum.photos/seed/riley_anderson/200', 'Triathlete in training. Bad at swimming.',               'Bristol',     'University of Bristol'),
('sasha_brooks',   'Sasha Brooks',      'https://picsum.photos/seed/sasha_brooks/200',   'Wedding planner. Spreadsheet artist.',                   'Bath',        'Bath Spa University'),
('theo_walker',    'Theo Walker',       'https://picsum.photos/seed/theo_walker/200',    'Vinyl collector. Reluctant accountant.',                 'York',        'University of York'),
('uma_khatri',     'Uma Khatri',        'https://picsum.photos/seed/uma_khatri/200',     'NHS midwife. Iron-willed coffee drinker.',               'Manchester',  'University of Salford'),
('victor_chen',    'Victor Chen',       'https://picsum.photos/seed/victor_chen/200',    'Indie filmmaker. Crowdfunding lifer.',                   'London',      'NFTS'),
('willow_adams',   'Willow Adams',      'https://picsum.photos/seed/willow_adams/200',   'Florist. Bee keeper. Garden nerd.',                      'Norwich',     'UEA'),
('xavier_nguyen',  'Xavier Nguyen',     'https://picsum.photos/seed/xavier_nguyen/200',  'Architect. Will draw on any napkin.',                    'London',      'Bartlett School of Architecture'),
('yasmin_begum',   'Yasmin Begum',      'https://picsum.photos/seed/yasmin_begum/200',   'Journalist. Asks too many questions, sorry.',            'London',      'City, University of London'),
('zach_cole',      'Zachary Cole',      'https://picsum.photos/seed/zach_cole/200',      'Climbing instructor. Once fell off a 5a, never again.',  'Sheffield',   'Sheffield Hallam'),
('amelia_foster',  'Amelia Foster',     'https://picsum.photos/seed/amelia_foster/200',  'Solicitor. Reformed corporate ladder climber.',          'Manchester',  'University of Manchester'),
('benjamin_hughes','Benjamin Hughes',   'https://picsum.photos/seed/benjamin_hughes/200','Music producer. Beat per minute counter.',               'Bristol',     'BIMM Bristol'),
('chloe_davies',   'Chloe Davies',      'https://picsum.photos/seed/chloe_davies/200',   'Vet nurse. Owns three cats. Predictable.',               'Swansea',     'Swansea University'),
('dom_price',      'Dominic Price',     'https://picsum.photos/seed/dom_price/200',      'Cycling coach. Strava addict.',                          'Cambridge',   'Anglia Ruskin'),
('erin_mccarthy',  'Erin McCarthy',     'https://picsum.photos/seed/erin_mccarthy/200',  'UX writer. Comma fan.',                                  'Belfast',     'Queen''s University Belfast'),
('felix_sutton',   'Felix Sutton',      'https://picsum.photos/seed/felix_sutton/200',   'Stand-up comic. Day job: civil servant.',                'London',      'University of Westminster'),
('grace_mensah',   'Grace Mensah',      'https://picsum.photos/seed/grace_mensah/200',   'Nutritionist. Refuses to demonise carbs.',               'London',      'King''s College London'),
('harvey_roberts', 'Harvey Roberts',    'https://picsum.photos/seed/harvey_roberts/200', 'Mechanic. Knows what that noise is.',                    'Coventry',    'Coventry University'),
('imogen_clarke',  'Imogen Clarke',     'https://picsum.photos/seed/imogen_clarke/200',  'Costume designer. Avid charity shopper.',                'London',      'LCF'),
('jude_carter',    'Jude Carter',       'https://picsum.photos/seed/jude_carter/200',    'Park ranger. Knows every fungus by first name.',         'Aviemore',    'University of Stirling'),
('kira_bailey',    'Kira Bailey',       'https://picsum.photos/seed/kira_bailey/200',    'Pharmacist. Will judge your hangover cure.',             'Nottingham',  'University of Nottingham'),
('leo_hassan',     'Leo Hassan',        'https://picsum.photos/seed/leo_hassan/200',     'Cybersecurity nerd. Password manager evangelist.',       'Reading',     'University of Reading'),
('maya_edwards',   'Maya Edwards',      'https://picsum.photos/seed/maya_edwards/200',   'Primary school teacher. Glitter never washes out.',      'Exeter',      'University of Exeter'),
('noah_bates',     'Noah Bates',        'https://picsum.photos/seed/noah_bates/200',     'Brewer. Sometimes drinks his own product.',              'Leeds',       'Heriot-Watt University'),
('olivia_stone',   'Olivia Stone',      'https://picsum.photos/seed/olivia_stone/200',   'Lawyer. Recovering perfectionist.',                      'London',      'LSE'),
('patrick_quinn',  'Patrick Quinn',     'https://picsum.photos/seed/patrick_quinn/200',  'PE teacher. Bad knee, good attitude.',                   'Liverpool',   'Edge Hill University'),
('rosie_webb',     'Rosie Webb',        'https://picsum.photos/seed/rosie_webb/200',     'Beekeeper. Honey hoarder.',                              'Cotswolds',   'Royal Agricultural University'),
('sam_holloway',   'Sam Holloway',      'https://picsum.photos/seed/sam_holloway/200',   'Freelance dev. Half lives in a Discord.',                'Bristol',     'University of the West of England'),
('tilly_park',     'Tilly Park',        'https://picsum.photos/seed/tilly_park/200',     'Marketing intern. Powered by snacks.',                   'London',      'University of Westminster'),
('umar_khan',      'Umar Khan',         'https://picsum.photos/seed/umar_khan/200',      'Civil engineer. Drinks too much chai.',                  'Birmingham',  'University of Birmingham'),
('vera_lawson',    'Vera Lawson',       'https://picsum.photos/seed/vera_lawson/200',    'Retired teacher. Still corrects everyone.',              'Bath',        'Open University'),
('wes_carter',     'Wes Carter',        'https://picsum.photos/seed/wes_carter/200',     'Plumber. Always has a hot take on plumbing.',            'Stoke',       'Staffordshire University'),
('yusuf_ahmed',    'Yusuf Ahmed',       'https://picsum.photos/seed/yusuf_ahmed/200',    'Charity worker. Long-distance runner.',                  'London',      'SOAS'),
('zara_phillips',  'Zara Phillips',     'https://picsum.photos/seed/zara_phillips/200',  'Junior doctor. Survives on rota memes.',                 'Edinburgh',   'University of Edinburgh');
