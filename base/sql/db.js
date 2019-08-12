const spicedPg = require("spiced-pg");
let db;

// if (process.env.DATABASE_URL) {
//     db = spicedPg(process.env.DATABASE_URL);
// } else {

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/socialmedia";

db = spicedPg(dbUrl);
// }

//-------ADDING info to users-------------

exports.addUser = function addUser(
    first_name,
    last_name,
    email,
    password,
    group_tag
) {
    // console.log("db addSignature works");
    return db.query(
        "INSERT INTO users (first, last, email, password_digest, group_tag) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [first_name, last_name, email, password, group_tag]
    );
};

exports.updateImg = function updateImg(url, id) {
    return db.query("UPDATE users SET picture = $1 WHERE id=$2", [url, id]);
};

exports.updateBio = function updateBio(bio, id) {
    return db.query("UPDATE users SET bio = $1 WHERE id=$2", [bio, id]);
};

exports.updateProfile = function updateProfile(first, last, group, hash, id) {
    return db.query(
        "UPDATE users SET first = $1, last =$2, group_tag =$3, password_digest = $4 WHERE id=$5",
        [first, last, group, hash, id]
    );
};
//--------GETTING INFO from users--------------

exports.getUserByEmail = function getUserbyEmail(email) {
    return db.query("SELECT * FROM users WHERE email=$1", [email]);
};

exports.getUserById = function getUserById(id) {
    return db.query(
        "SELECT id, first, last, password_digest, group_tag, picture, bio FROM users WHERE id=$1",
        [id]
    );
};

exports.getLastUsersList = function getLastUsersList() {
    return db.query(
        "SELECT id, first, last, group_tag, picture FROM users ORDER BY id DESC LIMIT 3"
    );
};

exports.getUsersInSearch = function getUsersInSearch(val) {
    return db.query(
        `SELECT id, first, last, group_tag, picture FROM users WHERE first ILIKE $1 ORDER by first ASC`,
        [val + "%"]
    );
};

//--------------------GETTING INFO from frienships---------------------

exports.getFriendshipStatus = function getFriendshipStatus(
    sender_id,
    receiver_id
) {
    return db.query(
        "SELECT * FROM friendships WHERE (sender_id =$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)",
        [sender_id, receiver_id]
    );
};

//-----------------ADDING INFO to friendships-------------------------

exports.addFriendship = function addFriendship(sender_id, receiver_id) {
    return db.query(
        "INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING accepted",
        [sender_id, receiver_id]
    );
};

exports.deleteFriendship = function deleteFriendship(sender_id, receiver_id) {
    return db.query(
        "DELETE FROM friendships WHERE sender_id = $1 AND receiver_id = $2",
        [sender_id, receiver_id]
    );
};

exports.acceptFriendship = function acceptFriendship(sender_id, receiver_id) {
    return db.query(
        "UPDATE friendships SET accepted = true WHERE sender_id = $1 AND receiver_id = $2",
        [sender_id, receiver_id]
    );
};

//-----------------ADDING INFO chats-----------------------------

exports.addChatMessage = function addChatMessage(userId, msg) {
    return db.query(
        "INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING id, message, created_at",
        [userId, msg]
    );
};

//--------------------ADDING INFO into groupchat----------------

exports.addGroupChatMessage = function addGroupChatMessage(
    userId,
    sender_group,
    msg
) {
    return db.query(
        "INSERT INTO groupchat (sender_id, sender_group, message) VALUES ($1, $2, $3) RETURNING id, message, created_at",
        [userId, sender_group, msg]
    );
};

//--------------------GETTING INFO multiple tables--------------------

exports.getListOfUsers = function getListOfUsers(id) {
    return db.query(
        "SELECT users.id, first, last, picture, accepted FROM friendships JOIN users ON (accepted = false AND receiver_id =$1 AND sender_id = users.id) OR (accepted = true AND receiver_id = $1 AND sender_id = users.id) OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)",
        [id]
    );
};

exports.getLast10Messages = function getLast10Messages() {
    return db.query(
        "SELECT chats.id, group_tag, sender_id, message, chats.created_at, first, last, picture FROM chats  JOIN users ON users.id = sender_id ORDER BY chats.id DESC LIMIT 10"
    );
};

exports.getLast10GroupMessages = function getLast10GroupMessages(group) {
    return db.query(
        "SELECT groupchat.id, sender_group, sender_id, message, groupchat.created_at, first, last, picture FROM groupchat JOIN users ON users.id = sender_id WHERE sender_group = $1 ORDER BY groupchat.id ASC LIMIT 10",
        [group]
    );
};

// updating with conditionals (info for the future)
// UPDATE users SET group_tag='pro' WHERE id % 3 = 0
