import axios from "./axios";

export async function receiveFriends() {
    console.log("actions");
    const { data } = await axios.get("/friends.json");
    console.log("testing data action", data);
    return {
        type: "RECEIVE_FRIENDS",
        users: data.rows
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

export async function endFriendship(id) {
    const deleted = await axios.post("getbutton/delete/" + id);
    console.log("delete friend request worked", deleted);
    return {
        type: "END_FRIENDSHIP",
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
