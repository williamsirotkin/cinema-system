import React from 'react'
import { Carousel, Card, Stack, Button } from "react-bootstrap";
import './Homepage.css';
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div class = "homepage">
    <h1 className='homepageTitles'> Showing Now</h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>
            <Card className="text-center" style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
            <Card.Body>
                <Card.Title>The Batman</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now </Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=mqqft2x_Aa4" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>

            </Card.Body>
            </Card>

            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/I/A1f7vq1AwuL.jpg" />
            <Card.Body>
                <Card.Title>Everything Everywhere All At Once</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=wxN1T1uxQ2g" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>

            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Intersteller</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>

            </Stack>
        </Carousel.Item>


     <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>
            <Card className="text-center" style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Parasite</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=5xH0HfJHsaY" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BY2VkMDg4ZTYtN2M3Yy00NWZiLWE2ODEtZjU5MjZkYWNkNGIzXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Superbad</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=4eaZ_48ZYog" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Pulp Fiction</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=s7EdQ4FqbhY" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>

            </Stack>
        </Carousel.Item>
</Carousel>

</div>
    <h1 className='homepageTitles'> Coming Soon </h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>

            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
            <Card.Body>
                <Card.Title>Oppenheimer</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=bK6ldnjE3Y0" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BOWNhMGU5MjEtMGVkYi00M2RiLWE5NjUtY2U5NDAxZTcwNDY0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" />
            <Card.Body>
                <Card.Title>The Flash</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=hebWYacbdvc" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Guardians of the Galaxy Vol.3</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=JqcncLPi9zw" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            </Stack>
        </Carousel.Item>


        <Carousel.Item  width = {250}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>

            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BYjEzN2FlYmYtNDkwMC00NGFkLWE5ODctYmE5NmYxNzE2MmRiXkEyXkFqcGdeQXVyMjMwODc5Mw@@._V1_.jpg" />
            <Card.Body>
                <Card.Title>The Room</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=9-dIdFXeFhs" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>
            
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BNzliODE4NDQtYzEwNy00N2QyLTk2ZGQtZGZhNDU0NjVlZDMyXkEyXkFqcGdeQXVyMTU0Mjc4MTY4._V1_.jpg" />
            <Card.Body>
                <Card.Title>Barbie</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=8zIf0XvoL9Y" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>

            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BODUyODM1OGEtNTY3ZC00OTFjLTkyNDgtODU4MTk5NzkzYmQ5XkEyXkFqcGdeQXVyNjczMjc4NTA@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Joker 2</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now</Button></Link>
                </div>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"><Button variant="secondary" size="sm">Watch trailer</Button></a>
            </Card.Body>
            </Card>

            </Stack>
        </Carousel.Item>
</Carousel>
</div>
    </div>
  )
}

