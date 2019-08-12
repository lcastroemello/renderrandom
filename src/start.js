import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { init } from "./socket";
import { init as initgroup } from "./groupsocket";

import Welcome from "./Welcome";
import App from "./app";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/welcome") {
    //they are logged out
    elem = <Welcome />;
} else {
    //they are logged in
    init(store);
    initgroup(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
