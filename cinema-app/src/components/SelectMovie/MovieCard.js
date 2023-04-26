import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';
import './SelectMovie.css'

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
    movieDisplay = <iframe width="325" height= "400" src={embedLink(data.trailer)} title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen webkitallowfullscreen></iframe>
   } else {
     movieDisplay = <Card.Img class = 'movieImage' variant="top" src={data.image} />
   }

   let selectShowtime;
   console.log(data.admin)
   console.log(data.loggedIn)
   if (!data.admin && data.loggedIn&& !data.comingSoon) {
    selectShowtime = <Link to  = {`/selectShowtime/${data.title}`}><Button variant="btn btn-dark"> Select showtime</Button></Link>
   } else if (!data.user && !data.comingSoon) {
    console.log(data.loggedIn)
    selectShowtime = <Link to  = {"/login/" + data.title}><Button variant="btn btn-dark"> Select showtime</Button></Link>
   }
  return (
    <div className='cards'>
        <Card className="text-center" style={{ width: '20.5rem'}}>
            {movieDisplay}
        <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <div class = "showtimes">
        {selectShowtime}
        <Button variant="secondary" onClick = {() => setShowTrailer(!showTrailer)}>Watch trailer</Button>
        </div>
        <Accordion className='accordion'>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Additional Details</Accordion.Header>
            <Accordion.Body>

            <Accordion className='accordion'>
                <Accordion.Item eventKey="0">
                  <AccordionHeader> Synopsis </AccordionHeader>
                    <Accordion.Body>
                      {data.description}
                    </Accordion.Body>
                </Accordion.Item>
          </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Genre </AccordionHeader>
                  <Accordion.Body>
                    {data.genre.join(", ")}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Director </AccordionHeader>
                  <Accordion.Body>
                    {data.director}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Producers </AccordionHeader>
                  <Accordion.Body>
                    {data.producers.join(", ")}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Cast </AccordionHeader>
                  <Accordion.Body>
                    {data.cast.join(", ")}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Rating </AccordionHeader>
                  <Accordion.Body>
                    {data.rating}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className='accordion'>
              <Accordion.Item eventKey="0">
                <AccordionHeader> Reviews </AccordionHeader>
                  <Accordion.Body>
                    {data.reviews}
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Accordion.Body>
            </Accordion.Item>
        </Accordion>
  </Card.Body>
</Card>
      
    </div>
  )

}
