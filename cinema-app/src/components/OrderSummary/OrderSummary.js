import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Image, Form } from 'react-bootstrap';
import './OrderSummary.css'

function OrderSummary() {
    return (
      <div>
        <br></br>
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
        </Card.Text>
      </Card.Body>
      <br></br>
      <Link to  = "/checkoutPage"><Button  className="confirmOrder" variant="dark" size="lg">
          Checkout 
        </Button>{' '}</Link>
    </Card>
      </div>
    );
  }
  
  export default OrderSummary;