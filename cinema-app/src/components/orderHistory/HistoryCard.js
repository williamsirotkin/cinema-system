import React from 'react'
import { Card } from 'react-bootstrap';
import { formatShowtime } from '../CheckoutPage/CheckoutPage';

export default function HistoryCard(props) {
  console.log(props.tickets)
  return (
    <Card style={{ width: '80rem' }}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Order id: {props.id}</Card.Subtitle>
      <hr/>
      <div class="d-flex gap-2">
        <p class="fs-5">showtime:</p>
        {/* <p class="fs-5">{new Date(props.showtime.$date).toLocaleString()}</p> */}
        <p class="fs-5">{formatShowtimeHere(props.showtime.$date.toLocaleString())}</p>
        </div>
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
        <p class="fs-5">Subtotal:</p>
        <p class="fs-5"> ${props.subtotal}</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-5">Total after discount(if applied):</p>
        <p class="fs-5"> ${props.total.toFixed(2)}</p>
        </div>

    </Card.Body>
  </Card>
  )
}

function formatShowtimeHere(timestamp) {
  const date = new Date(timestamp);
  date.setMinutes(date.getMinutes() + 240);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  const result = `${month}-${day}-${year} at ${hours12}${amPm}`;
  return result;
}

