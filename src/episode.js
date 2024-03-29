import React, { useState, useEffect } from "react";
import axios from "./axios";
import Comments from "./comments";
import FriendButton from "./friendbutton";

export default function Episode(props) {
    const [episodeData, setEpisodeData] = useState();
    const { id } = props.match.params;
    useEffect(() => {
        props.mounts();
        console.log("episode is mounting");
        (async () => {
            const { data } = await axios.get("/episode/" + id + ".json");
            setEpisodeData(data);
        })();
    }, []);

    const makespin = () => {
        console.log("makespin runs");
        props.spinning();
    };

    return (
        <div>
            {episodeData && (
                <div className="eachepisodepage">
                    <h1 className="eachepisodetitle">
                        Welcome to episode {episodeData.title}
                    </h1>
                    <img className="episodepic" src={episodeData.picture} />

                    <div className="episodeinfo">
                        <h3 className="infotitle">
                            What to expect from this episode?
                        </h3>
                        <br />
                        <p className="duration">
                            Duration: {episodeData.duration}
                        </p>
                        <br />
                        <p className="description">{episodeData.description}</p>
                        <FriendButton
                            epId={props.match.params.id}
                            userId={props.userId}
                        />
                    </div>
                    <div className="playerwrapper">
                        <audio
                            controls
                            src={episodeData.audio}
                            onPlay={makespin}
                            onPause={makespin}
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
