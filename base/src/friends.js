import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptRequest, endFriendship } from "./actions";

export default function Friends() {
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
        <div style={{ padding: "1rem 2rem 2rem 2rem" }}>
            <div
                className="wannabes"
                style={{
                    borderBottom: "solid 2px black",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    gridTemplateRows: "5rem 1fr",
                    justifyItems: "center"
                }}
            >
                <h1 style={{ gridRow: "1/2", gridColumn: "1/6" }}>
                    Check who wants to be a branch in your tree!
                </h1>
                {wannabes &&
                    wannabes.map(wannabes => {
                        return (
                            <div
                                key={wannabes.id}
                                style={{
                                    display: "flex",
                                    gridRow: "2/3",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Link to={`/user/${wannabes.id}`}>
                                    <img
                                        style={{
                                            objectFit: "cover",
                                            height: "8rem",
                                            width: "8rem"
                                        }}
                                        src={wannabes.picture}
                                    />
                                </Link>
                                <h2>
                                    {wannabes.first} {wannabes.last}
                                </h2>

                                <p
                                    style={{
                                        border: "black 1px dotted",
                                        padding: "0.2rem",
                                        margin: 0
                                    }}
                                    onClick={e =>
                                        dispatch(acceptRequest(wannabes.id))
                                    }
                                >
                                    Add this branch to your tree!
                                </p>
                                <p
                                    style={{
                                        border: "black 1px dotted",
                                        padding: "0.2rem"
                                    }}
                                    onClick={e =>
                                        dispatch(endFriendship(wannabes.id))
                                    }
                                >
                                    Reject this request
                                </p>
                            </div>
                        );
                    })}
            </div>

            <div
                className="friends"
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    gridTemplateRows: "5rem 1fr",
                    justifyItems: "center"
                }}
            >
                <h1 style={{ gridRow: "1/2", gridColumn: "1/6" }}>
                    Branches in your friend tree!
                </h1>
                {friends &&
                    friends.map(friends => {
                        return (
                            <div
                                key={friends.id}
                                style={{
                                    display: "flex",
                                    gridRow: "2/3",
                                    flexDirection: "column",
                                    justifyItems: "center",
                                    alignItems: "center"
                                }}
                            >
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
                                    style={{
                                        border: "black 1px dotted",
                                        padding: "0.2rem"
                                    }}
                                    onClick={e =>
                                        dispatch(endFriendship(friends.id))
                                    }
                                >
                                    Prune this branch from your tree
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
