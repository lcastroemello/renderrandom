import axios from "./axios";

export async function receiveFavorites() {
    const { data } = await axios.get("/favorites.json");
    return {
        type: "RECEIVE_FAVORITES",
        favorites: data.rows
    };
}

export async function acceptRequest(id) {
    const accept = await axios.post("/getbutton/accept/" + id);
    console.log("accept friend request worked", accept);
    return {
        type: "ACCEPT_REQUEST",
        id
    };
}

export async function removeFavorite(id) {
    const deleted = await axios.post("getbutton/delete/" + id);
    console.log("remove favorite request worked", deleted);
    return {
        type: "REMOVE_FAVORITE",
        id
    };
}

export function chatMessages(msgs) {
    return {
        type: "GET_CHAT_MESSAGES",
        msgs: msgs
    };
}

export function newChatMessage(msg) {
    console.log("testing msg in actions", msg);
    return {
        type: "POST_NEW_CHAT_MESSAGE",
        msg
    };
}

export function getComments(comments) {
    console.log("testing comments in actions", comments);
    return {
        type: "GET_COMMENTS",
        comments
    };
}

export function newComment(comment) {
    return {
        type: "POST_NEW_COMMENT",
        comment
    };
}

export function groupMessages(msgs) {
    return {
        type: "GET_GROUP_MESSAGES",
        groupmsgs: msgs
    };
}

export function newGroupMessage(msg) {
    console.log("testing group message in actions", msg);
    return {
        type: "POST_NEW_GROUP_MESSAGE",
        msg
    };
}
