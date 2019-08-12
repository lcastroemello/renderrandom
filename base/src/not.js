import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, makeHot, makeNot } from "./actions";

export default function Not() {
    const dispatch = useDispatch();
    const users = useSelector(
        state => state.users && state.users.filter(user => !user.hot)
    );

    if (!users) {
        return null;
    }
    const notUsers = (
        <div className="users">
            {users.map(user => (
                <div className="user" key={user.id}>
                    <img src={user.image} />
                    <div className="buttons">
                        <button onClick={e => dispatch(makeHot(user.id))}>
                            Hot
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="not">
            {!users.length && <div>Nobody is not hot!</div>}
            {!!users.length && notUsers}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/hot">See who&apos;s hot</Link>
            </nav>
        </div>
    );
}
