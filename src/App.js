import React from "react";
import Movie from "./components/Movie";
import ListedMovie from "./components/ListedMovie";
import Header from "./components/Header";
import WatchListHeader from "./components/WatchListHeader";
import EmptyList from "./components/EmptyList";

export default function App() {

  const [movieList, setMovieList] = React.useState([])
  const [movieWatchlist, setMovieWatchlist] = React.useState([])
  const [userInput, setUserInput] = React.useState('')
  const [userWatchlistId, setUserWatchlistId] = React.useState(JSON.parse(localStorage.getItem('watchlist')) || [])
  const [displayWatchList, setDisplayWatchList] = React.useState(false)


  // ----- SEARCH MOVIES ----- 

  function getUserInput(e){
    setUserInput(e.target.value.replace(/\s/g, '+'))
  }

  async function getData() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=e4c533bb&s=${userInput}`)
    const data = await response.json()
    const imdbIds = data.Search.map(movie => movie.imdbID)
    const moviesArray = []
    imdbIds.forEach(movieId => {
      fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e4c533bb`)
        .then(r => r.json())
        .then(data => moviesArray.push(data))
    })
    setTimeout(()=>{
      setMovieList(moviesArray)
    },500)
    
  }

  // ----- RENDER SEARCHED MOVIES ----- 

  const movieElements = movieList.map(movie => {
    return (
        <Movie 
          addToWatchlist={addToWatchlist} 
          key={movie.imdbID} 
          movie={movie}
        />
    )
  })

  // ----- ADD MOVIE IDs TO WATCHLIST ----- 

  function addToWatchlist(e) {
    if(!userWatchlistId.includes(e.target.id)){
      const tempArray = []
      tempArray.push(e.target.id)
      setUserWatchlistId(prevIdlist => [...prevIdlist, ...tempArray])
    } 
  }

  // ----- TRANSFORM MOVIE IDs TO MOVIE OBJECTS ----- 

  function getUserWatchlist() {
    const watchlistArray = []
    userWatchlistId.forEach(movieId => {
      fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e4c533bb`)
        .then(r => r.json())
        .then(data => watchlistArray.push(data))
    })
    setTimeout(()=>{
      setMovieWatchlist(watchlistArray)
    },500)
  }

  // ----- MAINTAIN LOCALSTORAGE & USERWATCHLIST UPDATED -----

  React.useEffect(()=>{
    localStorage.setItem('watchlist', JSON.stringify(userWatchlistId))
    getUserWatchlist()
  },[userWatchlistId])


  // ----- REMOVE A MOVIE FROM WATCHLIST ----- 
 
  function removeFromWatchList(e) {
    const tempArray = []
    userWatchlistId.forEach(movie => {
      if(movie !== e.target.id){
        tempArray.push(movie)
      }
    })
    setUserWatchlistId(tempArray)
  }

  // ----- RENDER WATCH LIST DOM ELEMENTS  ----- 

  function renderWatchListElements(){
    return movieWatchlist.map(movie => {
      return (
          <ListedMovie 
             removeFromWatchList={removeFromWatchList} 
             key={movie.imdbID} 
             movie={movie}
          />
      )
    })
  }

  // ----- SWITCH BETWEEN LIBRARY AND WATCHLIST ----- 

  function handleDisplay() {
    setDisplayWatchList(prevDisplay => !prevDisplay)
  }

  return ( 
    <>
          {!displayWatchList && <>
            <Header
              movieWatchlist={movieWatchlist} 
              getUserInput={getUserInput} 
              getData={getData}
              handleDisplay={handleDisplay}
            />
            <main>
              {movieElements.length == 0 && <EmptyList />}
              {movieElements}
            </main>
          </>}

          {displayWatchList && <>
            <WatchListHeader handleDisplay={handleDisplay}/>
            <section className="watchlist">
            { movieWatchlist.length > 0 ? renderWatchListElements() : <EmptyList /> }
            </section>   
          </>}
    </>
  )
}