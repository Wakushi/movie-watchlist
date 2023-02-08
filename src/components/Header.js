import React from "react";

export default function Header({getUserInput, getData, handleBug, handleDisplay}) {
    return (
        <header>
            <a href="#"><i onClick={handleBug} className="fa-solid fa-ticket"></i></a> 
            <a href="/"><h1>Movie Library</h1></a> 
            <h3 className="link-watchlist" onClick={handleDisplay}>My Watchlist</h3>
            <div className="user-input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input className="search-bar" onChange={getUserInput} id="movie" type="text"></input>
                <button className="search-btn" onClick={getData}>Search</button>
            </div>
        </header>
    )
}