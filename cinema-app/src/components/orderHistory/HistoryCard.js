import React from 'react'
import { Card } from 'react-bootstrap';

export default function HistoryCard(props) {
  console.log(props.tickets)
  return (
    <Card style={{ width: '80rem' }}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Order id: {props.id}</Card.Subtitle>
      <hr/>
      <div class="d-flex gap-2">
      <p class="fs-5">Seat numbers:</p>
      {props.tickets.map((tickets) => (
          <p class="fs-5">{tickets.seatNumber}</p>
     
          
        ))}
        </div>
        <div class="d-flex gap-2">
          <p class="fs-5">Seat types:</p>
          {props.tickets.map((tickets) => (
              <p class="fs-5">{tickets.seatType}</p>
            ))}
        </div>
        <hr/>
      {props.promo ? (
        <div class="d-flex justify-content-between">
        <p class="fs-5">Promo:</p>
        <p class="fs-5"> ${props.promo}</p>
        </div>
      ) : (
        <p class="fs-5">No promo applied</p>
      )}
      <div class="d-flex justify-content-between">
        <p class="fs-5">Subtotal</p>
        <p class="fs-5"> ${props.subtotal}</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-5">Total after discount(if applied)</p>
        <p class="fs-5"> ${props.total.toFixed(2)}</p>
        </div>
    </Card.Body>
  </Card>
  )
}

