import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFavorites, removeFavorite } from "./actions";

export default function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    console.log("testing favorites", favorites);
    useEffect(() => {
        dispatch(receiveFavorites());
    }, []);

    return (
        <div className="favorites">
            <h1>My favorite episodes</h1>
            <div className="favoritesarea">
                {favorites &&
                    favorites.map(favorites => {
                        return (
                            <div key={favorites.id}>
                                <img
                                    style={{
                                        objectFit: "cover",
                                        height: "4rem",
                                        width: "4rem"
                                    }}
                                    src={favorites.picture}
                                />
                                <h2>{favorites.title}</h2>
                                <p>{favorites.summary}</p>
                                <p
                                    className="fakebutton"
                                    onClick={() =>
                                        dispatch(removeFavorite(favorites.id))
                                    }
                                >
                                    Remove this episode from your favorites
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
