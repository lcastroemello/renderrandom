import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Episode(props) {
    useEffect(() => {
        const { id } = props.match.params;
        (async () => {
            const episodeInfo = await axios.get("/episode/" + id + ".json");
            console.log("testing episodeInfo", episodeInfo);
        })();
    });

    return (
        <div className="episodeInfo">
            <h1> Welcome to episode </h1>
        </div>
    );
}
