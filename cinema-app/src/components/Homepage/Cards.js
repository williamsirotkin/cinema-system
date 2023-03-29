import React, {useEffect, useState} from 'react'
import {Card,Button } from "react-bootstrap";
import { BsArrowLeftRight } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Cards(data) {
  let loggedInComponent;
  const [showTrailer, setShowTrailer] = useState(false)
    

    if (data.loggedIn) {
        loggedInComponent = <div>
           <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now </Button></Link>
        </div>
    } else {
      loggedInComponent = <div>
          <Link to  = "/login"><Button variant="btn btn-dark"> Book now </Button></Link>
        </div>
    }
  function embedLink(link) {
   let beginLink = "https://www.youtube.com";
   let middleLink = "/embed/"
   let endLink = link.substring(32);
    return beginLink + middleLink + endLink
  }

  let movieDisplay;
  if (showTrailer) {
    movieDisplay = <iframe width="300" height= "450" src={embedLink(data.trailer)} title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  } else {
    movieDisplay = <Card.Img class = 'movieImage' variant="top" src={data.image} />
  }

  return (
    <div>
        <Card className="text-center" style={{ width: '19.5rem'}}>
            {movieDisplay}
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <div class = "showtimes">
                {loggedInComponent}
                <Button variant="secondary" onClick = {() => setShowTrailer(!showTrailer)}>Watch trailer</Button>
                </div>
            </Card.Body>
        </Card>
      
    </div>
  )
}
