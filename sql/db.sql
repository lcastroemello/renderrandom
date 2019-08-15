------------USER REGISTRATION------------------------------
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR (255) NOT NULL CHECK (first <> ''),
    last VARCHAR (255) NOT NULL CHECK (last <> ''),
    displayname VARCHAR(255),
    email VARCHAR (255) NOT NULL CHECK (email <> '') UNIQUE,
    password_digest VARCHAR (255) NOT NULL CHECK (password_digest <> ''),
    picture VARCHAR (300),
    bio VARCHAR (2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;


-- -------------------FAVORITE EPISODES  -----------------
--
DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    episode_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM favorites;
-- --
-- ---------------COMMENTS-------------------------------
-- --
DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    episode INT,
    comment VARCHAR (100000),
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM comments;
--
-- -------------------------EPISODES----------------------

DROP TABLE IF EXISTS episodes CASCADE;

CREATE TABLE episodes(
    id SERIAL PRIMARY KEY,
    picture VARCHAR (300),
    title VARCHAR (300),
    summary VARCHAR (100000),
    description VARCHAR (100000),
    audio VARCHAR (400),
    duration VARCHAR(400),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM episodes;
--
-- -------------------------TAGS--------------------------
--
DROP TABLE IF EXISTS tags;

CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    tag VARCHAR (255),
    episode INT NOT NULL REFERENCES episodes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM tags;
