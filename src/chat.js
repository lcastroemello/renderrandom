import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("testing chatmessages", chatMessages);
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("enter was pressed", e.target.value);
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

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
            <h1>🌱 Talk with all the branches in our tree! 🌱</h1>
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
                {chatMessages &&
                    chatMessages.map(chatMessages => {
                        return (
                            <div
                                key={chatMessages.id}
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
                                    src={chatMessages.picture}
                                />
                                <p
                                    style={{
                                        gridRow: "1/2",
                                        gridColumn: "2/3",
                                        fontWeight: "900",
                                        fontSize: "1.1rem"
                                    }}
                                >
                                    {chatMessages.first} {chatMessages.last}
                                </p>
                                <p
                                    style={{
                                        gridRow: "2/2",
                                        gridColumn: "2/3",
                                        fontSize: "1rem"
                                    }}
                                >
                                    {chatMessages.message}
                                </p>

                                {chatMessages.group_tag == "amateur" && (
                                    <p
                                        style={{
                                            gridRow: "3/4",
                                            gridColumn: "2/3",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        Amateur gardner 🌱
                                        {chatMessages.created_at}
                                    </p>
                                )}

                                {chatMessages.group_tag == "pro" && (
                                    <p
                                        style={{
                                            gridRow: "3/4",
                                            gridColumn: "2/3",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        Professional (gardner/farmer/agronomist)
                                        🌱{chatMessages.created_at}
                                    </p>
                                )}

                                {chatMessages.group_tag == "curious" && (
                                    <p
                                        style={{
                                            gridRow: "3/4",
                                            gridColumn: "2/3",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        Curious 🌱{chatMessages.created_at}
                                    </p>
                                )}
                                {!chatMessages.group_tag && (
                                    <p
                                        style={{
                                            gridRow: "3/4",
                                            gridColumn: "2/3",
                                            fontSize: "0.8rem"
                                        }}
                                    >
                                        {chatMessages.created_at} 🌱
                                    </p>
                                )}
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
                to="/groupchat"
            >
                Feel like talking with your peers? <br /> Try our group chats
                and talk only with people sharing your group (amateur gardner,
                professional or curious)!
            </Link>
        </div>
    );
}
