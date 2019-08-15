import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends React.Component {
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
        axios
            .post("/login", {
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("./");
                } else if (data.usernoexist) {
                    this.setState({
                        noemail: true
                    });
                } else if (data.passfalse) {
                    this.setState({
                        wrongpass: true,
                        noemail: false
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
                        Ooops! Something went wrong. Are you sure you are
                        already registered? Try again 🥀
                    </div>
                )}
                {this.state.noemail && (
                    <div className="error">
                        Are you sure you are already registered? Did you type
                        your password right? Check your email and password and
                        try again 🥀
                    </div>
                )}
                {this.state.wrongpass && (
                    <div className="error">
                        Are you sure you are already registered? Did you type
                        your password right? Check your email and password and
                        try again 🥀
                    </div>
                )}

                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="inputfield"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="pass"
                    type="password"
                    placeholder="password"
                    className="inputfield"
                    onChange={e => this.handleChange(e)}
                />
                <button className="button" onClick={e => this.submit(e)}>
                    Log in
                </button>
                <br />
                <p className="linkother">
                    Not yet a member?{" "}
                    <Link className="button" to="/">
                        {" "}
                        Register!{" "}
                    </Link>
                </p>
            </div>
        );
    }
}
