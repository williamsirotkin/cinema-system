import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ManageMovies.css'
import { ListGroupItem } from 'react-bootstrap';
export default function ManageMovies() {
  return (
    <div>
    <h1 className='manageMovieTitle'>Manage Movies</h1>
    <div className='movieEdit'>
    <Card className="text-center" style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
            <Card.Body>
                <Card.Title>The Batman</Card.Title>
                <div class = "showtimes">
               <Button variant="btn btn-dark"> 2:10 </Button>
              <Button variant="btn btn-dark"> 4:40 </Button>
              <Button variant="btn btn-dark"> 7:10 </Button>
                </div>
                <br></br>
                <Card.Header>Edit:</Card.Header>
                <br></br>
                <div className='editButtons'>
                <Button variant="btn btn-danger">Movie title</Button>
                <Button variant="btn btn-danger">Movie times</Button>
                <Button variant="btn btn-danger">description</Button>
              </div>
            </Card.Body>
    </Card>
    <Card className="text-center" style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
            <Card.Body>
                <Card.Title>Intersteller</Card.Title>
                <div class = "showtimes">
                <Button variant="btn btn-dark"> 2:10 </Button>
                <Button variant="btn btn-dark"> 4:40 </Button>
                <Button variant="btn btn-dark"> 7:10 </Button>
                </div>
                <br></br>
                <Card.Header>Edit:</Card.Header>
                <br></br>
                <div className='editButtons'>
                <Button variant="btn btn-danger">Movie title</Button>
                <Button variant="btn btn-danger">Movie times</Button>
                <Button variant="btn btn-danger">description</Button>
              </div>
            </Card.Body>
        </Card>
    </div>
    
    </div>
  )
}
