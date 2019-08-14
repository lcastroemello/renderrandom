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
            <div className="searchbar">
                <div>
                    {searchName && (
                        <div>
                            <h1>Find episode by name</h1>
                            <br />
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
                            <h1> Find episode by tag: </h1>
                            <br />
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
                            <br />
                            <br />
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
                </div>
            </div>
            <div className="episoderesults">
                {firstRender && <h1>Checkout our latest episodes!</h1>}
                <br />
                <div>
                    {episodes &&
                        episodes.map(episodes => {
                            return (
                                <div key={episodes.id}>
                                    <div className="eachsearchresult">
                                        <Link
                                            className="resultspic"
                                            to={`/episode/${episodes.id}`}
                                        >
                                            <img
                                                src={episodes.picture}
                                                alt={episodes.summary}
                                                className="resultspic"
                                            />
                                        </Link>
                                        <h2 className="resultstitle">
                                            {episodes.title}
                                        </h2>
                                        <h2 className="resultssummary">
                                            {episodes.summary}
                                        </h2>
                                        <h4 className="resultspecs">
                                            Duration: {episodes.duration} 🎤
                                            {episodes.created_at}
                                        </h4>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
