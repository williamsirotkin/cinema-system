import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Image, Form } from 'react-bootstrap';
import './OrderSummary.css'
import React, { useState } from 'react';
import { round } from 'lodash';

function OrderSummary() {

  var BOOKING_FEE_PERCENTAGE = 0.0962;

  const[total, setTotal] = useState(38.97)

  const [tickets, setTickets] = useState([
    { id: 1, name: 'Ticket', type: "Child", price: 10.99},
    { id: 2, name: 'Ticket', type: "Adult", price: 13.99},
    { id: 3, name: 'Ticket', type: "Adult", price: 13.99},
  ]);

  const handleDelete = (id) => {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        setTotal(total - round(tickets[i].price ,2));
      }
    }
    const updatedTickets = tickets.filter(ticket =>
      ticket.id !== id
    );
    setTickets(updatedTickets);
  };

    return (
      <div className = "movieCard">
        <br></br>
        <Card  style={{ width: '68rem' }}>
      <Card.Header as="h5">Order Summary</Card.Header>
      <Card.Body>
        <Card.Text>
        {tickets.map(ticket => (
        <div key={ticket.id}>
          <span>{ticket.name}&nbsp;{ticket.id} &nbsp;{ticket.type}&nbsp;-&nbsp;{ticket.price}</span>
          &nbsp;
          <Button  onClick={() => handleDelete(ticket.id)} variant="danger" size="sm">Delete </Button>
          <br></br>
          <br></br>
        </div>
      ))}
        <br></br>
        <Link to  = "/selectMovie"><Button  className="confirmOrder" variant="dark" size="lg">Add to Order</Button> </Link>
        <hr />
        <div class="d-flex justify-content-between">
        <p class="fs-5">Subtotal</p>
        <p class="fs-5">${round(total, 2)}</p>
        </div>

        <div class="d-flex justify-content-between">
        <p class="fs-6">Booking Fee</p>
        <p class="fs-5">${round(total * BOOKING_FEE_PERCENTAGE, 2)}</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-4">TOTAL</p>
        <p class="fs-4">${round(total + total * BOOKING_FEE_PERCENTAGE, 2)}</p>
        
        </div>
        <div class="promo-bar">
            <div class="input-group" >
            <input type="promo" class="form-control rounded" placeholder="Enter Promo Code" aria-label="Promo" aria-describedby="promo-addon" />
            <button type="button" class="btn btn-primary">Enter</button>
            </div>
        </div>
        <p class="inline-right">Includes applicable state and local sales taxes.</p>
        <hr/>
        </Card.Text>
      </Card.Body>
      <br></br>
      <Link to  = "/checkoutPage"><Button  className="confirmOrder" variant="primary" size="lg">
          Checkout 
        </Button>{' '}</Link>
    </Card>
      </div>
    );
  }
  
  export default OrderSummary;