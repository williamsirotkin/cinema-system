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
    handleGetAllMovies(props.setMovies, "true")
  },[])

  let movieType = "Coming Soon"
  if (params.filter) {
    movieType = params.filter
  } else if (props.movies[0].isShowing) {
    movieType = "Showing Now"
  }
  let display;
  if (props.movies) {
    console.log(props.movies)
    display = 
    <div>
    <div className='selectMovieTitles'> <h1> {movieType} </h1></div>
    <div className= "movie-row"> 
      {props.movies.map((movie, index) => (
        <MovieCard title={movie.title} image={movie.photo_link} 
        description={movie.details.synopsis} director={movie.details.director}  
        producers={movie.details.producer} rating={movie.MPAA_rating} trailer = {movie.trailer_link} cast={movie.details.cast} genre={movie.category} reviews={movie.details.reviews}/>
      ))}
    </div>
    </div>
  } else {
    display = <div className='selectMovieTitles'> <h1> {movieType} </h1></div>
  }
  return (
    display
  )
}
