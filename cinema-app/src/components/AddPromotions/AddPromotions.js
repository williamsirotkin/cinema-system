import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Image, Form } from 'react-bootstrap';
import './AddPromotions.css'
import React, { useState } from 'react';
import { round } from 'lodash';




export default function AddPromotions() {
    const [promo, setPromo] = useState([
        { id: 1, name: 'Save10', type: "Seasonal", discount: 10},
        { id: 2, name: 'NEWYEARS23', type: "Subscriber", discount: 23},
        { id: 3, name: 'Save15', type: "Email", discount: 15},
    ]);

    const handleDelete = (id) => {
        const updatedPromo = promo.filter(promo =>
            promo.id !== id
        );
        setPromo(updatedPromo);
    };

  return (
      <div className = "movieCard">
          <br></br>
          <Card  style={{ width: '68rem' }}>
              <Card.Header as="h5">Promo List</Card.Header>
              <Card.Body>
                  <Card.Text>
                      {promo.map(promo => (
                          <div key={promo.id}>
                              <span>{promo.id}&nbsp;{promo.name} &nbsp;{promo.type}&nbsp;-&nbsp;{promo.discount}</span>
                              &nbsp;
                              <Button  onClick={() => handleDelete(promo.id)} variant="danger" size="sm">Delete </Button>
                              <br></br>
                              <br></br>
                          </div>
                      ))}
{/*                      <div class="d-flex justify-content-between">
                          <p class="fs-5">Subtotal</p>
                          <p class="fs-5">${round(total, 2)}</p>
                      </div>*/}
{/*
                      <div class="d-flex justify-content-between">
                          <p class="fs-6">Booking Fee</p>
                          <p class="fs-5">${round(total * BOOKING_FEE_PERCENTAGE, 2)}</p>
                      </div>*/}
{/*                      <div class="d-flex justify-content-between">
                          <p class="fs-4">TOTAL</p>
                          <p class="fs-4">${round(total + total * BOOKING_FEE_PERCENTAGE, 2)}</p>
                      </div>*/}
                      <hr />
                  </Card.Text>
              </Card.Body>
              <br></br>
              <div>
                  <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Promo Name</Form.Label>
                          <Form.Control type="email" placeholder="Enter Promo Name" />
                          <Form.Text className="text-muted">
                          </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Discount</Form.Label>
                          <Form.Control type="Discount" placeholder="Discount Amount" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Seasonal" />
                          <Form.Check type="checkbox" label="Email" />
                          <Form.Check type="checkbox" label="Subscriber" />
                      </Form.Group>
                      <Button variant="primary" type="submit" className='submitBtn'>
                          Submit
                      </Button>
                  </Form>
              </div>

          </Card>
      </div>
  );

}
