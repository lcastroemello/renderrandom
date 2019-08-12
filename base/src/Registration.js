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
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass,
                confpass: this.state.confpass,
                group_classes: this.state.group_classes
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("./app");
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
            <div
                style={{
                    display: "grid",
                    justifyItems: "center"
                }}
            >
                {this.state.error && (
                    <div
                        style={{
                            color: "red",
                            fontSize: 1 + "rem",
                            background: "#334431"
                        }}
                        className="error"
                    >
                        Ooops! Something went wrong. Try again 🥀
                    </div>
                )}
                {this.state.passerror && (
                    <div
                        style={{
                            color: "red",
                            fontSize: 1 + "rem",
                            background: "#334431"
                        }}
                        className="error"
                    >
                        Your passwords do not match. We know, it is hard with
                        the ***. Try again 🥀
                    </div>
                )}
                <h1
                    style={{
                        color: "#5C3C02",
                        fontFamily: "sans-serif",
                        textAlign: "center",
                        fontSize: "1.5rem"
                    }}
                >
                    Plant your profile! <br /> Register:
                </h1>
                <br />
                <input
                    name="first"
                    placeholder="first name"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                />
                <br />
                <input
                    name="last"
                    placeholder="last name"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                />
                <br />
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                />
                <br />
                <input
                    name="pass"
                    type="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                />
                <br />
                <input
                    name="confpass"
                    type="password"
                    placeholder="confirm password"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                />
                <br />
                <label style={{ color: "#f5fcef" }}> I am a/an: </label>
                <select
                    id="group_classes"
                    name="group_classes"
                    onChange={e => this.handleChange(e)}
                    style={{
                        border: "none"
                    }}
                >
                    <option value="null" />
                    <option value="amateur">Amateur gardner</option>
                    <option value="pro">
                        Professional (gardner/farmer/agronomist)
                    </option>
                    <option value="curious">Curious</option>
                </select>
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
                    Register
                </button>
                <p style={{ color: "#f5fcef" }}>
                    Already a branch? <Link to="/Login"> Log in! </Link>
                </p>
            </div>
        );
    }
}
