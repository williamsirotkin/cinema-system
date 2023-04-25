import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './orderHistory.css'
import HistoryCard from './HistoryCard';
import { getOrderHistory } from '../../utility/orderHistoryUtility';


export default function OrderHistory(props) {
const [orders2, setOrders] = useState([])
const orders = []

console.log(props.user)
useEffect(()=>{
  (async()=>{
    const result = await getOrderHistory(props.user.email)
    console.log(result)
    setOrders(result)

  })();
},[])

if (props.user) {
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
  } else { 
    return (
      <h1> You are not authorized to view this page </h1>
    )
  }
}

