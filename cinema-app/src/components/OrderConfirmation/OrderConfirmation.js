<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const OrderConfirmation = ({ movie, date, time, seats, totalCost }) => {
=======
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
export default function OrderConfirmation() {
>>>>>>> 3fa8c1a34db5c625aa9801aaaea3c5eaae193ecf
  return (
    <Container className = 'container1'>
      <br></br>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className='fw-bold'>ENJOY YOUR MOVIE</h1>
          <p>You will also receive an email confirmation  with all the details</p>
          <hr />
          <h4>Your order details:</h4>
          <h5><strong>Order number:</strong> #12468</h5>
          <p><strong>Movie title:</strong> Parasite</p>
          <p><strong>Date and time:</strong> 10:40, Friday, February 17, 2023</p>
          <p><strong>E-Booking 4</strong> <br></br>1235 Sushi Avenue<br></br>Alpharetta,GA 30009</p>
          <p><strong>Seats:</strong>Adult 2<br></br>Reserved Seating: H11, H12</p>
          <hr />
          <h2 className='fw-bold'>Payment Summary</h2>
          <p><strong>Order total:</strong>$36.40<br></br>Charged to AmEx ending in 5623</p>
          <Link to  = "/"><p>Refund/Exchange</p></Link>
          <p><strong>Refundable up until 60 minutes before the screening</strong></p>
          <hr />

<<<<<<< HEAD

      </ul>

      <Link to  = "/"><Button variant="danger"> Back to Home </Button></Link>

    </div>
  );
=======
          <Button variant="btn btn-danger" href="/">Return to homepage</Button>
        </Col>
      </Row>
    </Container>
  )
>>>>>>> 3fa8c1a34db5c625aa9801aaaea3c5eaae193ecf
}
