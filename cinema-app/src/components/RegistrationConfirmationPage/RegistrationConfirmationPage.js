import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import RegistrationPage from '../Signup/Signup.js';
import './RegistrationConfirmationPage.css'

const RegistrationConfirmationPage = (props) => {
  return (
    <Container className = 'container1'>
      <br></br>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Thank you for registering with us!</h1>
          <p>You are now part of our movie community.</p>
          <br></br>
          <h3> Please check your email to confirm your account! </h3>
          <hr />
          <h4>Your registration details:</h4>
          <p><strong>Name:</strong>{props.firstName} {props.lastName}</p>
          <p><strong>Email:</strong>{props.email}</p>
          <Button variant="btn btn-danger" href="/">Continue</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationConfirmationPage;
