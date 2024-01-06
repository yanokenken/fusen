-- usersテーブルにカラム追加
ALTER TABLE users ADD COLUMN confirmation_token VARCHAR(255);
ALTER TABLE users ADD COLUMN slug VARCHAR(20);
ALTER TABLE users ADD CONSTRAINT unique_slug UNIQUE (slug);


