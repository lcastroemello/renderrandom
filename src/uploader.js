import React from "react";
import axios from "./axios";

import ProfilePic from "./profilepic";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    upload(a) {
        console.log("upload runs", a.target.files[0]);
        var formData = new FormData();
        formData.append("file", a.target.files[0]);
        let self = this;
        axios
            .post("/upload", formData)
            .then(function(resp) {
                self.props.done(resp.data.url);
            })
            .catch(function(err) {
                console.log("error in post/upload: ", err);
            });
    }
    render() {
        return (
            <div className="outer">
                <div className="inner">
                    <p onClick={() => this.props.close()} className="closetag">
                        X
                    </p>
                    <div size="jumbo">{this.props.profilePic}</div>
                    <h1 className="textuploader">
                        Want to change your profile picture?
                    </h1>
                    <input
                        className="picUpload"
                        type="file"
                        accept="image/*"
                        onChange={a => this.upload(a)}
                    />
                </div>
            </div>
        );
    }
}
