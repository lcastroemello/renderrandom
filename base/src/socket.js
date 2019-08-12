import { chatMessages, newChatMessage } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("newChatMessage", msg => store.dispatch(newChatMessage(msg)));
    }
};
