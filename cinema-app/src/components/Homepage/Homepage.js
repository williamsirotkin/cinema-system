import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import './Homepage.css';
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div class = "homepage">
    <h1 className='homepageTitles'> Showing Now</h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
            <Card className="text-center" style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
            <Card.Body>
                <Card.Title>The Batman</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 4:40 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 7:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
        <Carousel.Item  width = {250}>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Intersteller</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
</Carousel>
</div>
    <h1 className='homepageTitles'> Coming Soon </h1>
    <div class = "carousel">
     <Carousel>
        <Carousel.Item  width = {500} height = {5}>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
            <Card.Body>
                <Card.Title>Oppenheimer</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 4:40 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 7:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
        <Carousel.Item  width = {250}>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Guardians of the Galaxy Vol.3</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="btn btn-dark"> 2:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
</Carousel>
</div>
    </div>
  )
}

