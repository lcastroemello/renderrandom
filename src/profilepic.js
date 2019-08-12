import React from "react";

export default function({ picture, first, last, size, onClick }) {
    return (
        <img
            className="profilePicture"
            width={size == "jumbo" ? "200rem" : "80rem"}
            height={size == "jumbo" ? "200rem" : "80rem"}
            id="images"
            src={picture}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    );
}
