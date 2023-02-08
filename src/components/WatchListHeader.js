import React from "react";

export default function WatchListHeader({handleBug, handleDisplay}) {
    return (
        <header>
            <i onClick={handleBug} className="fa-solid fa-ticket"></i>
            <h1>My Watchlist</h1>
            <h3 className="link-watchlist back-btn" onClick={handleDisplay}>Back to library</h3> 
        </header>
    )
}