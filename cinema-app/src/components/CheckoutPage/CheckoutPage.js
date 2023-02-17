import React from 'react'
import { Link} from 'react-router-dom'
import {Image, Form } from 'react-bootstrap';
import './CheckoutPage.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function CheckoutPage() {
  return (
    <div>
      <h1 className='checkoutHeader'>Checkout Page</h1>
    <div className='header'>
       <Image className='filmImg' src="https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg" fluid style={{ maxWidth: '300px', padding: '20px' }} />
       <div className='movieInfo'>
       <h1 className='movieTitle'>Parasite</h1>
       <p class="subtitle">Thursday 16 February at 11:20 pm <br></br><b>E-cinema 4</b></p>
       <h4>Screen: 10<br></br>Seats: F5, F6</h4>
       </div>
    
    </div>
    <div className='movieCard'>
    <Card  style={{ width: '68rem' }}>
      <Card.Header as="h5">Order Summary</Card.Header>
      <Card.Body>
        <Card.Text>
        <div class="d-flex justify-content-between">
        <p class="fs-5">Adult x2</p>
        <p class="fs-5">$32.52</p>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
        <p class="fs-5">Subtotal</p>
        <p class="fs-5">$32.52</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-6">Booking Fee</p>
        <p class="fs-5">$3.88</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-4">TOTAL</p>
        <p class="fs-4">$36.40</p>
        </div>
        <p class="text-end">Includes applicable state and local sales taxes.</p>
        <hr />
        <p class="fs-3">Payment Method</p>
        </Card.Text>
        <div className="d-grid gap-2">
        <Button variant="dark" size="lg">
          Use existing credit card
        </Button>{' '}
        <Button variant="dark" size="lg">
          Add new credit card
        </Button>
        <hr />
        <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Email"
          />
        </div>
      </Card.Body>
      <br></br>
      <Button variant="dark" size="lg">
          Complete Order
        </Button>{' '}
    </Card>
    </div>
    </div>
  )
}
