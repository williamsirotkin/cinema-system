import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './orderHistory.css'
import HistoryCard from './HistoryCard';
export default function OrderHistory() {

const orders = []

  return (
    <div>
         <Card  style={{ width: '85rem' }} className='card'>
              <Card.Header as="h5">Order History</Card.Header>
              <Card.Body>
              {orders.map((movie) => (
        <HistoryCard id={movie._id} title={movie.title} image={movie.image} 
        description={movie.description} director={movie.director}  
        producers={movie.producer} rating={movie.rating} trailer = {movie.trailer} cast={movie.cast} genre={movie.genre} review={movie.review}/>
      ))}
              </Card.Body>
        </Card>
    </div>
  )
}

