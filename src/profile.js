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
                    Hello {props.first} {props.last}! Good to have you back!
                </h1>
                <h2>
                    When you make comments, your name will appear as:
                    {props.displayname}
                </h2>
                <br />
                <div className="profilebuttons">
                    {props.bioEditor}
                    {props.profileEditor}
                </div>
            </div>
        </div>
    );
}
