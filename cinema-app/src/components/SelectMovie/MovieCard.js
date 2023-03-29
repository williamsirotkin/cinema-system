import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function MovieCard(data) {
  return (
    <div className='cards'>
        <Card class = "card" style={{ width: '18vw' }}>
            <Card.Img variant="top" class = "image" src={data.image}/>
        <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
        <Accordion className='accordion'>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Additional Details</Accordion.Header>
            <Accordion.Body>
            {data.description}
            <hr />
            Genre: {data.genre.join(", ")}
            <hr/>
            Director: {data.director}
            <hr />
            Producers: {data.producers.join(", ")}
            <hr/>
            Cast: {data.cast.join(", ")}
            <hr />
            Rating: {data.rating}
            <br></br>
            <a href={data.trailer} target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
  </Card.Body>
</Card>
      
    </div>
  )
}
