import React from 'react'
import {Card,Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default function Cards(data) {
  return (
    <div>
        <Card className="text-center" style={{ width: '25rem'}}>
            <Card.Img variant="top" src={data.image} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <div class = "showtimes">
                <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now </Button></Link>
                </div>
                <a href={data.trailer} target="_blank"><Button variant="secondary">Watch trailer</Button></a>
            </Card.Body>
        </Card>
      
    </div>
  )
}
