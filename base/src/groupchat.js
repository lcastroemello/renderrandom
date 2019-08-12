import React, { useEffect, useRef } from "react";
import { socket } from "./groupsocket";
import { useSelector } from "react-redux";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default function GroupChat() {
    //getting the initial messages
    const groupMessages = useSelector(state => state && state.groupMessages);
    console.log("testing groupmessages", groupMessages);

    //sending messages
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("this is socket", socket);
            socket.emit("newGroupMessage", e.target.value);
            e.target.value = "";
        }
    };

    let usergroup;
    try {
        if (groupMessages && Array.isArray(groupMessages)) {
            usergroup = groupMessages[0].sender_group;
        } else if (groupMessages) {
            usergroup = groupMessages;
        }
    } catch (err) {
        console.log(err);
    }

    //defining the group title
    let group;
    if (usergroup == "amateur") {
        group = "You just joined the chat for amateur gardners";
    } else if (usergroup == "pro") {
        console.log("groupmessages", groupMessages);
        group =
            "You just joined the chat for professionals (gardners, farmers, agronomists)";
    } else if (usergroup == "curious") {
        group = "You just joined the chat for curious gardners";

        console.log("joined the curious gardners");
    } else if (!usergroup) {
        group = "";
        console.log("something is wrong");
    }

    //Making our chat always start on the end of the scrow (newer messages)
    const elemRef = useRef();
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    return (
        <div
            style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center",
                padding: "2rem"
            }}
        >
            <h1
                style={{
                    display: "grid",
                    textAlign: "center",
                    alignItems: "center"
                }}
            >
                🌱 Talk with leaves in your own branch! 🌱 <br /> {group}
            </h1>
            <div
                className="chat-container"
                ref={elemRef}
                style={{
                    background: "#f5fcef",
                    overflowY: "scroll",
                    width: "30rem",
                    height: "30rem",
                    padding: "1rem"
                }}
            >
                {groupMessages &&
                    Array.isArray(groupMessages) &&
                    groupMessages.map(groupMessages => {
                        return (
                            <div
                                key={groupMessages.id}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "5rem 1fr",
                                    gridTemplateRows: "0.2fr 1fr 0.1fr",
                                    borderBottom: "solid black 0.5px"
                                }}
                            >
                                <img
                                    style={{
                                        height: "4rem",
                                        width: "4rem",
                                        gridRow: "1/4",
                                        gridColumn: "1/2",
                                        alignSelf: "center",
                                        objectFit: "cover"
                                    }}
                                    src={groupMessages.picture}
                                />
                                <p
                                    style={{
                                        gridRow: "1/2",
                                        gridColumn: "2/3",
                                        fontWeight: "900",
                                        fontSize: "1.1rem"
                                    }}
                                >
                                    {groupMessages.first} {groupMessages.last}
                                </p>
                                <p
                                    style={{
                                        gridRow: "2/2",
                                        gridColumn: "2/3",
                                        fontSize: "1rem"
                                    }}
                                >
                                    {groupMessages.message}
                                </p>
                                <p
                                    style={{
                                        gridRow: "3/4",
                                        gridColumn: "2/3",
                                        fontSize: "0.8rem"
                                    }}
                                >
                                    {groupMessages.created_at}
                                </p>
                            </div>
                        );
                    })}
            </div>
            <br />
            <br />
            <textarea
                style={{
                    width: "30rem",
                    height: "5rem",
                    background: "#d8f2c1",
                    padding: "2rem"
                }}
                onKeyDown={keyCheck}
                placeholder="Add your message here and press ENTER to send"
            />
            <br />
            <style type="text/css">
                .link{`{color:#67912d;}`}
                .link:hover {`{color:#334431;}`}
            </style>
            <Link
                className="link"
                style={{
                    textDecoration: "none",
                    fontFamily: "Lacquer, sans-serif",
                    fontSize: "1rem",
                    border: "dotted 1px #334431",
                    width: "10rem",
                    padding: "0.5rem"
                }}
                to="/chat"
            >
                Tired of talking with your peers? <br /> Go back to the general
                chat!
            </Link>
        </div>
    );
}
