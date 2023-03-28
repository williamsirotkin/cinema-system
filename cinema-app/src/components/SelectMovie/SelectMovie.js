import './SelectMovie.css'
import React, { useEffect,useState } from 'react';
import MovieCard from './MovieCard';
import { getAllMovies } from '../../utility/getAllMoviesUtility';

async function handleGetAllMovies(setMovies, details) {
  let movies = await getAllMovies(details)
  setMovies(movies)
}
export default function SelectMovie(props) {
  useEffect(()=>{
    handleGetAllMovies(props.setMovies, "true")
  },[])

  let display;
  if (props.movies) {
    console.log(props.movies)
    display = 
    <div className= "movie-row"> 
      {props.movies.map((movie, index) => (
        <MovieCard title={movie.title} image={movie.photo_link} 
        description={movie.details.synopsis} director={movie.details.director}  
        producers={movie.details.producer} rating={movie.MPAA_rating} trailer = {movie.trailer_link}/>
      ))}
    </div>
  } else {
    display = <div> <h1> No Movies Available with that Title </h1></div>
  }
  return (
    display
  )
}
