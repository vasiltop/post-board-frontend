CREATE TABLE IF NOT EXISTS "user" (
    "username" VARCHAR(24) NOT NULL PRIMARY KEY,
    "email" VARCHAR(64) UNIQUE NOT NULL,
    "password" CHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS "post" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(32) NOT NULL,
    "content" VARCHAR(256) NOT NULL,
    "author" VARCHAR (24) NOT NULL,
    "likes" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "post_like" (
    "post_id" INT NOT NULL,
    "user_id" VARCHAR(24) NOT NULL,
    PRIMARY KEY (post_id, user_id)
);