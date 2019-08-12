import { groupMessages, newGroupMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io("/groupchat").connect();

        socket.on("groupMessages", msgs => {
            store.dispatch(groupMessages(msgs));
            console.log("socket 2 on get messages works", msgs);
        });

        socket.on("newGroupMessage", msg => {
            console.log("socket 2 on post message works");
            store.dispatch(newGroupMessage(msg));
        });
    }
};
