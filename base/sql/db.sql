------------USER REGISTRATION------------------------------
-- DROP TABLE IF EXISTS users CASCADE;
--
-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     first VARCHAR (255) NOT NULL CHECK (first <> ''),
--     last VARCHAR (255) NOT NULL CHECK (last <> ''),
--     email VARCHAR (255) NOT NULL CHECK (email <> '') UNIQUE,
--     password_digest VARCHAR (255) NOT NULL CHECK (password_digest <> ''),
--     group_tag VARCHAR (255),
--     picture VARCHAR (300),
--     bio VARCHAR (2000),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


-------------------FRIENDSHIP BUTTON ------------------------------

-- DROP TABLE IF EXISTS friendships;
--
-- CREATE TABLE friendships (
--     id SERIAL PRIMARY KEY,
--     sender_id INT REFERENCES users(id),
--     receiver_id INT REFERENCES users(id),
--     accepted BOOLEAN DEFAULT false
-- );
--
-- SELECT * FROM friendships;

---------------CHAT----------------------------------
--
-- DROP TABLE IF EXISTS chats;
--
-- CREATE TABLE chats (
--     id SERIAL PRIMARY KEY,
--     sender_id INT NOT NULL REFERENCES users(id),
--     message VARCHAR(100000),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
--
-- SELECT * FROM chats;

-------------------------PRIVATE CHAT-------------------------------------

DROP TABLE IF EXISTS groupChat;

CREATE TABLE groupChat (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    sender_group VARCHAR(255) NOT NULL,
    message VARCHAR (100000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM groupChat;
