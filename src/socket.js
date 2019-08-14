import { getComments, newComment } from "./actions";
import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("getComments", comments =>
            store.dispatch(getComments(comments))
        );

        socket.on("newComment", comment => store.dispatch(newComment(comment)));
    }
};
