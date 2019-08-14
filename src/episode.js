import React, { useState, useEffect } from "react";
import axios from "./axios";
import Comments from "./comments";

export default function Episode(props) {
    const [episodeData, setEpisodeData] = useState();
    const { id } = props.match.params;
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/episode/" + id + ".json");
            setEpisodeData(data);
        })();
        props.mounts();
    }, []);

    return (
        <div>
            {episodeData && (
                <div className="eachepisodepage">
                    <h1 className="eachepisodetitle">
                        Welcome to episode {episodeData.title}
                    </h1>
                    <img className="episodepic" src={episodeData.picture} />

                    <div className="description">
                        <h3>What to expect from this episode?</h3>
                        <br />
                        <p className="duration">
                            Duration: {episodeData.duration}
                        </p>
                        <br />
                        <p>{episodeData.description}</p>
                    </div>
                    <div className="playerwrapper">
                        <audio
                            className="player"
                            controls
                            src={episodeData.audio}
                        />
                    </div>
                    <div className="commentsection">
                        <Comments episodeId={id} />
                    </div>
                </div>
            )}
        </div>
    );
}
