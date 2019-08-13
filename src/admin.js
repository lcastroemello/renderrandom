import React, { useState } from "react";
import axios from "./axios";

export default function Admin() {
    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();
    const [audio, setAudio] = useState();
    const [picture, setPicture] = useState();
    const [tags, setTags] = useState([]);

    const addTags = e => {
        if (e.target.checked) {
            setTags([...tags, e.target.value]);
        } else if (!e.target.checked) {
            setTags(tags.filter(tag => e.target.value != tag));
        }
    };

    var formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("audio", audio);
    formData.append("picture", picture);
    formData.append("tags", tags);

    const add = e => {
        e.preventDefault();
        (async () => {
            let addepisode = await axios.post("/addEpisode.json", formData);
            console.log("testing add response", addepisode);
        })();
    };
    const edit = e => {
        e.preventDefault();
        (async () => {
            let addepisode = await axios.post("/editEpisode.json", formData);
            console.log("testing edit response", addepisode);
        })();
    };
    return (
        <div className="addepisode">
            <h1> Add a new episode</h1>
            <form>
                <input
                    name="title"
                    type="title"
                    placeholder="title"
                    className="inputfield"
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className="textareaadd"
                    placeholder="summary"
                    name="summary"
                    onChange={e => setSummary(e.target.value)}
                />
                <textarea
                    className="textareaadd"
                    placeholder="description"
                    name="description"
                    onChange={e => setDescription(e.target.value)}
                />
                <input
                    name="duration"
                    className="inputfield"
                    placeholder="duration XhXminXsec"
                    onChange={e => setDuration(e.target.value)}
                />
                Add an audio file:
                <input
                    className="audioUpload"
                    name="audiofile"
                    type="file"
                    onChange={e => setAudio(e.target.files[0])}
                />
                Add a picture:
                <input
                    className="picUpload"
                    type="file"
                    accept="image/*"
                    onChange={e => setPicture(e.target.files[0])}
                />
                <div className="tags">
                    Select tags for this episode:
                    <label htmlFor="art">Art and Culture</label>
                    <input
                        id="art"
                        name="tags"
                        type="checkbox"
                        value="Art and culture"
                        onChange={e => addTags(e)}
                    />
                    <label htmlFor="food">Food</label>
                    <input
                        id="food"
                        name="tags"
                        type="checkbox"
                        value="Food"
                        onChange={e => addTags(e)}
                    />
                    <label htmlFor="nature">Nature and Environment</label>
                    <input
                        id="nature"
                        name="tags"
                        type="checkbox"
                        value="Nature and environment"
                        onChange={e => addTags(e)}
                    />
                    <label htmlFor="politics">Politics and history</label>
                    <input
                        id="politics"
                        name="tags"
                        type="checkbox"
                        value="Politics and history"
                        onChange={e => addTags(e)}
                    />
                    <label htmlFor="society">Society</label>
                    <input
                        id="society"
                        name="tags"
                        type="checkbox"
                        value="Society"
                        onChange={e => addTags(e)}
                    />
                    <label htmlFor="tech">Technology</label>
                    <input
                        id="tech"
                        name="tags"
                        type="checkbox"
                        value="Technology"
                        onChange={e => addTags(e)}
                    />
                </div>
                <button onClick={add}>add new episode</button>
                <button onClick={edit}>edit that episode</button>
            </form>
        </div>
    );
}
