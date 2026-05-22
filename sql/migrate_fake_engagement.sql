-- MockSocial — fake engagement migration
-- Extends `likes`, `comments`, and `community_notes` to support
-- engagement from `fake_users` personas as well as real users.
-- A row is attributed to EITHER user_id OR fake_user_id (one of the two).

-- likes
ALTER TABLE likes MODIFY user_id INT NULL;
ALTER TABLE likes ADD COLUMN fake_user_id INT NULL AFTER user_id;
ALTER TABLE likes ADD CONSTRAINT fk_likes_fake_user
  FOREIGN KEY (fake_user_id) REFERENCES fake_users(id) ON DELETE CASCADE;

-- comments
ALTER TABLE comments MODIFY user_id INT NULL;
ALTER TABLE comments ADD COLUMN fake_user_id INT NULL AFTER user_id;
ALTER TABLE comments ADD CONSTRAINT fk_comments_fake_user
  FOREIGN KEY (fake_user_id) REFERENCES fake_users(id) ON DELETE CASCADE;

-- community_notes
ALTER TABLE community_notes MODIFY user_id INT NULL;
ALTER TABLE community_notes ADD COLUMN fake_user_id INT NULL AFTER user_id;
ALTER TABLE community_notes ADD CONSTRAINT fk_notes_fake_user
  FOREIGN KEY (fake_user_id) REFERENCES fake_users(id) ON DELETE CASCADE;
