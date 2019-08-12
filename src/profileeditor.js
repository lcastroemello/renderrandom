import React from "react";
import axios from "./axios";

export default class ProfileEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.setState((state, props) => ({
            firstdraft: props.first,
            lastdraft: props.last,
            groupdraft: props.group_tag,
            passdraft: "",
            confpassdraft: "",
            displayname: props.displayname
        }));
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async submit(e) {
        console.log("testing state", this.state);
        e.preventDefault();
        try {
            await axios.post("/editprofile", {
                displayname: this.state.displaynamedraft,
                first: this.state.firstdraft,
                last: this.state.lastdraft,
                pass: this.state.passdraft,
                confpass: this.state.confpassdraft
            });
            this.props.done({
                displayname: this.state.displaynamedraft,
                first: this.state.firstdraft,
                last: this.state.lastdraft,
                pass: this.state.passdraft,
                confpass: this.state.confpassdraft
            });
            this.setState({
                editing: false
            });
        } catch (err) {
            console.log("err in post/profile edit", err);
        }
    }

    render() {
        return (
            <div>
                {this.state.editing && (
                    <div>
                        <p onClick={() => this.setState({ editing: false })}>
                            X
                        </p>
                        <h3 style={{ color: "#334431", width: "50rem" }}>
                            Edit your profile
                        </h3>
                        Username / Display Name
                        <input
                            name="displaynamedraft"
                            placeholder={this.props.displayname}
                            onChange={e => this.handleChange(e)}
                            style={{
                                border: "none"
                            }}
                        />
                        <br />
                        First Name{" "}
                        <input
                            name="firstdraft"
                            placeholder={this.props.first}
                            onChange={e => this.handleChange(e)}
                            style={{
                                border: "none"
                            }}
                        />
                        <br />
                        Last Name
                        <input
                            name="lastdraft"
                            placeholder={this.props.last}
                            onChange={e => this.handleChange(e)}
                            style={{
                                border: "none"
                            }}
                        />
                        <br />
                        Password{" "}
                        <input
                            name="pass"
                            type="password"
                            placeholder="new password"
                            onChange={e => this.handleChange(e)}
                            style={{
                                border: "none"
                            }}
                        />
                        <br />
                        Confirm Password{" "}
                        <input
                            name="confpass"
                            type="password"
                            placeholder="confirm new password"
                            onChange={e => this.handleChange(e)}
                            style={{
                                border: "none"
                            }}
                        />
                        <br />
                        <br />
                        <style type="text/css">
                            .button{`{background: #f5fcef;}`}
                            .button:hover {`{background: #67912d;}`}
                        </style>
                        <button
                            className="button"
                            style={{ border: "none" }}
                            onClick={e => this.submit(e)}
                        >
                            Submit changes
                        </button>
                    </div>
                )}
                {!this.state.editing && (
                    <div>
                        <div>
                            {this.props.bio && (
                                <p style={{ color: "#334431" }}>
                                    {this.props.bio}
                                </p>
                            )}
                            <style type="text/css">
                                .button{`{background: #f5fcef;}`}
                                .button:hover {`{background: #67912d;}`}
                            </style>
                            <button
                                className="button"
                                style={{ border: "none", color: "#334431" }}
                                onClick={() => this.setState({ editing: true })}
                            >
                                Edit your profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
