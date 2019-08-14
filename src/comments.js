import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Comments(props) {
    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("enter was pressed", e.target.value);
            socket.emit("newComment", (e.target.value, props.episodeId));
            e.target.value = "";
        }
    };

    const elemRef = useRef();
    useEffect(
        () => {
            socket.emit("getComments", props.episodeId);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        },
        [comments]
    );
    const comments = useSelector(state => state && state.comments);
    console.log("testing comments", comments);

    return (
        <div className="commentdiv">
            <h1 className="commenttitle">
                What did you think about this episode? What do you want to see
                on the next episodes? <br />
            </h1>

            <div ref={elemRef}>
                {comments &&
                    comments.map(comments => {
                        return (
                            <div className="commentarea" key={comments.id}>
                                <div className="eachcomment">
                                    <img
                                        className="commenterpic"
                                        src={comments.picture}
                                    />
                                    <p className="commentername">
                                        {comments.first}
                                        {comments.last}
                                    </p>
                                    <p className="commenttext">
                                        {comments.comment}
                                    </p>
                                    <p className="commenttime">
                                        {comments.created_at} 🎤{" "}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                <br />
                <br />
            </div>

            <textarea
                className="writeacomment"
                onKeyDown={keyCheck}
                placeholder="Add here your comment and press ENTER to send (remember that only logged users can comment on episodes)"
            />
        </div>
    );
}
