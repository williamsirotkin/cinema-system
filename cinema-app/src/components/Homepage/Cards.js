import React, {useEffect} from 'react'
import {Card,Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Cards(data) {
  let loggedInComponent;
    
    console.log(data.loggedInComponent)
    if (data.loggedIn) {
        loggedInComponent = <div>
           <Link to  = "/selectShowtime"><Button variant="btn btn-dark"> Book now </Button></Link>
        </div>
    } else {
      loggedInComponent = <div>
          <Link to  = "/login"><Button variant="btn btn-dark"> Book now </Button></Link>
        </div>
    }

  return (
    <div>
        <Card className="text-center" style={{ width: '19.5rem'}}>
            <Card.Img class = 'movieImage' variant="top" src={data.image} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <div class = "showtimes">
                {loggedInComponent}
                <a href={data.trailer} target="_blank"><Button variant="secondary">Watch trailer</Button></a>
                </div>
            </Card.Body>
        </Card>
      
    </div>
  )
}
