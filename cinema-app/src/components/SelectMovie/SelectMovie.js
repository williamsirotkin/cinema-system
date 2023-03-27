import './SelectMovie.css'
import React, { useState } from 'react';
import MovieCard from './MovieCard';

export default function SelectMovie(props) {
  let display;
  let movies;
  if (props.movies) {
    console.log(props.movies)
    display = 
    <div class = "movie-row"> 
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
/*
const movieArr =[{
  title: "Intersteller",
  image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
  description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  director: "Christopher Nolan",
  writers: "Jonathan Nolan, Christopher Nolan",
  stars: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
  trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"

},
{
  title: "Oppenheimer",
  image: "https://broadbandforum.co/attachments/oppenheimer-webp.6209/",
  description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  director: "Christopher Nolan",
  writers: "Jonathan Nolan, Kai Bird, Martin Sherwin",
  stars: "Cillian Murphy, Emily Blunt, Matt Damon",
  trailer: "https://www.youtube.com/watch?v=bK6ldnjE3Y0"

},
{
  title: "Guardians of The Galaxy vol.3 ",
  image: "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
  description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.",
  director: "James Gunn",
  writers: "James Gunn, Dan Abnett, Andy Lanning",
  stars: "Chris Pratt, Zoe Saldana, Dave Bautista",
  trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"

},
{
  title: "The Batman",
  image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
  description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  director: "Matt Reeves",
  writers: "Matt Reeves, Peter Craig, Bob Kane",
  stars: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
  trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4"

},
{
  title: "The Batman",
  image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
  description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  director: "Matt Reeves",
  writers: "Matt Reeves, Peter Craig, Bob Kane",
  stars: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
  trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4"

},]
  
  return (
  <div>
  <div class = "movie-row">

  <MovieCard title={movieArr[4].title} image={movieArr[4].image} 
  description={movieArr[4].description} director={movieArr[4].director}  
  writers={movieArr[4].writers} stars={movieArr[4].stars} trailer = {movieArr[4].trailer}/>

  <MovieCard title={movieArr[0].title} image={movieArr[0].image} 
  description={movieArr[0].description} director={movieArr[0].director}  
  writers={movieArr[0].writers} stars={movieArr[0].stars} trailer = {movieArr[0].trailer}/>

  <MovieCard title={movieArr[1].title} image={movieArr[1].image} 
  description={movieArr[1].description} director={movieArr[1].director}  
  writers={movieArr[1].writers} stars={movieArr[1].stars} trailer = {movieArr[1].trailer}/>

<MovieCard title={movieArr[2].title} image={movieArr[2].image} 
  description={movieArr[2].description} director={movieArr[2].director}  
  writers={movieArr[2].writers} stars={movieArr[2].stars} trailer = {movieArr[2].trailer}/>

  <MovieCard title={movieArr[3].title} image={movieArr[3].image} 
  description={movieArr[3].description} director={movieArr[3].director}  
  writers={movieArr[3].writers} stars={movieArr[3].stars} trailer = {movieArr[3].trailer}/>

</div>

<div class = "movie-row">
<MovieCard title={movieArr[4].title} image={movieArr[4].image} 
  description={movieArr[4].description} director={movieArr[4].director}  
  writers={movieArr[4].writers} stars={movieArr[4].stars} trailer = {movieArr[4].trailer}/>

<MovieCard title={movieArr[0].title} image={movieArr[0].image} 
  description={movieArr[0].description} director={movieArr[0].director}  
  writers={movieArr[0].writers} stars={movieArr[0].stars} trailer = {movieArr[0].trailer}/>

<MovieCard title={movieArr[1].title} image={movieArr[1].image} 
  description={movieArr[1].description} director={movieArr[1].director}  
  writers={movieArr[1].writers} stars={movieArr[1].stars} trailer = {movieArr[1].trailer}/>

<MovieCard title={movieArr[2].title} image={movieArr[2].image} 
  description={movieArr[2].description} director={movieArr[2].director}  
  writers={movieArr[2].writers} stars={movieArr[2].stars} trailer = {movieArr[2].trailer}/>

  <MovieCard title={movieArr[3].title} image={movieArr[3].image} 
  description={movieArr[3].description} director={movieArr[3].director}  
  writers={movieArr[3].writers} stars={movieArr[3].stars} trailer = {movieArr[3].trailer}/>
 


</div>
</div>
)
*/
}
