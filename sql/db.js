const spicedPg = require("spiced-pg");
let db;

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/renderrandom";

db = spicedPg(dbUrl);
// }

//-------ADDING info to users-------------

exports.addUser = function addUser(
    displayname,
    first_name,
    last_name,
    email,
    password
) {
    console.log("db register works");
    return db.query(
        "INSERT INTO users (displayname, first, last, email, password_digest) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [displayname, first_name, last_name, email, password]
    );
};

exports.updateImg = function updateImg(url, id) {
    return db.query("UPDATE users SET picture = $1 WHERE id=$2", [url, id]);
};

exports.updateBio = function updateBio(bio, id) {
    return db.query("UPDATE users SET bio = $1 WHERE id=$2", [bio, id]);
};

exports.updateProfile = function updateProfile(
    first,
    last,
    displayname,
    hash,
    id
) {
    return db.query(
        "UPDATE users SET first = $1, last =$2, displayname =$3, password_digest = $4 WHERE id=$5",
        [first, last, displayname, hash, id]
    );
};
//--------GETTING INFO from users--------------

exports.getUserByEmail = function getUserbyEmail(email) {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};

exports.getUserById = function getUserById(id) {
    return db.query(
        "SELECT id, first, last, password_digest, displayname, picture, bio FROM users WHERE id=$1",
        [id]
    );
};

exports.getLastEpisodesList = function getLastEpisodesList() {
    return db.query(
        "SELECT id, picture, title, summary, description, audio, duration, created_at FROM episodes ORDER BY id DESC LIMIT 3"
    );
};

exports.getEpisodesInSearch = function getEpisodesInSearch(val) {
    return db.query(
        `SELECT id, picture, title, summary, description, audio, duration, created_at FROM episodes WHERE title ILIKE $1 ORDER by title ASC`,
        [val + "%"]
    );
};

//--------------------GETTING INFO from favorites---------------------

exports.getFavoritesStatus = function getFavoritesStatus(user_id, episode_id) {
    return db.query(
        "SELECT * FROM favorites WHERE (user_id =$1 AND episode_id=$2)",
        [user_id, episode_id]
    );
};

//-----------------ADDING INFO to friendships-------------------------

exports.addFavorite = function addFavorite(user_id, episode_id) {
    return db.query(
        "INSERT INTO favorites (user_id, episode_id) VALUES ($1, $2)",
        [user_id, episode_id]
    );
};

exports.removeFavorite = function removeFavorite(episode_id, user_id) {
    return db.query(
        "DELETE FROM favorites WHERE user_id = $2 AND episode_id = $1",
        [episode_id, user_id]
    );
};

// exports.acceptFriendship = function acceptFriendship(sender_id, receiver_id) {
//     return db.query(
//         "UPDATE friendships SET accepted = true WHERE sender_id = $1 AND receiver_id = $2",
//         [sender_id, receiver_id]
//     );
// };

//-----------------ADDING INFO comments-----------------------------

exports.addComment = function addComment(userId, episode, comment) {
    return db.query(
        "INSERT INTO comments (user_id, episode, comment) VALUES ($1, $2, $3) RETURNING id, comment, created_at",
        [userId, episode, comment]
    );
};

// -----------------ADDING INFO into episodes---------------------

exports.addEpisode = function addEpisode(
    title,
    summary,
    description,
    duration,
    audio,
    picture
) {
    return db.query(
        "INSERT INTO episodes (title, summary, description, duration, audio, picture) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [title, summary, description, duration, audio, picture]
    );
};

exports.editEpisode = function editEpisode(
    title,
    summary,
    description,
    duration,
    audio,
    picture,
    episode_id
) {
    return db.query(
        "UPDATE episodes SET title =$1, summary =$2, description=$3, duration=$4, audio=$5, picture=$6 WHERE id=$7",
        [title, summary, description, duration, audio, picture, episode_id]
    );
};

exports.deleteEpisode = function deleteEpisode(id) {
    return db.query("DELETE FROM episodes WHERE id=$1", [id]);
};

// -------------------------ADDING INFO into TAGS------------------------

exports.addTags = function addTags(episode_id, tag) {
    return db.query(
        "INSERT INTO tags (episode, tag) VALUES ($1, $2) RETURNING id",
        [episode_id, tag]
    );
};

// ---------------------GETTING INFO from episodes----------------

exports.getEpisodeById = function getEpisodeById(episode_id) {
    return db.query("SELECT * FROM episodes WHERE id = $1", [episode_id]);
};

//--------------------GETTING INFO multiple tables--------------------

exports.getListOfFavorites = function getListOfFavorites(id) {
    return db.query(
        "SELECT episodes.id, title, summary, picture FROM favorites JOIN episodes ON episode_id=episodes.id WHERE user_id=$1",
        [id]
    );
};

exports.getEpisodesByTag = function getEpisodesByTag(tagname) {
    return db.query(
        "SELECT episodes.id, picture, title, summary, description, audio, duration, episodes.created_at FROM tags JOIN episodes ON episodes.id = episode WHERE tag =$1 ",
        [tagname]
    );
};

exports.getEpisodesInSearch = function getEpisodesInSearch(val) {
    return db.query(
        `SELECT id, picture, title, summary, description, audio, duration, created_at FROM episodes WHERE title ILIKE $1 ORDER by title ASC`,
        [val + "%"]
    );
};

exports.getComments = function getComments(episodeId) {
    return db.query(
        "SELECT comments.id, user_id, displayname, comment, parent_id, comments.created_at, first, last, picture FROM comments JOIN users ON users.id = user_id  WHERE episode =$1 ORDER BY comments.id DESC",
        [episodeId]
    );
};
