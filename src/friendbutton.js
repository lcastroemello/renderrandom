import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton(props) {
    const [button, setButton] = useState("sorry");

    useEffect(() => {
        console.log("testing props", props);
        (async () => {
            const { data } = await axios.get("/getbutton/" + props.epId);
            console.log("this is data", data);
            if (!data[0]) {
                setButton("Add this episode to your favorites!");
            } else {
                setButton("Remove this episode from your favorites");
            }
        })();
    }, []);
    function submit() {
        if (button == "Add this episode to your favorites!") {
            (async () => {
                const { data } = await axios.post(
                    "/getbutton/add/" + props.epId
                );
                console.log("add favorite worked", data[0]);
                setButton("Remove this episode from your favorites");
            })();
        } else if (button == "Remove this episode from your favorites") {
            (async () => {
                const deleted = await axios.post(
                    "/getbutton/delete/" + props.epId
                );
                console.log("remove favorite worked", deleted);
                setButton("Add this episode to your favorites!");
            })();
        }
    }
    return (
        <button onClick={submit} className="button">
            {button}
        </button>
    );
}
