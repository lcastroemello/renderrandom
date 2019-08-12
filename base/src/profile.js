import React from "react";

import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import ProfileEditor from "./profileeditor";

export default function Profile(props) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "0.3fr 1fr",
                background: "#d8f2c1"
            }}
        >
            <div style={{ gridColumn: 1 / 2, justifySelf: "center" }}>
                {props.profilePic}
            </div>
            <div
                style={{
                    placeSelf: "center / start",
                    gridColumn: 2 / 3
                }}
            >
                <h1
                    style={{
                        padding: 0,
                        color: "#67912d",
                        fontFamily: "Lacquer, sans-serif"
                    }}
                >
                    {props.first} {props.last}
                </h1>
                {props.bioEditor}
                {props.profileEditor}
            </div>
        </div>
    );
}
