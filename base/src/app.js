import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";

import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import Brofile from "./brofile";
import FindBros from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";
import GroupChat from "./groupChat";
import ProfileEditor from "./profileeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            bio: ""
        };
        this.editprofile = this.editprofile.bind(this);
    } //end of constructor
    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
    }

    editprofile(newprofiledetails) {
        console.log("testing state in app", this.state);
        this.setState(newprofiledetails);
    }

    render() {
        if (!this.state.id) {
            return <img src="growing.gif" />;
        }
        return (
            <BrowserRouter>
                <div
                    style={{
                        background: "#f5fcef",
                        bottom: 0,
                        display: "grid",
                        gridTemplateRows: "8rem 1fr",
                        gridTemplateColumns: "1fr",
                        height: "100vh",
                        width: "100vw"
                    }}
                >
                    <div
                        className="header"
                        style={{
                            gridRow: "1/2",
                            gridColumn: "1/2",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 7rem",
                            borderBottom: "solid #67912D 2px",
                            padding: "2rem",
                            zIndex: 1
                        }}
                    >
                        <img
                            className="images"
                            style={{
                                placeSelf: "center / start",
                                gridColumn: 1 / 2,
                                height: "4rem",
                                width: "4rem"
                            }}
                            src="/rootsLogo.png"
                            alt="roots logo"
                        />

                        <div
                            className="links"
                            style={{
                                gridColumn: "2 / 3",
                                display: "flex",
                                justifyContent: "space-around",
                                alignSelf: "center",
                                fontFamily: "Lacquer, sans-serif",
                                fontSize: "1.3rem"
                            }}
                        >
                            <style type="text/css">
                                .link{`{color:#67912d; textDecoration:none;}`}
                                .link:hover {`{color:#334431;}`}
                            </style>
                            <Link
                                className="link"
                                style={{
                                    textDecoration: "none"
                                }}
                                to="/users"
                            >
                                Find buddy branches!
                            </Link>
                            <Link
                                className="link"
                                style={{
                                    textDecoration: "none"
                                }}
                                to="/friends"
                            >
                                My buddy branches
                            </Link>
                            <Link
                                className="link"
                                style={{
                                    textDecoration: "none"
                                }}
                                to="/chat"
                            >
                                Chat
                            </Link>
                            <Link
                                className="link"
                                style={{
                                    textDecoration: "none"
                                }}
                                to="/"
                            >
                                My profile
                            </Link>
                        </div>
                        <ProfilePic
                            id="images"
                            picture={this.state.picture}
                            first={this.state.first}
                            last={this.state.last}
                            size={"normal"}
                            onClick={() =>
                                this.setState({ uploaderIsVisible: true })
                            }
                        />
                    </div>
                    {this.state.uploaderIsVisible && (
                        <div
                            style={{
                                gridRow: "1/3",
                                gridColumn: "1/2",
                                zIndex: 3
                            }}
                        >
                            <Uploader
                                profilePic={
                                    <ProfilePic
                                        first={this.state.first}
                                        last={this.state.last}
                                        picture={this.state.picture}
                                        size={"jumbo"}
                                    />
                                }
                                done={picture =>
                                    this.setState({
                                        picture,
                                        uploaderIsVisible: false
                                    })
                                }
                                close={() =>
                                    this.setState({ uploaderIsVisible: false })
                                }
                            />
                        </div>
                    )}

                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%",
                                        paddingLeft: "2rem",
                                        paddingTop: "2rem"
                                    }}
                                >
                                    <Profile
                                        picture={this.state.picture}
                                        first={this.state.first}
                                        last={this.state.last}
                                        bioEditor={
                                            <BioEditor
                                                bio={this.state.bio}
                                                done={bio =>
                                                    this.setState({ bio })
                                                }
                                                close={() =>
                                                    this.setState({
                                                        editing: false
                                                    })
                                                }
                                            />
                                        }
                                        profileEditor={
                                            <ProfileEditor
                                                first={this.state.first}
                                                last={this.state.last}
                                                group_tag={this.state.group_tag}
                                                done={this.editprofile}
                                                close={() =>
                                                    this.setState({
                                                        editing: false
                                                    })
                                                }
                                            />
                                        }
                                        profilePic={
                                            <ProfilePic
                                                first={this.state.first}
                                                last={this.state.last}
                                                picture={this.state.picture}
                                                size={"jumbo"}
                                                onClick={() => {
                                                    this.setState({
                                                        uploaderIsVisible: true
                                                    });
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            )}
                        />

                        <Route
                            path="/user/:id"
                            render={props => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Brofile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        userId={this.state.id}
                                    />
                                </div>
                            )}
                        />

                        <Route
                            path="/users"
                            render={props => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    <FindBros />
                                </div>
                            )}
                        />

                        <Route
                            path="/friends"
                            render={props => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Friends />
                                </div>
                            )}
                        />

                        <Route
                            path="/chat"
                            render={props => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    <Chat />
                                </div>
                            )}
                        />

                        <Route
                            path="/groupchat"
                            render={props => (
                                <div
                                    style={{
                                        background: "#d8f2c1",
                                        height: "100%",
                                        width: "100%"
                                    }}
                                >
                                    <GroupChat />
                                </div>
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    } //end of render
} //end of class
