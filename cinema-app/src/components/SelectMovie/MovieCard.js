import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function MovieCard(data) {
  const [showTrailer, setShowTrailer] = useState(false)

  let movieDisplay;
  if (!showTrailer)  {
    movieDisplay = <Card.Img variant="top" class = "image" src={data.image}/>
  } else {
    movieDisplay = <iframe width="300" height= "450" src="https://www.youtube.com/embed/4eaZ_48ZYog" title="Superbad (2007) Official Trailer 1 - Jonah Hill Movie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  }

  return (
    <div className='cards'>
        <Card class = "card" style={{ width: '18vw' }}>
            {movieDisplay}
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
           <Button onClick = {() => setShowTrailer(!showTrailer)} variant="dark" size="md" className='trailerBtn'>Watch trailer</Button>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
  </Card.Body>
</Card>
      
    </div>
  )
}
