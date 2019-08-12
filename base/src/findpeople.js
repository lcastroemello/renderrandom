import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindBros() {
    const [users, setUsers] = useState();
    const [firstRender, setFirstRender] = useState(true);
    const [val, setVal] = useState();
    useEffect(
        () => {
            if (!val) {
                (async () => {
                    const userList = await axios.get("/users.json");
                    setUsers(userList.data);
                    setFirstRender(true);
                })();
            } else {
                (async () => {
                    const searchUser = await axios.get(
                        "/users/2/" + val + ".json"
                    );
                    setUsers(searchUser.data);
                    setFirstRender(false);
                })();
            }
        },
        [val]
    );
    // let userpic;
    // if (users.picture) {
    //     userpic = users.picture;
    // } else {
    //     userpic = "./static/default.png";
    // }
    return (
        <div
            style={{
                display: "grid",
                justifyItems: "center",
                alignItems: "center"
            }}
        >
            <h1>FIND BUDDY BRANCHES</h1>
            {firstRender && <h2>Are you looking for someone in particular?</h2>}
            <div>
                <div
                    style={{
                        paddingBottom: 2 + "rem",
                        display: "grid",
                        justifyItems: "center"
                    }}
                >
                    <input onChange={e => setVal(e.target.value)} />
                </div>
                <div>
                    {firstRender && <h2>Checkout our new sprouts!</h2>}
                    <div>
                        {users &&
                            users.map(users => {
                                return (
                                    <div
                                        key={users.id}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "5rem 1fr",
                                            justifyItems: "center"
                                        }}
                                    >
                                        <Link to={`/user/${users.id}`}>
                                            <img
                                                style={{
                                                    gridColumn: 1 / 2,
                                                    height: 5 + "rem",
                                                    width: 5 + "rem",
                                                    objectFit: "cover"
                                                }}
                                                src={users.picture}
                                                alt={`${users.first} ${
                                                    users.last
                                                }`}
                                            />
                                        </Link>
                                        <h3
                                            style={{
                                                gridColumn: 2 / 3
                                            }}
                                        >
                                            {users.first} {users.last}
                                        </h3>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
