import React from "react";
import axios from "./axios";

import FriendButton from "./friendbutton";

export default class Brofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const { data } = await axios.get("/user/" + id + ".json");
        if (data != "same user" || "user does not exist") {
            this.setState({
                first: data.first,
                last: data.last,
                bio: data.bio,
                picture: data.picture
            });
        } else {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "0.3fr 1fr",
                    background: "#d8f2c1"
                }}
            >
                <div style={{ gridColumn: 1 / 2 }}>
                    <img
                        style={{ height: 20 + "rem", width: 16 + "rem" }}
                        src={this.state.picture}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                    <FriendButton
                        broId={this.props.match.params.id}
                        userId={this.props.userId}
                    />
                </div>
                <div
                    style={{
                        placeSelf: "center / start",
                        gridColumn: 2 / 3
                    }}
                >
                    <h2 style={{ padding: 0 }}>
                        {this.state.first} {this.state.last}
                    </h2>
                    <div>{this.state.bio}</div>
                </div>
            </div>
        );
    }
}
