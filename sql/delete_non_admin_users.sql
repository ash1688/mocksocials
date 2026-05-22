-- MockSocial — delete all non-admin user accounts and their content.
-- Keeps admin accounts and the fake_users seed personas untouched.

SET @ids := (SELECT GROUP_CONCAT(id) FROM users WHERE is_admin = 0);

-- If there's nothing to delete, the rest of the script is a no-op.
SET FOREIGN_KEY_CHECKS = 0;

-- Engagement authored BY these users
DELETE FROM likes           WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0);
DELETE FROM comments        WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0);
DELETE FROM community_notes WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0);

-- Posts authored BY these users (drag along their dependent rows)
DELETE FROM likes           WHERE post_id IN (SELECT id FROM posts WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0));
DELETE FROM comments        WHERE post_id IN (SELECT id FROM posts WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0));
DELETE FROM community_notes WHERE post_id IN (SELECT id FROM posts WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0));
DELETE FROM youtube_meta    WHERE post_id IN (SELECT id FROM posts WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0));
DELETE FROM posts           WHERE user_id IN (SELECT id FROM users WHERE is_admin = 0);

-- Misc per-user data
DELETE FROM manual_stats    WHERE user_id    IN (SELECT id FROM users WHERE is_admin = 0);
DELETE FROM group_members   WHERE user_id    IN (SELECT id FROM users WHERE is_admin = 0);
DELETE FROM groups_tbl      WHERE created_by IN (SELECT id FROM users WHERE is_admin = 0);

-- Finally the user rows themselves
DELETE FROM users WHERE is_admin = 0;

SET FOREIGN_KEY_CHECKS = 1;
