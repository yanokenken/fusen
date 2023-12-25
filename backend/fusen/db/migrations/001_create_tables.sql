-- create users table　ユーザー
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	account_type VARCHAR(20) NOT NULL DEFAULT 'guest', -- guest, free, premium, admin
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- create preferences table ユーザーの設定
CREATE TABLE preferences (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	theme VARCHAR(255) NOT NULL DEFAULT 'light',
	default_tab VARCHAR(255) NOT NULL DEFAULT 'list',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- create boads table ボード(付箋を貼る場所) ※user_idがNULLの場合はアカウント作成前にも作れるボード
CREATE TABLE boards (
	id UUID PRIMARY KEY,
	user_id INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
	is_public BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- create fusens table 付箋
CREATE TABLE fusens (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	board_id VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	memo VARCHAR(255) NULL,
	is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
	is_important BOOLEAN NOT NULL DEFAULT FALSE,
	status INTEGER NOT NULL DEFAULT 0,	
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- create checkpoints table 付箋の中に持つチェックポイント
CREATE TABLE checkpoints (
	id VARCHAR(51) PRIMARY KEY,
	fusen_id INTEGER NOT NULL,
	body VARCHAR(255) NOT NULL,
	is_checked BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fusen_id) REFERENCES fusens(id)
);

-- create tags table タグ
CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	name VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
