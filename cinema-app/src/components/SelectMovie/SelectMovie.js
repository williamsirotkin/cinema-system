import './SelectMovie.css'
import React, { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import MovieCard from './MovieCard';
import { getAllMovies } from '../../utility/getAllMoviesUtility';

async function handleGetAllMovies(setMovies, details) {
  let movies = await getAllMovies(details)
  setMovies(movies)
}
export default function SelectMovie(props) {
  let params = useParams()
  useEffect(()=>{
    if (params.filter != "Movies") { 
      return
    }
    handleGetAllMovies(props.setMovies, "true")
  },[])
  let movieType = "Coming Soon"
  if (params.filter) {
    movieType = params.filter
  } else if (props.movies[0].isShowing) {
    movieType = "Showing Now"
  }
  let userDisplay;
  if (props.movies) {
    console.log(props.movies)
    userDisplay = 
    <div>
    <div className='selectMovieTitles'> <h1> {movieType} </h1></div>
    <div className= "movie-row"> 
      {props.movies.map((movie, index) => (
        <MovieCard comingSoon = {movieType == "Coming Soon" || comingSoonContains(props.comingSoon, movie.title)} admin = {props.admin} title={movie.title} image={movie.photo_link} loggedIn = {props.loggedIn}
        description={movie.details.synopsis} director={movie.details.director}  
        producers={movie.details.producer} rating={movie.MPAA_rating} trailer = {movie.trailer_link} cast={movie.details.cast} genre={movie.category} reviews={movie.details.reviews}/>
      ))}
    </div>
    </div>
  } else {
    userDisplay = 
    <div>
      <div className='selectMovieTitles'> <h1> {movieType} </h1>
    </div>
      <h1 className='mt-5'>No movies were found, please search again</h1>

    </div>
  }
  
  return (
    userDisplay
  )

}

function comingSoonContains(comingSoon, title) {
  if (!comingSoon) {
    return false
  }
  for (let i = 0; i < comingSoon.length; i++) {
    if (title === comingSoon[i].title) {
      return true
    }
  }
  return false
}
