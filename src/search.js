import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function Search() {
    const [episodes, setEpisodes] = useState();
    const [firstRender, setFirstRender] = useState(true);
    const [searchName, setSearchName] = useState(true);
    const [searchTag, setSearchTag] = useState(false);
    const [val, setVal] = useState();
    useEffect(
        () => {
            if (!val) {
                (async () => {
                    const episodeList = await axios.get("/episodes.json");
                    setEpisodes(episodeList.data);
                    setFirstRender(true);
                })();
            } else {
                if (searchName) {
                    (async () => {
                        const searchEpisode = await axios.get(
                            "/episodes/2/" + val + ".json"
                        );
                        setEpisodes(searchEpisode.data);
                        setFirstRender(false);
                    })();
                } else if (searchTag) {
                    (async () => {
                        const searchEpisodeTag = await axios.get(
                            "/episodes/3/" + val + ".json"
                        );
                        setEpisodes(searchEpisodeTag.data);
                        setFirstRender(false);
                    })();
                }
            }
        },
        [val]
    );

    return (
        <div className="search">
            <h1>FIND EPISODES</h1>
            {firstRender && <h2>Are you looking for episode in particular?</h2>}
            <div>
                {searchName && (
                    <div>
                        <h1>Find episode by name</h1>
                        <div className="searchinput">
                            <input onChange={e => setVal(e.target.value)} />
                        </div>
                        <p
                            className="fakebutton"
                            onClick={e => {
                                setSearchName(false);
                                setSearchTag(true);
                            }}
                        >
                            Search by tag instead
                        </p>
                    </div>
                )}

                {searchTag && (
                    <div>
                        <label> Find episode by tag: </label>
                        <select
                            id="tag"
                            name="tag"
                            onChange={e => setVal(e.target.value)}
                            style={{
                                border: "none"
                            }}
                        >
                            <option value="null" />
                            <option value="Art and culture">
                                Art and Culture
                            </option>
                            <option value="Food">Food</option>
                            <option value="Nature and environment">
                                Nature and Environment
                            </option>
                            <option value="Politics and history">
                                Politics and History
                            </option>
                            <option value="Society">Society</option>
                        </select>
                        <p
                            className="fakebutton"
                            onClick={e => {
                                setSearchName(true);
                                setSearchTag(false);
                            }}
                        >
                            Search by name instead
                        </p>
                    </div>
                )}

                <div>
                    {firstRender && <h2>Checkout our latest episodes!</h2>}
                    <div>
                        {episodes &&
                            episodes.map(episodes => {
                                return (
                                    <div
                                        key={episodes.id}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "5rem 1fr",
                                            justifyItems: "center"
                                        }}
                                    >
                                        <Link to={`/episodes/${episodes.id}`}>
                                            <img
                                                style={{
                                                    gridColumn: 1 / 2,
                                                    height: 5 + "rem",
                                                    width: 5 + "rem",
                                                    objectFit: "cover"
                                                }}
                                                src={episodes.picture}
                                                alt={episodes.summary}
                                            />
                                        </Link>
                                        <h2
                                            style={{
                                                gridColumn: 2 / 3
                                            }}
                                        >
                                            {episodes.title}
                                        </h2>
                                        <h2>{episodes.summary}</h2>
                                        <h4>Duration: {episodes.duration}</h4>
                                        <h4>{episodes.created_at}</h4>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
