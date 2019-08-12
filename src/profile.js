import React from "react";

import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import ProfileEditor from "./profileeditor";

export default function Profile(props) {
    return (
        <div className="myprofile">
            <div className="profilepicinmyprofile">{props.profilePic}</div>
            <div className="textinmyprofile">
                <h1>
                    {props.first} {props.last}
                </h1>
                {props.bioEditor}
                {props.profileEditor}
            </div>
        </div>
    );
}
