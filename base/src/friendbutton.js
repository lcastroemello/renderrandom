import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [button, setButton] = useState("sorry");

    useEffect(() => {
        console.log("testing props", props);
        (async () => {
            const { data } = await axios.get("/getbutton/" + props.broId);
            console.log("this is data", data);
            if (!data[0]) {
                setButton("Add this branch to your tree!");
            } else if (
                data[0].accepted == false &&
                props.userId == data[0].receiver_id
            ) {
                console.log("accept");
                setButton("Accept friendship request");
            } else if (
                data[0].accepted == false &&
                props.userId == data[0].sender_id
            ) {
                console.log("cancel");
                setButton("Cancel friendship request");
            } else if (data[0].accepted == true) {
                setButton("Prune this branch from your tree");
            }
        })();
    }, []);
    function submit() {
        if (button == "Add this branch to your tree!") {
            (async () => {
                const { data } = await axios.post(
                    "/getbutton/add/" + props.broId
                );
                console.log("add friend worked", data[0].accepted);
                setButton("Cancel friendship request");
            })();
        } else if (button == "Cancel friendship request") {
            (async () => {
                const deleted = await axios.post(
                    "/getbutton/delete/" + props.broId
                );
                console.log("delete friend request worked", deleted);
                setButton("Add this branch to your tree!");
            })();
        } else if (button == "Accept friendship request") {
            (async () => {
                const accept = await axios.post(
                    "/getbutton/accept/" + props.broId
                );
                console.log("accept friend request worked", accept);
                setButton("Prune this branch from your tree");
            })();
        } else if (button == "Prune this branch from your tree") {
            (async () => {
                const deleted = await axios.post(
                    "/getbutton/delete/" + props.broId
                );
                console.log("delete friend request worked", deleted);
                setButton("Add this branch to your tree!");
            })();
        }
    }
    return (
        <button
            onClick={submit}
            style={{ fontSize: "1rem", background: "#67912D" }}
        >
            {button}
        </button>
    );
}
