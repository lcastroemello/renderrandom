import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";

import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import Search from "./search";
import Favorites from "./favorites";
import Chat from "./chat";
import ProfileEditor from "./profileeditor";
import Admin from "./admin";
import Episode from "./episode";
import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            playerIsVisible: false,
            bio: "",
            adminMode: false
        };
        this.editprofile = this.editprofile.bind(this);
    } //end of constructor
    async componentDidMount() {
        const { data } = await axios.get("/user");
        this.setState(data);
        if (this.state.id === 1) {
            this.setState({ adminMode: true });
        }
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
                <React.Fragment>
                    <div className="circlecontainer">
                        <div className="maincircle">
                            <h1 id="render">
                                <span className="char1">R</span>
                                <span className="char2">E</span>
                                <span className="char3">N</span>
                                <span className="char4">D</span>
                                <span className="char5">E</span>
                                <span className="char6">R</span>
                            </h1>
                            <img className="char8" src="music-player.png" />
                            <h1 id="random">
                                <span className="char10">R</span>
                                <span className="char11">A</span>
                                <span className="char12">N</span>
                                <span className="char13">D</span>
                                <span className="char14">O</span>
                                <span className="char15">M</span>
                            </h1>
                        </div>
                    </div>
                    <div className="podcastwrapper">
                        {this.state.uploaderIsVisible && (
                            <div className="uploader">
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
                                        this.setState({
                                            uploaderIsVisible: false
                                        })
                                    }
                                />
                            </div>
                        )}

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div className="firstquadrant">
                                    <Profile
                                        picture={this.state.picture}
                                        first={this.state.first}
                                        last={this.state.last}
                                        displayname={this.state.displayname}
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
                                                displayname={
                                                    this.state.displayname
                                                }
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
                                                displayname={
                                                    this.state.displayname
                                                }
                                                picture={this.state.picture}
                                                size={"jumbo"}
                                                onClick={() => {
                                                    console.log(
                                                        "testing pic click"
                                                    );
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

                        <div className="secondquadrant">
                            <Route
                                path="/search"
                                render={props => (
                                    <div>
                                        <Search />
                                    </div>
                                )}
                            />
                        </div>

                        <div className="thirdquadrant">
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <div>
                                        {this.state.adminMode && (
                                            <div>
                                                <Admin />
                                            </div>
                                        )}
                                        {!this.state.adminMode && (
                                            <div>
                                                <Favorites />
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="fourthquadrant">
                            <Route
                                path="/chat"
                                render={props => (
                                    <div>
                                        <Chat />
                                    </div>
                                )}
                            />

                            <Route
                                path="/episode/:id"
                                render={props => (
                                    <div>
                                        <Episode
                                            key={props.match.url}
                                            match={props.match}
                                            history={props.history}
                                            userId={this.state.id}
                                        />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    } //end of render
} //end of class
