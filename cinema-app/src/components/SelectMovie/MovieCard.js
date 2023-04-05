import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function MovieCard(data) {
  const [showTrailer, setShowTrailer] = useState(false)

  function embedLink(link) {
    let beginLink = "https://www.youtube.com";
    let middleLink = "/embed/"
    let endLink = link.substring(32);
     return beginLink + middleLink + endLink
   }
 
   let movieDisplay;
   if (showTrailer) {
     movieDisplay = <iframe width="310" height= "400" src={embedLink(data.trailer)} title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen webkitallowfullscreen></iframe>
   } else {
     movieDisplay = <Card.Img class = 'movieImage' variant="top" src={data.image} />
   }

  return (
    <div className='cards'>
        <Card class = "card" style={{ width: '18vw' }}>
            {movieDisplay}
        <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Link to  = {`/selectShowtime/${data.title}`}><Button variant="btn btn-dark"> Select showtime</Button></Link>
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
