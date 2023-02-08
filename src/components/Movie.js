import React from "react";

export default function Movie(props) {

    return (
        <div className="movie" id={props.movie.imdbID}>

        
        <img 
          className="movie-poster" 
          src={props.movie.Poster} 
          alt={props.movie.Title}
          height="100%"
          width="100%"
        ></img>
      

        <div className="movie-info">

          <div className="movie-title-rating-box">

              <span className="movie-title">{props.movie.Title}</span>
              <i className="fa-solid fa-star"></i>
              <span className="movie-rating">{props.movie.imdbRating}</span>

          </div>

          <div className="movie-time-genre-box">

            <span className="movie-runtime">{props.movie.Runtime}</span>
            <span className="movie-genre">{props.movie.Genre}</span>
            <i 
              id={props.movie.imdbID} 
              className="fa-solid fa-plus"
              onClick={props.addToWatchlist}
            ></i>
            <span 
              className="watchlist-btn" 
              id={props.movie.imdbID}
              onClick={props.addToWatchlist}
            >Watchlist</span>

          </div>

          <p className="movie-plot">{props.movie.Plot}</p>

        </div>

      </div>
    )
}
