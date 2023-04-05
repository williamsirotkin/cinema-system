import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './ManageMovies.css'
import { removeMovie } from '../../utility/removeMoviesUtility';
import {useNavigate} from 'react-router-dom'


export default function EditMovieCard(data) {
  let nav = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault();
        await handleDeleteMovie();
        window.location.reload();
      };
    async function handleDeleteMovie(){
        await removeMovie(data.title)
      }

   return (
    <div className='cards'>
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" class = "image" src={data.image}/>
        <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <div className='manageButtons'>
        <Button variant="btn btn-dark" onClick = {()=>nav('/addOrRemoveMovie/' + data.title, {replace: true})}>Edit Times</Button>
        <Link to  = "/editMovie"><Button variant="btn btn-secondary">edit movie</Button></Link>
        <Button variant="btn btn-danger" onClick={handleDelete}>Delete</Button>
        </div>
        <Accordion className='accordion'>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Additional Details</Accordion.Header>
            <Accordion.Body>
            {data.description}
            <hr />
            Director: {data.director}
            <hr />
            Producers: {data.producers.join(",")}
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
