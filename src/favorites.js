import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptRequest, endFriendship } from "./actions";

export default function Favorites() {
    const dispatch = useDispatch();
    const friends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );
    const wannabes = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    return (
        <div className="favorites">
            <h1>My favorite episodes</h1>
            {friends &&
                friends.map(friends => {
                    return (
                        <div key={friends.id}>
                            <img
                                style={{
                                    objectFit: "cover",
                                    height: "8rem",
                                    width: "8rem"
                                }}
                                src={friends.picture}
                            />
                            <h2>
                                {friends.first} {friends.last}
                            </h2>
                            <p
                                className="fakebutton"
                                onClick={e =>
                                    dispatch(endFriendship(friends.id))
                                }
                            >
                                Remove this episode from your favorites
                            </p>
                        </div>
                    );
                })}
        </div>
    );
}
