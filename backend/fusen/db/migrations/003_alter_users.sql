-- usersテーブルにカラム追加
ALTER TABLE users add COLUMN deleted_at TIMESTAMP DEFAULT NULL;