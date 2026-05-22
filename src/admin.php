<?php
declare(strict_types=1);

function handle_admin(): void {
    require_admin();
    // Raw log file download — must run before any HTML output.
    if (($_GET['tab'] ?? '') === 'logs' && !empty($_GET['download'])) {
        $path = log_path();
        header('Content-Type: text/plain; charset=utf-8');
        header('Content-Disposition: attachment; filename="mocksocial-' . date('Ymd-His') . '.log"');
        if (is_file($path)) readfile($path);
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { admin_post_handler(); return; }
    $tab = $_GET['tab'] ?? 'users';
    render_header('', 'Admin');
    render_flash();
    admin_nav($tab);
    switch ($tab) {
        case 'seed':     admin_seed(); break;
        case 'groups':   admin_groups(); break;
        case 'stats':    admin_stats(); break;
        case 'reset':    admin_reset(); break;
        case 'sessions': admin_sessions(); break;
        case 'logs':     admin_logs(); break;
        case 'notes':    admin_notes(); break;
        case 'users':
        default:         admin_users(); break;
    }
    render_footer();
}

function admin_nav(string $active): void {
    $tabs = ['users'=>'Users','seed'=>'Seed content','groups'=>'Groups','stats'=>'Stats','notes'=>'Community Notes','reset'=>'Reset tools','sessions'=>'Sessions','logs'=>'Logs'];
    ?>
    <div class="admin-nav">
      <?php foreach ($tabs as $k => $v): ?>
        <a class="<?= $k===$active?'active':'' ?>" href="<?= url(['action'=>'admin','tab'=>$k]) ?>"><?= e($v) ?></a>
      <?php endforeach; ?>
    </div>
    <?php
}

function admin_post_handler(): void {
    $sub = $_POST['subaction'] ?? '';
    // Snapshot the relevant identifiers for the audit trail.
    $detail = [];
    foreach (['user_id','student_id','platform','group_id','post_id','stat_key','stat_value','note_id'] as $k) {
        if (isset($_POST[$k]) && $_POST[$k] !== '') $detail[] = $k.'='.$_POST[$k];
    }
    log_event('admin.'.$sub, implode(' ', $detail));
    switch ($sub) {
        case 'create_user': {
            $username = trim((string)$_POST['username']);
            $display  = trim((string)$_POST['display_name']);
            $pass     = (string)$_POST['password'];
            $isAdmin  = !empty($_POST['is_admin']) ? 1 : 0;
            $avatar   = trim((string)($_POST['avatar_url'] ?? ''));
            if ($username !== '' && $display !== '' && $pass !== '') {
                $hash = password_hash($pass, PASSWORD_BCRYPT);
                q('INSERT INTO users (username, password, display_name, avatar_url, is_admin) VALUES (?,?,?,?,?)',
                  [$username, $hash, $display, $avatar ?: 'https://picsum.photos/seed/'.$username.'/200', $isAdmin]);
                flash('User created.');
            }
            break;
        }
        case 'create_student': {
            $sid     = trim((string)($_POST['student_id'] ?? ''));
            $display = trim((string)($_POST['display_name'] ?? '')) ?: 'Student '.$sid;
            // Student usernames must be the student ID. Password is always "Student26".
            if ($sid !== '' && preg_match('/^[0-9]{4,12}$/', $sid)) {
                $hash = password_hash('Student26', PASSWORD_BCRYPT);
                q('INSERT INTO users (username, password, display_name, avatar_url, is_admin) VALUES (?,?,?,?,0)',
                  [$sid, $hash, $display, 'https://picsum.photos/seed/'.$sid.'/200']);
                flash('Student account created: '.$sid.' (password: Student26)');
            } else {
                flash('Student ID must be 4–12 digits.');
            }
            break;
        }
        case 'reset_password': {
            $uid  = (int)$_POST['user_id'];
            $pass = (string)$_POST['password'];
            // Student accounts (username = numeric Student ID) keep the fixed
            // password "Student26" and cannot be reset to anything else.
            $u = q('SELECT username, is_admin FROM users WHERE id=?', [$uid])->fetch();
            $isStudent = $u && !$u['is_admin'] && preg_match('/^[0-9]{4,12}$/', $u['username']);
            if ($isStudent) {
                q('UPDATE users SET password=? WHERE id=?', [password_hash('Student26', PASSWORD_BCRYPT), $uid]);
                flash('Student passwords are locked to "Student26" — reset to default.');
            } elseif ($pass !== '') {
                q('UPDATE users SET password=? WHERE id=?', [password_hash($pass, PASSWORD_BCRYPT), $uid]);
                flash('Password reset.');
            }
            break;
        }
        case 'update_user': {
            $uid = (int)$_POST['user_id'];
            q('UPDATE users SET display_name=?, avatar_url=?, bio=?, is_admin=? WHERE id=?',
              [trim((string)$_POST['display_name']), trim((string)$_POST['avatar_url']), trim((string)$_POST['bio']), !empty($_POST['is_admin'])?1:0, $uid]);
            flash('User updated.');
            break;
        }
        case 'delete_user': {
            $uid = (int)$_POST['user_id'];
            if ($uid !== (int)current_user()['id']) {
                q('DELETE FROM users WHERE id=?', [$uid]);
                flash('User deleted.');
            }
            break;
        }
        case 'seed_post': {
            $uid      = (int)$_POST['user_id'];
            $platform = $_POST['platform'];
            $content  = trim((string)$_POST['content']);
            $img      = trim((string)($_POST['image_url'] ?? ''));
            if ($platform === 'youtube') {
                $title    = trim((string)$_POST['title']);
                $thumb    = trim((string)$_POST['thumbnail_url']) ?: 'https://picsum.photos/seed/yt'.random_int(1,9999).'/640/360';
                $duration = trim((string)$_POST['duration']) ?: '10:00';
                $profile  = $_POST['stats_profile'] ?? 'low';
                q('INSERT INTO posts (user_id, platform, content) VALUES (?,?,?)', [$uid, 'youtube', $content]);
                $pid = (int)db()->lastInsertId();
                $seed = youtube_seed($profile);
                q('INSERT INTO youtube_meta (post_id, video_title, thumbnail_url, duration_display, stats_profile, premium_view_pct, seed_views, seed_likes, seed_comments, seed_sub_boost) VALUES (?,?,?,?,?,?,?,?,?,?)',
                  [$pid, $title, $thumb, $duration, $profile, random_int(25,30), $seed['views'], $seed['likes'], $seed['comments'], $seed['sub_boost']]);
            } else {
                q('INSERT INTO posts (user_id, platform, content, image_url) VALUES (?,?,?,?)', [$uid, $platform, $content, $img]);
            }
            flash('Seeded post.');
            break;
        }
        case 'create_group': {
            $name = trim((string)$_POST['name']);
            $desc = trim((string)$_POST['description']);
            $cov  = trim((string)$_POST['cover_url']);
            $by   = (int)$_POST['created_by'];
            if ($name !== '' && $by) {
                q('INSERT INTO groups_tbl (name, description, cover_url, created_by) VALUES (?,?,?,?)', [$name,$desc,$cov,$by]);
                $gid = (int)db()->lastInsertId();
                q('INSERT INTO group_members (group_id, user_id, role) VALUES (?,?,?)', [$gid,$by,'admin']);
                flash('Group created.');
            }
            break;
        }
        case 'delete_group': {
            q('DELETE FROM groups_tbl WHERE id=?', [(int)$_POST['group_id']]);
            flash('Group deleted.');
            break;
        }
        case 'override_stat': {
            set_stat((int)$_POST['user_id'], $_POST['platform'], $_POST['stat_key'], (int)$_POST['stat_value']);
            flash('Stat overridden.');
            break;
        }
        case 'reset_likes':
            q('TRUNCATE TABLE likes'); flash('All likes reset.'); break;
        case 'delete_non_admin_users': {
            $me = current_user();
            // Get all non-admin user ids except the current admin (defensive — should be no-op since admin is_admin=1)
            $ids = q('SELECT id FROM users WHERE is_admin = 0 AND id <> ?', [$me['id']])->fetchAll(PDO::FETCH_COLUMN);
            if ($ids) {
                $in = implode(',', array_fill(0, count($ids), '?'));
                // Clean dependent rows first (FKs may RESTRICT). Their posts cascade through fake_users in the new schema, but real-user posts use users FK.
                q('SET FOREIGN_KEY_CHECKS=0');
                // Remove engagement authored by these users
                q("DELETE FROM likes           WHERE user_id IN ($in)", $ids);
                q("DELETE FROM comments        WHERE user_id IN ($in)", $ids);
                q("DELETE FROM community_notes WHERE user_id IN ($in)", $ids);
                // Remove their posts (and dependent rows under those posts)
                $postIds = q("SELECT id FROM posts WHERE user_id IN ($in)", $ids)->fetchAll(PDO::FETCH_COLUMN);
                if ($postIds) {
                    $pin = implode(',', array_fill(0, count($postIds), '?'));
                    q("DELETE FROM likes           WHERE post_id IN ($pin)", $postIds);
                    q("DELETE FROM comments        WHERE post_id IN ($pin)", $postIds);
                    q("DELETE FROM community_notes WHERE post_id IN ($pin)", $postIds);
                    q("DELETE FROM youtube_meta    WHERE post_id IN ($pin)", $postIds);
                    q("DELETE FROM posts           WHERE id      IN ($pin)", $postIds);
                }
                q("DELETE FROM manual_stats  WHERE user_id IN ($in)", $ids);
                q("DELETE FROM group_members WHERE user_id IN ($in)", $ids);
                q("DELETE FROM groups_tbl    WHERE created_by IN ($in)", $ids);
                q("DELETE FROM users         WHERE id IN ($in)", $ids);
                q('SET FOREIGN_KEY_CHECKS=1');
                flash('Deleted '.count($ids).' non-admin user accounts and their content.');
            } else {
                flash('No non-admin users to delete.');
            }
            break;
        }
        case 'reset_posts':
            q('SET FOREIGN_KEY_CHECKS=0');
            q('TRUNCATE TABLE likes');
            q('TRUNCATE TABLE comments');
            q('TRUNCATE TABLE community_notes');
            q('TRUNCATE TABLE youtube_meta');
            q('TRUNCATE TABLE posts');
            q('SET FOREIGN_KEY_CHECKS=1');
            flash('All posts (and likes/comments/notes) reset.'); break;
        case 'reset_platform': {
            $platform = $_POST['platform'];
            $ids = q('SELECT id FROM posts WHERE platform=?', [$platform])->fetchAll(PDO::FETCH_COLUMN);
            if ($ids) {
                $in = implode(',', array_fill(0, count($ids), '?'));
                q("DELETE FROM likes WHERE post_id IN ($in)", $ids);
                q("DELETE FROM comments WHERE post_id IN ($in)", $ids);
                q("DELETE FROM community_notes WHERE post_id IN ($in)", $ids);
                q("DELETE FROM youtube_meta WHERE post_id IN ($in)", $ids);
                q("DELETE FROM posts WHERE platform=?", [$platform]);
            }
            flash('Reset platform: '.$platform);
            break;
        }
        case 'remove_note':
            q("UPDATE community_notes SET status='removed' WHERE id=?", [(int)$_POST['note_id']]);
            flash('Note removed.'); break;
        case 'restore_note':
            q("UPDATE community_notes SET status='visible' WHERE id=?", [(int)$_POST['note_id']]);
            flash('Note restored.'); break;
        case 'seed_pack':
            $only = $_POST['platform'] ?? 'all';
            admin_seed_pack($only);
            flash('Starter pack seeded' . ($only !== 'all' ? ' ('.$only.').' : '.'));
            break;
        case 'seed_engagement':
            admin_seed_engagement();
            flash('Engagement seeded — added fake likes, comments, and notes to all seed posts.');
            break;
        case 'clear_log':
            @file_put_contents(log_path(), '');
            flash('Log cleared.');
            log_event('admin.clear_log', '');
            break;
    }
    redirect(url(['action'=>'admin','tab'=>$_POST['tab'] ?? 'users']));
}

function admin_seed_engagement(): void {
    $pdo = db();

    // ---- LIKES ----
    // 3–43 random fake likes per fake-authored post. created_at sits between
    // the post's own created_at and now, so likes can't predate their post.
    $pdo->exec("
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
            AND fu.id <> p.fake_user_id
        ) t
        JOIN (
          SELECT id, FLOOR(3 + RAND() * 40) AS target
          FROM posts WHERE fake_user_id IS NOT NULL
        ) targets ON targets.id = t.post_id
        WHERE t.rn <= targets.target
    ");

    // ---- COMMENTS ----
    $pdo->exec("DROP TEMPORARY TABLE IF EXISTS _seed_comments");
    // Match posts.platform collation explicitly to avoid the "Illegal mix of collations" join error.
    // We don't assume which collation it is — look it up from information_schema.
    $platformCollation = q("SELECT COLLATION_NAME FROM information_schema.COLUMNS
                            WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'posts' AND COLUMN_NAME = 'platform'")
                          ->fetch()['COLLATION_NAME'] ?? 'utf8mb4_general_ci';
    $pdo->exec("CREATE TEMPORARY TABLE _seed_comments (
                  platform VARCHAR(16) COLLATE {$platformCollation},
                  content  TEXT
                ) CHARACTER SET utf8mb4 COLLATE {$platformCollation}");

    $pool = [
        'twitter' => [
            'Spot on.','Hard disagree.','this','underrated take','someone had to say it','100%','disagree but respect it',
            'take this down','what is the source on this','ratio incoming','main character behaviour',
            'this is not the win you think it is','quote tweet of the day','my brother in christ',
            'need to lie down after reading this','this aged well','genuinely curious what made you tweet this',
            'bookmarked','adding this to my slides','the algorithm sent me here for a reason',
        ],
        'facebook' => [
            'Lovely!','Congratulations 🎉','So happy for you!','Looks brilliant.','We need to catch up soon!',
            'Beautiful photos x','Where was this taken?','Recipe please!','Hope you\'re well!','Such great news ❤️',
            'Saw this and thought of you!','That looks amazing.','Tell Sarah I said hi!','Best of luck with it.',
            'Proud of you 🙌','We\'ll see you on Saturday!',
        ],
        'instagram' => [
            '🔥🔥🔥','obsessed','this is everything ✨','😍😍','wow!','where is that 😍','goalsss','aesthetic','need this',
            'vibes 💫','beautiful 🌿','iconic.','stunner ✨','📸📸📸','dropped the link?','outfit details??',
        ],
        'youtube' => [
            'Great video, subscribed.','Bookmarking this for later.','Could you do a follow up on this?',
            '5 minutes in and already learned something new.','You explain this better than my lecturer.',
            'Algorithm finally sent me somewhere useful.','First!',
            'Did anyone else get this in their recommended out of nowhere?','The editing on this is top tier.',
            'Watched twice. Worth it.','Wish I had this video three years ago.',
            'You should have more subscribers than you do.','Cap. Not how that works.',
            'Source on the stat at 4:12?','Sub count called — they want you back.','This deserves a million views.',
        ],
    ];
    foreach ($pool as $platform => $contents) {
        foreach ($contents as $c) {
            q('INSERT INTO _seed_comments (platform, content) VALUES (?, ?)', [$platform, $c]);
        }
    }

    // 0–6 comments per fake-authored post, drawn from the matching platform pool.
    $pdo->exec("
        INSERT INTO comments (post_id, fake_user_id, content, created_at)
        SELECT t.post_id, t.fake_user_id,
               (SELECT content FROM _seed_comments WHERE platform = t.platform ORDER BY RAND() LIMIT 1),
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
          FROM posts WHERE fake_user_id IS NOT NULL
        ) targets ON targets.id = t.post_id
        WHERE t.rn <= targets.target
    ");

    $pdo->exec("DROP TEMPORARY TABLE IF EXISTS _seed_comments");

    // ---- COMMUNITY NOTES (Twitter only, ~10% of seed posts) ----
    $notes = [
        'Readers added context: the claim in this post is missing important nuance — the original study found a much smaller effect size than implied here.',
        'Context: the figure quoted is from 2019 and has since changed substantially. Latest published data shows a different trend.',
        'Note: this is a personal opinion presented as a universal rule. Other industry sources report the opposite experience.',
        'Source check: this statistic could not be verified from any major published source. Treat with caution.',
        'This is satire / a joke — but is being widely shared as fact. Original poster has confirmed it was a hot take, not a claim.',
        'Additional context: the policy referenced was reversed last month. The current rules differ from what\'s described.',
        'Important detail missing: this generalises from a single case study. Larger reviews of the evidence reach a different conclusion.',
        'Clarification: the company/brand named here has publicly disputed this characterisation. Their statement is available online.',
        'Readers added context: this is a paid promotion that wasn\'t disclosed. Tag #ad would normally be expected.',
        'Note: the comparison is between two non-equivalent metrics. The like-for-like figure is closer than this post suggests.',
    ];

    $targetPosts = q("SELECT id, fake_user_id FROM posts
                      WHERE platform='twitter' AND fake_user_id IS NOT NULL
                        AND RAND() < 0.1")->fetchAll();
    $fakeIds = q('SELECT id FROM fake_users')->fetchAll(PDO::FETCH_COLUMN);
    foreach ($targetPosts as $p) {
        // pick a random fake user that isn't the post author
        do { $noteAuthor = $fakeIds[array_rand($fakeIds)]; } while ((int)$noteAuthor === (int)$p['fake_user_id']);
        $text = $notes[array_rand($notes)];
        q('INSERT INTO community_notes (post_id, fake_user_id, note_text, status) VALUES (?,?,?,\'visible\')',
            [(int)$p['id'], (int)$noteAuthor, $text]);
    }
}

function admin_seed_pack(string $only = 'all'): void {
    // Seed content is authored by the fictional `fake_users` personas — never
    // by real student accounts. Run sql/migrate_fake_users.sql first if empty.
    $users = q('SELECT id FROM fake_users')->fetchAll(PDO::FETCH_COLUMN);
    if (!$users) return;
    $samples = [
        'twitter'  => [
            // marketing / business takes
            '#Marketing tip: ship the campaign before perfect.',
            'Brands keep asking for "viral" like it\'s a deliverable. #Marketing',
            'Hot take: your funnel is fine, your copy is the problem. #CopyWriting',
            'If your brand voice changes every quarter you don\'t have one. #Branding',
            'Reminder that "engagement" without conversion is just applause. #DigitalMarketing',
            'The best ad I saw this week was a handwritten sign on a sandwich board. #SmallBiz',
            'A/B testing button colour for 3 weeks while the headline is broken. classic. #UX',
            // hot takes / opinions
            'Hot take: hashtags are punctuation now.',
            'Unpopular opinion: email is still the best channel. #Email',
            'Hot take: every podcast is 40 minutes too long. #Podcasts',
            'Stop calling it "content". It\'s a video. It\'s an article. Words matter. #Writing',
            // daily life / mundane
            'Coffee count: 4. Productivity: questionable.',
            'Replaced "I\'m busy" with "that\'s not a priority right now" and my week opened up.',
            'Mondays should be illegal but here we are.',
            'Found a tenner in last winter\'s coat. Today is going to be a good day.',
            'My to-do list has a to-do list. send help. #ProductivityHacks',
            'Three tabs open. Forty in my head. #WFH',
            // photography / creative
            '#Photography is just patience plus light.',
            'Golden hour hits different when you actually leave the house. #Photography #GoldenHour',
            'New camera, same shaky hands. #Photography',
            'Editing presets are training wheels — learn the histogram. #Photography',
            'Shot 200 frames, kept 3. That\'s the job. #StreetPhotography',
            // tech
            'It\'s not AI if it\'s an if-statement. #AI',
            'Every "10x engineer" I\'ve met had great teammates. #Tech',
            'Read the docs. Then read them again. #Coding',
            'Reminder: the bug is almost always in the code you didn\'t write tests for. #Coding',
            // music / culture / lifestyle
            'New year, same playlist.',
            'Currently rotating: lo-fi, lo-fi, more lo-fi. #Music',
            'Books > scrolling. Fight me. #Reading',
            'Just discovered audiobooks at 1.5x speed. Game changer. #Books',
            'Watched a 3-hour film and remembered what attention spans used to feel like. #Film',
            // food
            'Made pasta from scratch. 9/10. The 10th point is dignity. #Cooking',
            'Sourdough is just glorified patience. #Baking',
            'Coffee shop laptop people: we are not okay but we are productive. #Coffee',
            // travel / outdoors
            'Saw the sea today. Mood: restored. #Travel',
            'Walked 14k steps and called it cardio. #Running',
            'Camping is just paying to be cold outside but I love it. #Outdoors',
            // mentions / community
            'Shoutout to everyone shipping their first project this week. you\'re doing the thing. #BuildInPublic',
            'Best advice I got this year: "ship it ugly." #BuildInPublic',
            'If you\'re reading this and you haven\'t had water today — go drink some.',
            // questions / engagement bait
            'What\'s a book that changed how you think? Drop it below. #Reading',
            'Single best productivity tool you use? I\'ll start: a paper notebook. #ProductivityHacks',
            'Honest question: does anyone actually use BeReal anymore?',
            // current-events / generic
            'The algorithm decided I needed to see 14 cat videos today. No notes. #Cats',
            'Group chats are the new social network. Change my mind.',
            'LinkedIn told me to "congratulate" someone on 6 months at their job. We\'ve lost the plot. #LinkedIn',
            // sport — football
            'Goal of the season already and it\'s only October. #Football',
            'VAR has officially ruined celebrations. #PremierLeague #Football',
            'Hot take: managing in the Championship is harder than the Prem. #EFL #Football',
            'Six subs is too many. Bring back tactical fouls. #Football',
            'Transfer window is just hope with a deadline. #TransferNews #Football',
            'Sunday League ref gave 14 minutes of injury time and walked off. legend. #SundayLeague',
            'My fantasy team picked itself this week and somehow still finished bottom of the mini-league. #FPL',
            'FPL tip: never captain a defender. you\'ll know why on Sunday. #FPL #FantasyFootball',
            '4-3-3 is the new 4-4-2 and I will not be taking questions. #Tactics #Football',
            'Watched a non-league game on a Tuesday night. best £8 I\'ve spent all year. #NonLeague',
            'The atmosphere at women\'s football right now is unreal. #WSL #WomensFootball',
            // sport — cricket / rugby
            'Test cricket > T20. there, I said it. #Cricket',
            'Five days of cricket and they call it a draw. cinema. #Cricket #TestMatch',
            'Six Nations weekend is the best weekend. fight me. #Rugby #SixNations',
            'Rugby refs miked up should be the standard in every sport. #Rugby',
            // sport — motorsport / basketball
            'F1 quali laps are the most stressful 90 seconds in sport. #F1 #Formula1',
            'Monaco is boring until it isn\'t. #F1',
            'NBA playoffs hit different. #NBA #Basketball',
            'Three-point line ruined defence. #NBA',
            // sport — tennis / running / combat / other
            'Wimbledon fortnight is just unpaid leave. #Tennis #Wimbledon',
            'Five-set match on Centre Court > any film released this year. #Tennis',
            'Marathon training week 6: legs gone, ego intact. #Running #Marathon',
            'New parkrun PB this morning. small wins. #parkrun #Running',
            'Boxing on a Saturday night is back and I am here for it. #Boxing',
            'Darts crowd singing through 9-darters is peak British sport. #Darts',
            'Snooker is the only sport where silence is part of the entertainment. #Snooker',
            'Olympic year energy is unmatched. #Olympics',
        ],
        'facebook' => [
            // life updates / milestones
            'Big news — finally finished the kitchen renovation after 7 months. Pictures soon!',
            'Officially a homeowner today. Terrified and excited in equal measure.',
            'One year since we adopted Rosie from the shelter. Best decision we ever made.',
            'Graduation done! Thank you to everyone who supported me through this.',
            'New job starts Monday. Bit nervous but mostly excited for what\'s next.',
            'Just back from two weeks in Italy — already planning the next trip.',
            'Today my little one started school. Where did the years go??',
            'Passed my driving test on the third attempt! Watch out world.',
            // family / friends
            'Sunday roast at Mum\'s. Best meal of the week, every week.',
            'Catching up with old uni friends tonight — already laughing at things that happened 10 years ago.',
            'My nephew turned 5 today. Cake everywhere. Worth it.',
            'Movie night with the family. Voted on Paddington 2 for the fourth time this year.',
            'Date night for the first time in months. Highly recommend.',
            // community / local
            'Anyone know a good plumber in the area? Ours has retired and we\'re stuck.',
            'Reminder that the community litter pick is this Saturday at 10am. All welcome!',
            'Lost cat in the Oakfield Road area — black and white, answers to Pepper. Please share!',
            'Just used the new café on the high street and it\'s fantastic. Support local!',
            'School fundraiser smashed its target — thank you to everyone who donated!',
            'The roadworks on Mill Lane are something else. Budget an extra 20 mins.',
            'Bin collection moved to Thursday this week — pass it on.',
            // recommendations
            'Currently watching Slow Horses on Apple TV — anyone else hooked?',
            'Just finished "The Thursday Murder Club". Light, funny, recommend.',
            'Best Indian I\'ve had in years was the new place on the high street. Go.',
            'Tried the new pizza spot — 10/10 sourdough base, will be back.',
            'Anyone got recommendations for a decent gym? Not bothered about fancy stuff.',
            // education / class / work
            'Just finished the new module — wild stuff.',
            'Sharing the link from class.',
            'Anyone else struggling with the marketing assignment? Misery loves company.',
            'Big shout out to the lecturer for actually making stats interesting.',
            'Submission deadline pushed back a week — sanity restored.',
            'First day back after the holidays. Coffee is the only thing holding me upright.',
            'Networking event tonight at the college — come say hi if you\'re going.',
            // events / weather / seasonal
            'Happy Monday everyone!',
            'Fireworks tonight at the park — kids are buzzing.',
            'Snow day! No school, no work, all sledging.',
            'Christmas market opens this weekend — see you all at the mulled wine stand.',
            'Beer garden weather has arrived. See you down the Crown.',
            'It is far too hot to be doing anything productive today.',
            'Bonfire night was a hit — thanks to everyone who came along.',
            // food / cooking
            'Made a curry from scratch tonight — surprised myself.',
            'Sourdough starter is finally alive after three failed attempts.',
            'Sunday meal prep done. Future me will be very grateful.',
            'Slow cooker chilli is the most reliable meal in the rotation.',
            'Tried a new banana bread recipe — recipe in the comments if anyone wants it.',
            // travel / outdoors
            'Coast walk this morning was unreal. Few photos below.',
            'Lake District in October is the best version of the Lake District.',
            'Family camping trip booked for August — first one in years!',
            'Snowdonia summit done. Knees gone. Worth it.',
            'Caravan break in Cornwall — rain didn\'t stop us. Magic week.',
            // pets / garden
            'New puppy joined the family today. Meet Biscuit!',
            'Cat has decided the new sofa is hers now. Co-existing is the goal.',
            'Tomatoes from the greenhouse this year are the best yet.',
            'Front lawn is finally looking respectable after a year of effort.',
            'Anyone else\'s dog terrified of the hoover? Just me?',
            // marketplace-style / asks
            'Selling our old sofa — free to anyone who can collect this week.',
            'Anyone got a pressure washer I can borrow for the weekend?',
            'Giving away a bag of kids\' clothes (age 3–4) if anyone needs them.',
            'Looking for a babysitter for Saturday evening — recommendations welcome!',
            'Free moving boxes if anyone wants to come and grab them.',
            // sport / hobbies
            'Sunday League win this weekend. First time top of the table all season!',
            'Took up running in January and just did my first 10K. Buzzing.',
            'Booked tickets for the rugby — first live game in years.',
            'New parkrun PB this morning. Cake afterwards. balance.',
            'Joined a five-a-side league — anyone keen to make up the numbers?',
            'Watched the football down the pub. Result was mixed. Atmosphere was elite.',
            // reflective / quotes / mood
            'Quick reminder to check on your mates this week. Doesn\'t have to be deep — just check in.',
            'Sometimes the best plan for a Saturday is no plan at all.',
            'Five years ago today I started this job — never thought I\'d still be here. In the best way.',
            'Mental health awareness week — be kind, especially to yourself.',
            // generic check-ins
            'Quick post from the seed pack.',
            'Hope everyone\'s having a good week!',
            'Long week. Coffee and a sit down required.',
            'Feeling proper grateful today. Don\'t know why. Just am.',
        ],
        'instagram'=> ['vibes','sunday','golden hour','behind the scenes'],
    ];
    // Per-student target counts — each student gets their own selection drawn
    // from the shared pool, so the same post may appear under several students.
    $perUserCounts = ['twitter' => 20, 'facebook' => 20, 'instagram' => 20];
    foreach ($samples as $platform => $texts) {
        if ($only !== 'all' && $only !== $platform) continue;
        $target = $perUserCounts[$platform] ?? 20;
        foreach ($users as $uid) {
            $pool = $texts;
            shuffle($pool);
            $picks = array_slice($pool, 0, min($target, count($pool)));
            foreach ($picks as $t) {
                $img = $platform === 'instagram' ? 'https://picsum.photos/seed/sp'.random_int(1,99999).'/600/600' : '';
                // Spread created_at over the last 30 days so the feed interleaves authors.
                $minutesAgo = random_int(0, 30 * 24 * 60);
                q('INSERT INTO posts (fake_user_id, platform, content, image_url, created_at)
                   VALUES (?,?,?,?, NOW() - INTERVAL ? MINUTE)',
                   [$uid, $platform, $t, $img, $minutesAgo]);
            }
        }
    }
    // a couple of YouTube cards
    if ($only !== 'all' && $only !== 'youtube') return;
    foreach (['Mini case study','Tutorial: the basics','Behind the scenes vlog'] as $title) {
        $uid = $users[array_rand($users)];
        $minutesAgo = random_int(0, 30 * 24 * 60);
        q('INSERT INTO posts (fake_user_id, platform, content, created_at) VALUES (?,?,?, NOW() - INTERVAL ? MINUTE)',
          [$uid, 'youtube', 'Seeded video.', $minutesAgo]);
        $pid = (int)db()->lastInsertId();
        $profile = ['low','moderate','high','hyped'][array_rand(['low','moderate','high','hyped'])];
        $seed = youtube_seed($profile);
        q('INSERT INTO youtube_meta (post_id, video_title, thumbnail_url, duration_display, stats_profile, premium_view_pct, seed_views, seed_likes, seed_comments, seed_sub_boost) VALUES (?,?,?,?,?,?,?,?,?,?)',
          [$pid, $title, 'https://picsum.photos/seed/spv'.random_int(1,99999).'/640/360', '8:30', $profile, random_int(25,30), $seed['views'], $seed['likes'], $seed['comments'], $seed['sub_boost']]);
    }
}

function admin_users(): void {
    $users = q('SELECT * FROM users ORDER BY id')->fetchAll();
    ?>
    <h2>Users</h2>
    <div class="card">
      <h3>Create student account</h3>
      <p class="muted small">Username = Student ID (digits only). Password is fixed to <code>Student26</code>.</p>
      <form method="post">
        <input type="hidden" name="subaction" value="create_student"><input type="hidden" name="tab" value="users">
        <label>Student ID<input name="student_id" pattern="[0-9]{4,12}" placeholder="e.g. 19234156" required></label>
        <label>Display name <span class="muted small">(optional)</span><input name="display_name" placeholder="Leave blank to default to &quot;Student &lt;id&gt;&quot;"></label>
        <button class="btn-twitter">Create student</button>
      </form>
    </div>
    <div class="card">
      <h3>Create admin / custom user</h3>
      <form method="post">
        <input type="hidden" name="subaction" value="create_user"><input type="hidden" name="tab" value="users">
        <label>Username<input name="username" required></label>
        <label>Display name<input name="display_name" required></label>
        <label>Password<input name="password" required></label>
        <label>Avatar URL<input name="avatar_url" placeholder="optional"></label>
        <label class="checkbox"><input type="checkbox" name="is_admin" value="1"> Admin</label>
        <button class="btn-outline">Create</button>
      </form>
    </div>
    <table class="admin-table">
      <thead><tr><th>ID</th><th>Username</th><th>Display</th><th>Admin</th><th>Last active</th><th>Actions</th></tr></thead>
      <tbody>
      <?php foreach ($users as $u): ?>
        <tr>
          <td><?= (int)$u['id'] ?></td>
          <td><?= e($u['username']) ?></td>
          <td><?= e($u['display_name']) ?></td>
          <td><?= (int)$u['is_admin']===1 ? 'yes' : 'no' ?></td>
          <td><?= e($u['last_active'] ?? '—') ?></td>
          <td>
            <details>
              <summary>Reset PW</summary>
              <form method="post">
                <input type="hidden" name="subaction" value="reset_password"><input type="hidden" name="tab" value="users">
                <input type="hidden" name="user_id" value="<?= (int)$u['id'] ?>">
                <input name="password" placeholder="new password" required>
                <div class="popover-actions">
                  <button>Reset</button>
                  <button type="button" class="btn-outline" onclick="this.closest('details').open=false">Close</button>
                </div>
              </form>
            </details>
            <details>
              <summary>Edit</summary>
              <form method="post">
                <input type="hidden" name="subaction" value="update_user"><input type="hidden" name="tab" value="users">
                <input type="hidden" name="user_id" value="<?= (int)$u['id'] ?>">
                <label>Display<input name="display_name" value="<?= e($u['display_name']) ?>"></label>
                <label>Avatar URL<input name="avatar_url" value="<?= e($u['avatar_url']) ?>"></label>
                <label>Bio<textarea name="bio"><?= e($u['bio']) ?></textarea></label>
                <label class="checkbox"><input type="checkbox" name="is_admin" value="1" <?= (int)$u['is_admin']===1?'checked':'' ?>> Admin</label>
                <div class="popover-actions">
                  <button>Save</button>
                  <button type="button" class="btn-outline" onclick="this.closest('details').open=false">Close</button>
                </div>
              </form>
            </details>
            <?php if ((int)$u['id'] !== (int)current_user()['id']): ?>
            <form method="post" onsubmit="return confirm('Delete user?')" class="inline">
              <input type="hidden" name="subaction" value="delete_user"><input type="hidden" name="tab" value="users">
              <input type="hidden" name="user_id" value="<?= (int)$u['id'] ?>">
              <button class="btn-danger">Delete</button>
            </form>
            <?php endif; ?>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}

function admin_seed(): void {
    $users = q('SELECT id, username, display_name FROM users ORDER BY display_name')->fetchAll();
    ?>
    <h2>Seed content</h2>
    <div class="card">
      <h3>Seed a single post</h3>
      <form method="post">
        <input type="hidden" name="subaction" value="seed_post"><input type="hidden" name="tab" value="seed">
        <label>Post as
          <select name="user_id">
            <?php foreach ($users as $u): ?><option value="<?= (int)$u['id'] ?>"><?= e($u['display_name']) ?> (@<?= e($u['username']) ?>)</option><?php endforeach; ?>
          </select>
        </label>
        <label>Platform
          <select name="platform" onchange="document.getElementById('yt-fields').style.display=this.value==='youtube'?'block':'none'">
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
          </select>
        </label>
        <label>Content / description<textarea name="content" rows="3"></textarea></label>
        <label>Image URL (Facebook / Instagram)<input name="image_url"></label>
        <div id="yt-fields" style="display:none">
          <label>YT title<input name="title"></label>
          <label>YT thumbnail<input name="thumbnail_url"></label>
          <label>YT duration<input name="duration" value="10:00"></label>
          <label>Stats profile
            <select name="stats_profile">
              <option value="low">Low</option><option value="moderate" selected>Moderate</option>
              <option value="high">High</option><option value="hyped">Hyped</option><option value="viral">Viral</option>
            </select>
          </label>
        </div>
        <button class="btn-twitter">Seed</button>
      </form>
    </div>
    <div class="card">
      <h3>Starter pack</h3>
      <p>Adds ~20 posts per student per platform from the shared seed pool. Pick a platform or seed them all.</p>
      <form method="post" style="display:flex; gap:8px; flex-wrap:wrap;">
        <input type="hidden" name="subaction" value="seed_pack"><input type="hidden" name="tab" value="seed">
        <button name="platform" value="twitter"   class="btn-twitter">Seed Twitter</button>
        <button name="platform" value="facebook"  class="btn-facebook">Seed Facebook</button>
        <button name="platform" value="instagram" class="btn-instagram">Seed Instagram</button>
        <button name="platform" value="youtube"   class="btn-youtube">Seed YouTube</button>
        <button name="platform" value="all"       class="btn-outline"><strong>Seed All</strong></button>
      </form>
    </div>
    <div class="card">
      <h3>Seed engagement</h3>
      <p>Adds fake likes (3–43 per post), comments (0–6 per post), and community notes (~10% of Twitter posts) to every seed post. Additive — running again piles on more engagement.</p>
      <form method="post" onsubmit="return confirm('Add fake likes, comments, and notes to every seed post?')">
        <input type="hidden" name="subaction" value="seed_engagement"><input type="hidden" name="tab" value="seed">
        <button class="btn-twitter">Seed engagement</button>
      </form>
    </div>
    <?php
}

function admin_groups(): void {
    $groups = q('SELECT g.*, (SELECT COUNT(*) FROM group_members WHERE group_id=g.id) AS members, u.display_name AS creator
                 FROM groups_tbl g JOIN users u ON u.id=g.created_by ORDER BY g.id')->fetchAll();
    $users = q('SELECT id, display_name FROM users ORDER BY display_name')->fetchAll();
    ?>
    <h2>Groups</h2>
    <div class="card">
      <h3>Create group (as user)</h3>
      <form method="post">
        <input type="hidden" name="subaction" value="create_group"><input type="hidden" name="tab" value="groups">
        <label>Name<input name="name" required></label>
        <label>Description<textarea name="description"></textarea></label>
        <label>Cover URL<input name="cover_url"></label>
        <label>Creator
          <select name="created_by"><?php foreach ($users as $u): ?><option value="<?= (int)$u['id'] ?>"><?= e($u['display_name']) ?></option><?php endforeach; ?></select>
        </label>
        <button>Create</button>
      </form>
    </div>
    <table class="admin-table">
      <thead><tr><th>ID</th><th>Name</th><th>Creator</th><th>Members</th><th>Actions</th></tr></thead>
      <tbody>
      <?php foreach ($groups as $g): ?>
        <tr>
          <td><?= (int)$g['id'] ?></td>
          <td><a href="<?= url(['platform'=>'facebook','action'=>'group','id'=>$g['id']]) ?>"><?= e($g['name']) ?></a></td>
          <td><?= e($g['creator']) ?></td>
          <td><?= (int)$g['members'] ?></td>
          <td>
            <form method="post" onsubmit="return confirm('Delete group?')" class="inline">
              <input type="hidden" name="subaction" value="delete_group"><input type="hidden" name="tab" value="groups">
              <input type="hidden" name="group_id" value="<?= (int)$g['id'] ?>">
              <button class="btn-danger">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}

function admin_stats(): void {
    $rows = q('SELECT ms.*, u.display_name FROM manual_stats ms JOIN users u ON u.id=ms.user_id
               ORDER BY u.display_name, ms.platform, ms.stat_key')->fetchAll();
    ?>
    <h2>Stats override</h2>
    <table class="admin-table">
      <thead><tr><th>User</th><th>Platform</th><th>Key</th><th>Value</th><th>Update</th></tr></thead>
      <tbody>
      <?php foreach ($rows as $r): ?>
        <tr>
          <td><?= e($r['display_name']) ?></td>
          <td><?= e($r['platform']) ?></td>
          <td><?= e($r['stat_key']) ?></td>
          <td><?= pretty_number((int)$r['stat_value']) ?></td>
          <td>
            <form method="post" class="inline">
              <input type="hidden" name="subaction" value="override_stat"><input type="hidden" name="tab" value="stats">
              <input type="hidden" name="user_id" value="<?= (int)$r['user_id'] ?>">
              <input type="hidden" name="platform" value="<?= e($r['platform']) ?>">
              <input type="hidden" name="stat_key" value="<?= e($r['stat_key']) ?>">
              <input type="number" name="stat_value" value="<?= (int)$r['stat_value'] ?>">
              <button>Set</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}

function admin_notes(): void {
    $rows = q("SELECT cn.*,
                      COALESCE(u.display_name, fu.display_name) AS author,
                      p.content AS post_content,
                      p.user_id, p.fake_user_id,
                      COALESCE(pu.display_name, pfu.display_name) AS poster
               FROM community_notes cn
               LEFT JOIN users      u   ON u.id   = cn.user_id
               LEFT JOIN fake_users fu  ON fu.id  = cn.fake_user_id
               JOIN posts p ON p.id = cn.post_id
               LEFT JOIN users      pu  ON pu.id  = p.user_id
               LEFT JOIN fake_users pfu ON pfu.id = p.fake_user_id
               ORDER BY cn.created_at DESC")->fetchAll();
    ?>
    <h2>Community Notes</h2>
    <table class="admin-table">
      <thead><tr><th>Post (by)</th><th>Note (by)</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
      <?php foreach ($rows as $n): ?>
        <tr>
          <td><div class="muted small">@<?= e($n['poster']) ?></div><?= e(mb_strimwidth($n['post_content'],0,140,'…')) ?></td>
          <td><div class="muted small"><?= e($n['author']) ?></div><?= e(mb_strimwidth($n['note_text'],0,140,'…')) ?></td>
          <td><?= e($n['status']) ?></td>
          <td>
            <?php if ($n['status']==='visible'): ?>
              <form method="post" class="inline">
                <input type="hidden" name="subaction" value="remove_note"><input type="hidden" name="tab" value="notes">
                <input type="hidden" name="note_id" value="<?= (int)$n['id'] ?>">
                <button class="btn-danger">Remove</button>
              </form>
            <?php else: ?>
              <form method="post" class="inline">
                <input type="hidden" name="subaction" value="restore_note"><input type="hidden" name="tab" value="notes">
                <input type="hidden" name="note_id" value="<?= (int)$n['id'] ?>">
                <button>Restore</button>
              </form>
            <?php endif; ?>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}

function admin_reset(): void {
    ?>
    <h2>Reset tools</h2>
    <div class="card">
      <h3>Likes</h3>
      <form method="post" onsubmit="return confirm('Delete ALL likes?')">
        <input type="hidden" name="subaction" value="reset_likes"><input type="hidden" name="tab" value="reset">
        <button class="btn-danger">Reset all likes</button>
      </form>
    </div>
    <div class="card">
      <h3>All posts</h3>
      <form method="post" onsubmit="return confirm('Delete ALL posts (likes, comments, notes too)?')">
        <input type="hidden" name="subaction" value="reset_posts"><input type="hidden" name="tab" value="reset">
        <button class="btn-danger">Reset all posts</button>
      </form>
    </div>
    <div class="card">
      <h3>Reset a single platform</h3>
      <form method="post" onsubmit="return confirm('Delete all posts on that platform?')">
        <input type="hidden" name="subaction" value="reset_platform"><input type="hidden" name="tab" value="reset">
        <select name="platform"><option value="twitter">Twitter</option><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="youtube">YouTube</option></select>
        <button class="btn-danger">Reset platform</button>
      </form>
    </div>
    <div class="card">
      <h3>Delete all non-admin users</h3>
      <p class="muted small">Removes every non-admin user account (and all of their posts, comments, likes, notes, stats, groups). Admin accounts and fake_users seed personas are not touched.</p>
      <form method="post" onsubmit="return confirm('This will permanently delete EVERY non-admin user and all their content. Continue?')">
        <input type="hidden" name="subaction" value="delete_non_admin_users"><input type="hidden" name="tab" value="reset">
        <button class="btn-danger">Delete all non-admin users</button>
      </form>
    </div>
    <?php
}

function admin_logs(): void {
    $path = log_path();
    $exists = is_file($path);
    $size = $exists ? filesize($path) : 0;
    $limit = isset($_GET['limit']) ? max(50, min(5000, (int)$_GET['limit'])) : 500;
    $filter = trim((string)($_GET['filter'] ?? ''));

    // Read last $limit lines efficiently for a single afternoon's session.
    $lines = [];
    if ($exists && $size > 0) {
        $all = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        if ($filter !== '') {
            $all = array_values(array_filter($all, fn($l) => stripos($l, $filter) !== false));
        }
        $lines = array_slice($all, -$limit);
        $lines = array_reverse($lines); // newest first
    }
    ?>
    <h2>Activity log</h2>
    <p class="muted small">
      File: <code><?= e($path) ?></code> · size: <?= number_format($size) ?> bytes · showing newest <?= count($lines) ?> of last <?= (int)$limit ?>
      <?php if ($filter !== ''): ?>· filter: <code><?= e($filter) ?></code><?php endif; ?>
    </p>
    <div style="display:flex; gap:8px; align-items:center; margin-bottom:10px; flex-wrap:wrap;">
      <form method="get" style="display:flex; gap:8px; align-items:center; flex:1; min-width:300px;">
        <input type="hidden" name="action" value="admin">
        <input type="hidden" name="tab" value="logs">
        <input name="filter" value="<?= e($filter) ?>" placeholder="filter (e.g. login_failed, twitter., student ID)" style="flex:1;">
        <select name="limit">
          <?php foreach ([100,500,1000,2000,5000] as $n): ?>
            <option value="<?= $n ?>" <?= $n===$limit?'selected':'' ?>><?= $n ?> lines</option>
          <?php endforeach; ?>
        </select>
        <button>Refresh</button>
      </form>
      <a class="btn-outline" href="<?= url(['action'=>'admin','tab'=>'logs','download'=>1]) ?>">Download .log</a>
      <form method="post" style="display:inline" onsubmit="return confirm('Clear the log file? This deletes all entries.')">
        <input type="hidden" name="subaction" value="clear_log">
        <input type="hidden" name="tab" value="logs">
        <button class="btn-danger">Clear log</button>
      </form>
    </div>
    <?php if (!$lines): ?>
      <p class="muted">No log entries yet.</p>
    <?php else: ?>
      <table class="admin-table">
        <thead><tr><th>Time</th><th>Level</th><th>IP</th><th>User</th><th>Action</th><th>Detail</th></tr></thead>
        <tbody>
          <?php foreach ($lines as $l):
            $parts = explode("\t", $l, 6);
            while (count($parts) < 6) $parts[] = '';
            [$ts,$lv,$ip,$user,$act,$det] = $parts;
          ?>
            <tr>
              <td class="small"><?= e($ts) ?></td>
              <td class="small"><?= e($lv) ?></td>
              <td class="small"><?= e($ip) ?></td>
              <td class="small"><?= e($user) ?></td>
              <td class="small"><strong><?= e($act) ?></strong></td>
              <td class="small"><?= e($det) ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif;
}

function admin_sessions(): void {
    $rows = q('SELECT id, username, display_name, last_active FROM users ORDER BY last_active IS NULL, last_active DESC')->fetchAll();
    ?>
    <h2>Session overview</h2>
    <table class="admin-table">
      <thead><tr><th>User</th><th>Last active</th></tr></thead>
      <tbody>
        <?php foreach ($rows as $r): ?>
          <tr><td><?= e($r['display_name']) ?> (@<?= e($r['username']) ?>)</td><td><?= $r['last_active'] ? e($r['last_active']) . ' (' . relative_time($r['last_active']) . ' ago)' : 'never' ?></td></tr>
        <?php endforeach; ?>
      </tbody>
    </table>
    <?php
}
