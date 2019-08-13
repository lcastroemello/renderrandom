import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Episode(props) {
    const [episodeData, setEpisodeData] = useState();

    useEffect(() => {
        const { id } = props.match.params;
        (async () => {
            const { data } = await axios.get("/episode/" + id + ".json");
            setEpisodeData(data);
        })();
    }, []);

    return (
        <div>
            {episodeData && (
                <div>
                    <h1> Welcome to episode {episodeData.title} </h1>
                    <img src={episodeData.picture} />
                    <p>Duration: {episodeData.duration}</p>
                    <h2>What to expect from this episode?</h2>
                    <p>{episodeData.description}</p>
                    <audio controls src={episodeData.audio} />
                </div>
            )}
        </div>
    );
}
