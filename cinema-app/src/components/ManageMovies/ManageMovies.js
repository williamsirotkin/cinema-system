// import '../SelectMovie.css'
import {useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import EditMovieCard from './EditMovieCard';
import { getAllMovies } from '../../utility/getAllMoviesUtility';
import Button from 'react-bootstrap/Button';

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
    display = <div className= "movie-row">
      <div className = "add-movie-row">
            <h1> Manage Movies </h1>
            <Button variant="success" onClick={()=>nav('/EditMovie', {replace: true})}> Add Movie + </Button>
      </div>
      {props.movies.map((movie, index) => (
        <EditMovieCard title={movie.title} image={movie.photo_link} 
        description={movie.details.synopsis} director={movie.details.director}  
        producers={movie.details.producer} rating={movie.MPAA_rating} trailer = {movie.trailer_link}/>
      ))}
    </div>
  } else {
    display = <div> <h1> No Movies Available</h1></div>
  }
  return (
    display
  )
}



// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import './ManageMovies.css'
// import {useNavigate} from 'react-router-dom'
// import { getAllMovies } from '../../utility/getAllMoviesUtility';

// export default function ManageMovies() {

//   let nav = useNavigate()

//   return (
//     <div>
//         <div className = "add-movie-row">
//         <h1> Manage Movies </h1>
//         <Button variant="success" onClick={()=>nav('/EditMovie', {replace: true})}> Add Movie + </Button>
//         </div>
//         <div class = "add-movie-row">
//         <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//     <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//     <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     </div>
//     <div class = "add-movie-row">
//         <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//     <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit  Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//     <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     <Card style={{ width: '15rem' }}>
//       <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
//       <Card.Body>
//         <Card.Title> The Batman </Card.Title>
//         <p> Showtimes: 2:10, 4:40</p>
//         <Button variant="primary"> Edit Movie     </Button>
//         <Button variant="warning"> Edit Showtimes </Button>
//         <Button variant="danger"> Delete Movie </Button>
//       </Card.Body>
//     </Card>
//     </div>
//     </div>
//   )
// }
