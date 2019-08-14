import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
    return (
        <HashRouter>
            <div id="vinyl" animation={"spin 1s linear infinite"} />
            <div className="welcomePage">
                <div className="circlecontainer">
                    <div className="maincircle">
                        <h1 id="render">
                            <span className="char1">R</span>
                            <span className="char2">E</span>
                            <span className="char3">N</span>
                            <span className="char4">D</span>
                            <span className="char5">E</span>
                            <span className="char6">R</span>
                            <span className="char7" />
                        </h1>
                        <img className="char8" src="music-player.png" />
                        <h1 id="random">
                            <span className="char9" />
                            <span className="char10">R</span>
                            <span className="char11">A</span>
                            <span className="char12">N</span>
                            <span className="char13">D</span>
                            <span className="char14">O</span>
                            <span className="char15">M</span>
                        </h1>

                        <div className="reglogin">
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </div>
                    </div>
                </div>
            </div>
        </HashRouter>
    );
}
