import React from 'react'
import { Carousel, Stack} from "react-bootstrap";
import './Homepage.css';
import Cards from './Cards.js'

export default function Homepage() {
    const moviearr = [{
        title: 'The Batman',
        image: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4" 
    },
    {
        title: 'Everything Everywhere All At Once',
        image: "https://m.media-amazon.com/images/I/A1f7vq1AwuL.jpg" ,
        trailer: "https://www.youtube.com/watch?v=wxN1T1uxQ2g"
    },
    {
        title: 'Intersteller',
        image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" ,
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
    },
    {
        title: 'Parasite',
        image: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" ,
        trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY"
    },
    {
        title: 'Superbad',
        image: "https://m.media-amazon.com/images/M/MV5BY2VkMDg4ZTYtN2M3Yy00NWZiLWE2ODEtZjU5MjZkYWNkNGIzXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg" ,
        trailer: "https://www.youtube.com/watch?v=4eaZ_48ZYog"
    },
    {
        title: 'Pulp Fiction',
        image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
    },];


    const comingSoonMovies = [{
        title: 'Oppenheimer',
        image: "https://broadbandforum.co/attachments/oppenheimer-webp.6209/",
        trailer: "https://www.youtube.com/watch?v=bK6ldnjE3Y0"
    },
    {
        title: 'The Flash',
        image: "https://m.media-amazon.com/images/M/MV5BOWNhMGU5MjEtMGVkYi00M2RiLWE5NjUtY2U5NDAxZTcwNDY0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=hebWYacbdvc"
    },
    {
        title: 'Guardians of the Galaxy Vol.3',
        image: "https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=JqcncLPi9zw"
    },
    {
        title: 'The Room',
        image: "https://m.media-amazon.com/images/M/MV5BYjEzN2FlYmYtNDkwMC00NGFkLWE5ODctYmE5NmYxNzE2MmRiXkEyXkFqcGdeQXVyMjMwODc5Mw@@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=9-dIdFXeFhs"
    },
    {
        title: 'Barbie',
        image: "https://m.media-amazon.com/images/M/MV5BNzliODE4NDQtYzEwNy00N2QyLTk2ZGQtZGZhNDU0NjVlZDMyXkEyXkFqcGdeQXVyMTU0Mjc4MTY4._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=8zIf0XvoL9Y"
    },
    {
        title: 'Joker 2',
        image: 'https://m.media-amazon.com/images/M/MV5BODUyODM1OGEtNTY3ZC00OTFjLTkyNDgtODU4MTk5NzkzYmQ5XkEyXkFqcGdeQXVyNjczMjc4NTA@._V1_.jpg',
        trailer: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }]

  return (
    <div class = "homepage">
    
    <h1 className='homepageTitles'> Showing Now</h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>

            <Cards title={moviearr[0].title} image={moviearr[0].image} trailer={moviearr[0].trailer}></Cards>
            <Cards title={moviearr[1].title} image={moviearr[1].image} trailer={moviearr[1].trailer}></Cards>
            <Cards title={moviearr[2].title} image={moviearr[2].image} trailer={moviearr[2].trailer}></Cards>
            </Stack>
        </Carousel.Item>


     <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>

        <Cards title={moviearr[3].title} image={moviearr[3].image} trailer={moviearr[3].trailer}></Cards>
        <Cards title={moviearr[4].title} image={moviearr[4].image} trailer={moviearr[4].trailer}></Cards>
        <Cards title={moviearr[5].title} image={moviearr[5].image} trailer={moviearr[5].trailer}></Cards>

            </Stack>
        </Carousel.Item>
</Carousel>

</div>
    <h1 className='homepageTitles'> Coming Soon </h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>

        <Cards title={comingSoonMovies[0].title} image={comingSoonMovies[0].image} trailer={comingSoonMovies[0].trailer}></Cards>
        <Cards title={comingSoonMovies[1].title} image={comingSoonMovies[1].image} trailer={comingSoonMovies[1].trailer}></Cards>
        <Cards title={comingSoonMovies[2].title} image={comingSoonMovies[2].image} trailer={comingSoonMovies[2].trailer}></Cards>
            
        </Stack>
        </Carousel.Item>


        <Carousel.Item  width = {250}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>
        
        <Cards title={comingSoonMovies[3].title} image={comingSoonMovies[3].image} trailer={comingSoonMovies[3].trailer}></Cards>
        <Cards title={comingSoonMovies[4].title} image={comingSoonMovies[4].image} trailer={comingSoonMovies[4].trailer}></Cards>
        <Cards title={comingSoonMovies[5].title} image={comingSoonMovies[5].image} trailer={comingSoonMovies[5].trailer}></Cards>
    

            </Stack>
        </Carousel.Item>
</Carousel>
</div>
    </div>
  )
}

