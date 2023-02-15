import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import './Homepage.css';
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div class = "homepage">
     <Carousel class = "carousel">
        <Carousel.Item interval={1000} width = {1} height = {5}>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQje3-NJXiD31oJbo0LWUXA7qRM2LXRlJP50t5W_WuslLALamvbjh6CIhvxuZMC_rgVbP8&usqp=CAU" />
            <Card.Body>
                <Card.Title>The Batman</Card.Title>
                <Card.Text>
                    Awesome movie description
                </Card.Text>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
        <Carousel.Item interval={1000} width = {250}>
            <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQje3-NJXiD31oJbo0LWUXA7qRM2LXRlJP50t5W_WuslLALamvbjh6CIhvxuZMC_rgVbP8&usqp=CAU" />
            <Card.Body>
                <Card.Title>The Batman</Card.Title>
                <Card.Text>
                    Awesome movie description
                </Card.Text>
                <div class = "showtimes">
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                <Link to  = "/selectSeats"><Button variant="primary"> 2:10 </Button></Link>
                </div>
            </Card.Body>
            </Card>
        </Carousel.Item>
</Carousel>
    </div>
  )
}

