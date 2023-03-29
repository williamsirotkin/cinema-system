import React from 'react'
import {Card,Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Cards(data) {
  return (
    <div>
        <Card className="text-center" style={{ width: '19.5rem'}}>
            <Card.Img class = 'movieImage' variant="top" src={data.image} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now </Button></Link>
                <a href={data.trailer} target="_blank"><Button variant="secondary">Watch trailer</Button></a>
                </div>
            </Card.Body>
        </Card>
      
    </div>
  )
}
