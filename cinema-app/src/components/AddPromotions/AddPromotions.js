import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Image, Form } from 'react-bootstrap';
import './AddPromotions.css'
import React, { useState, useEffect } from 'react';
import { round } from 'lodash';
import axios from 'axios';
import emailjs from '@emailjs/browser';


export default function AddPromotions() {

    //let nav = useNavigate();
    const [promoName, setPromoName] = useState('');
    const [discountAmnt, setDiscountAmnt] = useState('');

    const [promo, setPromo] = useState([]);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        async function fetchPromos() {
          try {
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/promotions/get-promos');
            setPromo(response.data);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPromos();
    }, [emails]);
    
    const handleDelete = async (_id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_BACKEND_URL + '/promotions/delete/' + _id);
        console.log(response.data);
        setPromo(promo.filter((promo) => promo._id !== _id));
        } catch (error) {
        console.error(error);
        }  
    };


    function sendEmail(email) {
        emailjs.send('service_96npu8c', 'template_ie2brcl', {'email': email, 'promoName': promoName, 'discountAmnt': discountAmnt}, 'm8yxyvLLbYsPK3HRZ')
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/promotions/add', {
            promoName,
            discountAmnt
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        await HandleEmail();
        //window.location.reload();
    };

    const HandleEmail = async () => {
        async function fetchEmails() {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/promotions/get-emails');
                setEmails(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchEmails();
    };

    useEffect(() => {
        emails.forEach(sendEmail)
        console.log(emails);
      }, [emails]);

  return (
      <div className = "movieCard">
          <br></br>
          <Card  style={{ width: '68rem' }}>
              <Card.Header as="h5">Promo List</Card.Header>
              <Card.Body>
                  <Card.Text>
                      {promo.map(promo => (
                          <div key={promo.id}>
                              <span>{promo.promoName} &nbsp;{promo.discountAmnt}&nbsp;</span>
                              &nbsp;
                              <Button  onClick={() => handleDelete(promo._id)} variant="danger" size="sm">Delete </Button>
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
                  <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicPromoName">
                            <Form.Label>Promo Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Promo Name"
                                value={promoName}
                                onChange={(e) => setPromoName(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasiceDiscountAmnt">
                          <Form.Label>Discount Amount</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Discount Amount"
                            value={discountAmnt}
                            onChange={(e) => setDiscountAmnt(e.target.value)}
                            />
                      </Form.Group>
                      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Seasonal" />
                          <Form.Check type="checkbox" label="Email" />
                          <Form.Check type="checkbox" label="Subscriber" />
                      </Form.Group> */}
                      <Button variant="primary" type="submit" className='submitBtn'>
                          Submit
                      </Button>
                  </Form>
              </div>

          </Card>
      </div>
  );

}

//export default PromoPage;