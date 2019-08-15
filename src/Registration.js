import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        console.log("testing state", this.state);
        axios
            .post("/Register", {
                username: this.state.username,
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass,
                confpass: this.state.confpass
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("./");
                } else if (!data.passconf) {
                    this.setState({
                        passerror: true
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="wrapper">
                {this.state.error && (
                    <div className="error">
                        Ooops! Something went wrong. Try again 🥀
                    </div>
                )}
                {this.state.passerror && (
                    <div className="error">
                        Your passwords do not match. We know, it is hard. Try
                        again 🥀
                    </div>
                )}

                <input
                    name="username"
                    type="username"
                    placeholder="username"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />

                <input
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />
                <input
                    name="last"
                    placeholder="last name"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />

                <input
                    name="confpass"
                    type="password"
                    placeholder="confirm password"
                    onChange={e => this.handleChange(e)}
                    className="inputfield"
                />

                <button className="button" onClick={e => this.submit(e)}>
                    Register
                </button>
                <br />
                <p className="linkother">
                    Already registered?{" "}
                    <Link className="button" to="/Login">
                        Log in!{" "}
                    </Link>
                </p>
            </div>
        );
    }
}
