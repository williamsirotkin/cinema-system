import React, {useState} from 'react'
import { Link} from 'react-router-dom'
import {Image, Form } from 'react-bootstrap';
import './CheckoutPage.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "./CardForm";
import Results from './Results';

export default function CheckoutPage() {
  const [open, setOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState('');
  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }
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


        <Button variant="dark" size="lg"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>

          Add new credit card
        </Button>
        <Collapse in={open}>
        <div id="example-collapse-text">
        <CardForm sendData = {sendData}></CardForm>
        </div>
        </Collapse>
        
        <hr />
        <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Email"
          />
        </div>
      </Card.Body>
      <br></br>
      <Link to  = "/OrderConfirmation"><Button  className="confirmOrder" variant="dark" size="lg">
          Complete Order
        </Button>{' '}</Link>
    </Card>
    </div>
    </div>
  )
}
