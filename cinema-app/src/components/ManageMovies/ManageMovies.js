// import './ManageMovies.css'
import {useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import EditMovieCard from './EditMovieCard';
import { getAllMovies } from '../../utility/getAllMoviesUtility';
import Button from 'react-bootstrap/Button';
import { BsPersonPlus } from 'react-icons/bs';

async function handleGetAllMovies(setMovies, details) {
  let movies = await getAllMovies(details)
  setMovies(movies)
}

export default function ManageMovies(props) {
  useEffect(()=>{
    handleGetAllMovies(props.setMovies, "true")
  },[])
  let display;
  let nav = useNavigate()
  if (props.movies) {
    console.log(props.movies)
    display = 
    <div>
      <div className = "add-movie-row">
          <div className='homepageTitles'> 
            <h1> Manage Movies </h1>
            </div>
            <Button className = "add-movie-button" variant="success" onClick={()=>nav('/EditMovie', {replace: true})}> Add Movie + </Button>
      </div>
      <div className='movie-row mt-2'>
      {props.movies.map((movie, index) => (
        <EditMovieCard title={movie.title} image={movie.photo_link} 
        description={movie.details.synopsis} director={movie.details.director}  
        producers={movie.details.producer} rating={movie.MPAA_rating} trailer = {movie.trailer_link}/>
      ))}
      </div>
    </div>
  } else {
    display = <div> <h1> No Movies Available</h1></div>
  }
  if (props.user.admin) {
  return (
    display
  )
  } else {
    return (
      <h1> You are not authorized to view this page </h1>
    )
  }
}
