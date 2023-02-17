import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

const OrderConfirmation = ({ movie, date, time, seats, totalCost }) => {
  return (
    <div>
      <h1>Order Confirmation</h1>
      <h2>Thank you for your purchase! Here are your order details</h2>
      <hr/>
      <ul >
        <li><strong>Date:</strong> 3-10-2023</li>
        <li><strong>Movie:</strong> Ant Man and the Wasp</li>
        <li><strong>Time:</strong> 8:00 pm</li>
        <li><strong>Seats:</strong> A3, A4</li>
        <li><strong>Total Cost:</strong> $22.99</li>


      </ul>

      <Link to  = "/"><Button variant="danger"> Back to Home </Button></Link>

    </div>
  );
}

export default OrderConfirmation;

